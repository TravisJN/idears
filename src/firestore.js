// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIVPGJONy3VO2oDYaNRR3Jxp3sWiRBfVA",
  authDomain: "idears-b7402.firebaseapp.com",
  projectId: "idears-b7402",
  storageBucket: "idears-b7402.appspot.com",
  messagingSenderId: "30426807609",
  appId: "1:30426807609:web:fba06cffaf79455031fce8",
  measurementId: "G-SNQS1BBQRR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
