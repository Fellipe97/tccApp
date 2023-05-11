import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";



// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtOfDqsAMFMOOZeLmeYNCrvBcG3fQqZog",
  authDomain: "uerj-tcc.firebaseapp.com",
  projectId: "uerj-tcc",
  storageBucket: "uerj-tcc.appspot.com",
  messagingSenderId: "963690499470",
  appId: "1:963690499470:web:d41c5b611ab6fedf1e68df",
  measurementId: "G-NQ754CSPVC"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app);