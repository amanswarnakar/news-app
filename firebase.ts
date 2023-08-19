import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY78x_3uLbrsR6B42FZlzSRJ4xNcbg-no",
  authDomain: "newsapp-aman.firebaseapp.com",
  projectId: "newsapp-aman",
  storageBucket: "newsapp-aman.appspot.com",
  messagingSenderId: "457454697491",
  appId: "1:457454697491:web:26966cfece516f179f93e6",
  measurementId: "G-HMT0XMEMYR",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { app, db, auth };
