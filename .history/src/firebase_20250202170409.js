// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useAuth } from "./context/AuthContext";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd98ELl-rwJHH9V03smPR2ytW-SCmNMXA",
  authDomain: "rent-74a6b.firebaseapp.com",
  projectId: "rent-74a6b",
  storageBucket: "rent-74a6b.firebasestorage.app",
  messagingSenderId: "536713412031",
  appId: "1:536713412031:web:44ef722fb8cd6b9c16f50a"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);