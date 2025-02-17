// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "khaneshane-f650c.firebaseapp.com",
  projectId: "khaneshane-f650c",
  storageBucket: "khaneshane-f650c.firebasestorage.app",
  messagingSenderId: "592659060427",
  appId: "1:592659060427:web:e9f505ffa888737a3ead4e",
  measurementId: "G-E53MFWGMTX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);