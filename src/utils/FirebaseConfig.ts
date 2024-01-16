// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";

const firebaseConfig = {
  // Api key firebase
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");