// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh3UDIUt_mhXXvedaSSVUwm9Y1IyyuJ8",
  authDomain: "donato-royale.firebaseapp.com",
  projectId: "donato-royale",
  storageBucket: "donato-royale.appspot.com",
  messagingSenderId: "299916539423",
  appId: "1:299916539423:web:8c307249fbc6d79264472a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
