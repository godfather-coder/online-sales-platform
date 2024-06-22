import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Ad8zTsZttv3DLyUDL2EMTl-hytuOLkQ",
  authDomain: "gigi-7d0f6.firebaseapp.com",
  projectId: "gigi-7d0f6",
  storageBucket: "gigi-7d0f6.appspot.com",
  messagingSenderId: "456407130874",
  appId: "1:456407130874:web:fd81ea36fb093b6a641f43",
  measurementId: "G-M35LV7S699"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
export default app;
