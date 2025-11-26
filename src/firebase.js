import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGhbCmu6wh3a6durc53pPyrJNTXmUpmBk",
  authDomain: "clientwebflow-5f701.firebaseapp.com",
  projectId: "clientwebflow-5f701",
  storageBucket: "clientwebflow-5f701.firebasestorage.app",
  messagingSenderId: "786412123536",
  appId: "1:786412123536:web:9cf879eeed94a3cf576f15",
  measurementId: "G-F63YQ7W0GJ",
};

const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getFirestore(app);
