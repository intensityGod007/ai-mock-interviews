import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBzZzEky21BmYsNOD_2APSgMuiojkchatc",
    authDomain: "interviewly-53a38.firebaseapp.com",
    projectId: "interviewly-53a38",
    storageBucket: "interviewly-53a38.firebasestorage.app",
    messagingSenderId: "166770410557",
    appId: "1:166770410557:web:6a48dcfabfe00adaaf1654",
    measurementId: "G-M1PXVEB79N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
