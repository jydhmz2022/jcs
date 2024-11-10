import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCizg-pIiv0Cb0Syv6uZMCW0drqTioi-Ak",
  authDomain: "jcs-group-37da8.firebaseapp.com",
  projectId: "jcs-group-37da8",
  storageBucket: "jcs-group-37da8.appspot.com",
  messagingSenderId: "661024151433",
  appId: "1:661024151433:web:dc62ffe7cdd2b1b5303358",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
