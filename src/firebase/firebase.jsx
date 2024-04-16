import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCkPwIAqvwdhUCzWiq2nb401t4PVyxQlzo",
    authDomain: "hr-control-panel.firebaseapp.com",
    projectId: "hr-control-panel",
    storageBucket: "hr-control-panel.appspot.com",
    messagingSenderId: "742906866330",
    appId: "1:742906866330:web:f97f492f291593f02b4d23",
    measurementId: "G-N3VXW907ND"
};

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig)
export const auth = firebaseApp.auth();

export const db = getFirestore(firebaseApp);
export default firebaseApp;
