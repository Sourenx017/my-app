import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../services/api';
import { ProfilesService } from '../services/apiExtended';

export const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app startup
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        // Load user profile from backend
        await loadCurrentUserProfile();
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  // Load current user profile from backend
  const loadCurrentUserProfile = async () => {
    try {
      const userProfile = await ProfilesService.getMyProfile();
      setProfileState(userProfile);
      setCurrentUser({ 
        id: userProfile.userId,
        email: userProfile.email || '',
        name: userProfile.firstName + ' ' + userProfile.lastName
      });
    } catch (error) {
      console.log('Error loading user profile:', error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const result = await AuthService.login(email, password);
      setIsAuthenticated(true);
      await loadCurrentUserProfile();
      return result;
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const result = await AuthService.register(userData);
      setIsAuthenticated(true);
      await loadCurrentUserProfile();
      return result;
    } catch (error) {
      console.log('Register error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
      setProfileState(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  // Update profile function
  const setProfile = async (newProfile) => {
    try {
      if (newProfile) {
        const updatedProfile = await ProfilesService.updateMyProfile(newProfile);
        setProfileState(updatedProfile);
        return updatedProfile;
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      throw error;
    }
  };

  const contextValue = {
    profile,
    setProfile,
    currentUser,
    isAuthenticated,
    login,
    logout,
    register,
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
