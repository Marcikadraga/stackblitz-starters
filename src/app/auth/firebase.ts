import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQvUw1kmvtQsNA0EoVJsyzRxsrGrZem48",
  authDomain: "npkk-39b6b.firebaseapp.com",
  projectId: "npkk-39b6b",
  storageBucket: "npkk-39b6b.firebasestorage.app",
  messagingSenderId: "126609606710",
  appId: "1:126609606710:web:f39b87163863e605b53097",
  measurementId: "G-H6LENHS8Z4"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
