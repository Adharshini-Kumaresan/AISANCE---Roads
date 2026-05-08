import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlXR7Fzdd3kgurOl_d3G2Ncf8RzaLmBnM",
  authDomain: "aisance-133a4.firebaseapp.com",
  projectId: "aisance-133a4",
  storageBucket: "aisance-133a4.firebasestorage.app",
  messagingSenderId: "918279855133",
  appId: "1:918279855133:web:12eed352e7dab95980baf4",
  measurementId: "G-4KBVTCYEK7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
