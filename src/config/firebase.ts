import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";



// Initialize Firebase
const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XX",
  storageBucket: "XXX",
  messagingSenderId: "XXXXX",
  appId: "XXXX",
  measurementId: "XXXX"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = getFirestore(app);