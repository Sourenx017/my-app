import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
  currentUser: null,
  isAuthenticated: false,
});

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        loadProfile(user.uid);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Load profile from AsyncStorage
  const loadProfile = async (uid) => {
    try {
      const savedProfile = await AsyncStorage.getItem(`userProfile_${uid}`);
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  // Save profile to AsyncStorage
  const setProfile = async (newProfile) => {
    try {
      if (newProfile) {
        const uid = newProfile.uid || (currentUser && currentUser.uid);
        if (uid) {
          await AsyncStorage.setItem(`userProfile_${uid}`, JSON.stringify(newProfile));
          setProfileState(newProfile);
        }
      } else {
        // If newProfile is null, we're logging out
        setProfileState(null);
      }
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  const contextValue = {
    profile,
    setProfile,
    currentUser,
    isAuthenticated: !!currentUser,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
