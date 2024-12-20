import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_3m-YyNdc10IfSrruQe-ujl55VPa63jM",
    authDomain: "job-portal-9ba9e.firebaseapp.com",
    projectId: "job-portal-9ba9e",
    storageBucket: "job-portal-9ba9e.firebasestorage.app",
    messagingSenderId: "215037236910",
    appId: "1:215037236910:web:2275a5c5c28e01b51a7f3f",
    measurementId: "G-09MN8KMZJH"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
