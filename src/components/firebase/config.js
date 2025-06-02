import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyvvGJmDP8XAT7id3HdCaWHp3aFGP6idY",
  authDomain: "fyp-supervisor-75909.firebaseapp.com",
  projectId: "fyp-supervisor-75909",
  storageBucket: "fyp-supervisor-75909.appspot.com",
  messagingSenderId: "884368696489",
  appId: "1:884368696489:web:1de4ef371bb2ee9c0d35b8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
