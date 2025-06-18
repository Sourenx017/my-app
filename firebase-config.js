// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk22db8fAmtmchFJBh2D4FQWm4MnVecIc",
  authDomain: "seiko-app-962a5.firebaseapp.com",
  projectId: "seiko-app-962a5",
  storageBucket: "seiko-app-962a5.firebasestorage.app",
  messagingSenderId: "450718148128",
  appId: "1:450718148128:web:4fcb2b65a87c3336ad3e45"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const database = getDatabase(app);
export const db = getFirestore(app);