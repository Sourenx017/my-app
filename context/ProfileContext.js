import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
});

// Default root user
const ROOT_USER = {
  name: 'Root User',
  email: 'root',
  password: 'root',
  address: '',
  phone: ''
};

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      } else {
        // Set root user as default if no profile exists
        await AsyncStorage.setItem('userProfile', JSON.stringify(ROOT_USER));
        setProfileState(ROOT_USER);
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const setProfile = async (newProfile) => {
    try {
      if (newProfile) {
        await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
      } else {
        await AsyncStorage.removeItem('userProfile');
      }
      setProfileState(newProfile);
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
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
