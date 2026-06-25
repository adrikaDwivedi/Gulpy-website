// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJewXY9Qft1ocR_b9cZDG80FHG4rcmRw4",
  authDomain: "gulpy-website.firebaseapp.com",
  projectId: "gulpy-website",
  storageBucket: "gulpy-website.firebasestorage.app",
  messagingSenderId: "637429999752",
  appId: "1:637429999752:web:08e92e8aff06f281ff973d",
  measurementId: "G-L7E9HWPLKW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);