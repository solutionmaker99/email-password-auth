// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAezdS9N1_06EGU5hfJLuJNk3Aj5vJ1p3c",
  authDomain: "email-password-auth-a50cc.firebaseapp.com",
  projectId: "email-password-auth-a50cc",
  storageBucket: "email-password-auth-a50cc.appspot.com",
  messagingSenderId: "71076938900",
  appId: "1:71076938900:web:5cc3a368be209cef3c6081",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
