import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { Alert } from "react-native";

/**
 * Function to sign in a user with email and password From Firebase
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise} - A promise that resolves with the user credentials if successful, or rejects with an error.
 */

export const loginWIthEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    Alert.alert(
      "Login Failed",
      "Please check your email and password and try again."
    );
    throw error; // Re-throw the error for further handling
  }
};

/**
 * Function to create a new user with email and password in Firebase
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise} - A promise that resolves with the user credentials if successful, or rejects with an error.
 */
export const signupWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);

    let errorMessage = "Registration failed. Please try again.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage =
        "This email is already registered. Please use another email or try to login.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address format.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak. Please use a stronger password.";
    }

    Alert.alert("Registration Failed", errorMessage);
    throw error;
  }
};

/**
 * * Function to sign out the user from Firebase
 */

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    Alert.alert("Logout Failed", "Please try again later.");
  }
};
