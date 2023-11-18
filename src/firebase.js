// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXHNqa8Ydn-S4akOD4lK5GI0xykV5H3i4",
  authDomain: "translator-97792.firebaseapp.com",
  projectId: "translator-97792",
  storageBucket: "translator-97792.appspot.com",
  messagingSenderId: "452559900875",
  appId: "1:452559900875:web:11b285694bbbb633318b4e",
  measurementId: "G-ERB9SF9Q1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);