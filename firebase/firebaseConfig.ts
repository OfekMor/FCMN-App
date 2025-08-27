import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn0UZ-tR4IsYyotAY-QLoEsePUrGiQYhQ",
  authDomain: "fcmn-app.firebaseapp.com",
  projectId: "fcmn-app",
  storageBucket: "fcmn-app.appspot.com",
  messagingSenderId: "400177650146",
  appId: "1:400177650146:android:3c48fcf7eed5cee28d41b",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
