
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2jtIQTFxSIAki6hRGJWs_IuarKJak8yU",
  authDomain: "playbk-5c4ab.firebaseapp.com",
  databaseURL: "https://playbk-5c4ab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "playbk-5c4ab",
  storageBucket: "playbk-5c4ab.firebasestorage.app",
  messagingSenderId: "1061880985785",
  appId: "1:1061880985785:web:c2a82814283cf4c76d4368",
  measurementId: "G-VM9GBR74HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
