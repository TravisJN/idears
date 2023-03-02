import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// config
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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Local emulators
// Uncomment to use local emulators
// connectFirestoreEmulator(db, "localhost", 8080);
// connectAuthEmulator(auth, "http://localhost:9099");
