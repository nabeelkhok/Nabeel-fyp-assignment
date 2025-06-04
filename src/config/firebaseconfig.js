// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ADD THIS IMPORT

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwvx9k1GVWnsZqv6lEXWeyn4rZ9IpjBTY",
  authDomain: "fyp-assignment-4.firebaseapp.com",
  projectId: "fyp-assignment-4",
  storageBucket: "fyp-assignment-4.appspot.com", // FIXED: Use .appspot.com domain
  messagingSenderId: "81865249768",
  appId: "1:81865249768:web:75022867a22271acd34a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // ADD THIS LINE