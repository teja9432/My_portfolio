import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtakh1m1yXKzYXOKnjc8jFjdEPKbyN2k8",
  authDomain: "portfolio-6054d.firebaseapp.com",
  projectId: "portfolio-6054d",
  storageBucket: "portfolio-6054d.firebasestorage.app",
  messagingSenderId: "212388175999",
  appId: "1:212388175999:web:306ff22a79b68810ea5f4a",
  measurementId: "G-QF2F5MB85T",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
