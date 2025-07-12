import React, { createContext, useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../services/api";
import { ProfilesService } from "../services/apiExtended";

// Define initial context value
const initialContextValue = {
  profile: null,
  setProfile: () => {},
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
};

export const ProfileContext = createContext(initialContextValue);

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTriedAutoLogin, setHasTriedAutoLogin] = useState(false);

  // Check authentication status on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      if (hasTriedAutoLogin) return;

      try {
        setIsLoading(true);
        const authenticated = await AuthService.isAuthenticated();
        setIsAuthenticated(authenticated === true);

        if (authenticated === true) {
          await loadCurrentUserProfile();
        } else {
          setCurrentUser(null);
          setProfileState(null);
        }
      } catch (error) {
        console.log("Error checking auth status:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
        setProfileState(null);
      } finally {
        setIsLoading(false);
        setHasTriedAutoLogin(true);
      }
    };

    initializeAuth();
  }, [hasTriedAutoLogin]);

  const loadCurrentUserProfile = async () => {
    try {
      console.log("Intentando cargar el perfil del usuario...");
      const token = await AuthService.getToken();
      console.log("Token actual:", token ? "Existe" : "No existe");

      const userProfile = await ProfilesService.getMyProfile();
      console.log("Perfil obtenido:", userProfile);

      if (!userProfile) {
        console.log("No profile found, setting default state");
        setProfileState(null);
        return;
      }

      // Mantener el perfil y el usuario actual separados
      setProfileState({
        ...userProfile,
        // Asegurar que address sea un objeto
        address: userProfile.address || {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        phone: userProfile.phone || "",
      });

      // No actualizar currentUser aquí, ya que la información del usuario viene del login

      console.log("Loaded user profile:", userProfile); // Para depuración
    } catch (error) {
      if (error?.response?.status === 404) {
        console.log("Perfil no encontrado, intentando crear uno nuevo");
        const token = await AuthService.getToken();
        if (token && currentUser) {
          try {
            console.log("Intentando crear perfil básico con:", currentUser);
            const basicProfile = {
              address: {
                street: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
              },
              phone: "",
            };
            console.log("Perfil básico a crear:", basicProfile);

            const newProfile = await ProfilesService.createProfile(
              basicProfile
            );
            if (newProfile) {
              setProfileState({
                ...newProfile,
                // Asegurar que address sea un objeto
                address: newProfile.address || {
                  street: "",
                  city: "",
                  state: "",
                  country: "",
                  zipCode: "",
                },
                phone: newProfile.phone || "",
              });
            }
          } catch (createError) {
            console.log("Error creating profile:", createError);
            setProfileState(null);
          }
        } else {
          setIsAuthenticated(false);
          setProfileState(null);
        }
      } else {
        console.log("Error loading user profile:", error);
        setProfileState(null);
      }
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const result = await AuthService.login(email, password);
      setIsAuthenticated(true);

      // Establecer el usuario actual con la información del login
      if (result.user) {
        const userData = {
          id: result.user._id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.privilege || "user",
          privilege: result.user.privilege || "user",
        };
        console.log("Setting current user:", userData);
        setCurrentUser(userData);

        // Intentar crear el perfil inmediatamente después del login
        try {
          const basicProfile = {
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
              zipCode: "",
            },
            phone: "",
          };
          console.log(
            "Intentando crear perfil después del login:",
            basicProfile
          );
          await ProfilesService.createProfile(basicProfile);
        } catch (error) {
          // Si el error es porque el perfil ya existe, está bien
          if (error?.response?.status !== 409) {
            console.log("Error al crear perfil después del login:", error);
          }
        }
      }

      // Ahora cargar el perfil
      await loadCurrentUserProfile();
      return result;
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const result = await AuthService.register(userData);

      // Ensure we're setting isAuthenticated as a boolean
      setIsAuthenticated(true);

      // Set current user first
      const user = {
        id: result.userId || result.user?.id,
        email: userData.email,
        name: userData.name,
        role: result.role || "user",
      };
      setCurrentUser(user);

      // Try to create profile immediately
      try {
        const profileData = {
          address: {
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
          },
          phone: "",
        };

        const createdProfile = await ProfilesService.createProfile(profileData);

        if (createdProfile) {
          setProfileState(createdProfile);
        } else {
          // If creation fails, set a basic profile
          setProfileState(profileData);
        }
      } catch (profileError) {
        console.log("Error creating initial profile:", profileError);
        // Set basic profile state even if creation fails
        setProfileState({
          email: userData.email,
          name: userData.name,
          address: "",
          phone: "",
          userId: user.id,
        });
      }

      return result;
    } catch (error) {
      setIsAuthenticated(false);
      console.log("Register error:", error);
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
      console.log("Logout error:", error);
    }
  };

  // Update profile function
  const setProfile = async (newProfile) => {
    try {
      if (newProfile) {
        const updatedProfile = await ProfilesService.updateMyProfile(
          newProfile
        );
        setProfileState(updatedProfile);
        return updatedProfile;
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      throw error;
    }
  };

  const contextValue = {
    profile,
    setProfile,
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  if (isLoading) {
    return (
      <ProfileContext.Provider value={contextValue}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      </ProfileContext.Provider>
    );
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

// Add a type guard function to check if profile context is properly initialized
export function isProfileContextInitialized(context) {
  return context && typeof context.isAuthenticated === "boolean";
}
