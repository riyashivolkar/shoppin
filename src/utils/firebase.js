// src/utils/firebase.js (or .ts if you're using TS)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJivlXlVNX8jD6tloXAm3gQAbCSFTYMTg",
  authDomain: "shoppin-ab312.firebaseapp.com",
  projectId: "shoppin-ab312",
  storageBucket: "shoppin-ab312.appspot.com",
  messagingSenderId: "46148461031",
  appId: "1:46148461031:web:aa276c21b83f0b68a91d42",
  measurementId: "G-1N8WDPME0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setup Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
