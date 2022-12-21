// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_0_ih0KppOrlKGkvKgCMt-IdIYwZZ198",
  authDomain: "socialpro-fe346.firebaseapp.com",
  projectId: "socialpro-fe346",
  storageBucket: "socialpro-fe346.appspot.com",
  messagingSenderId: "559340248343",
  appId: "1:559340248343:web:b9cace0542850a529aab52",
  measurementId: "G-FZ01MNDESR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
