// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuQhe7h-8OuIXXrKUGuaIUVbpikM5eO4k",
  authDomain: "react-poke-app-6ead0.firebaseapp.com",
  projectId: "react-poke-app-6ead0",
  storageBucket: "react-poke-app-6ead0.firebasestorage.app",
  messagingSenderId: "519691421873",
  appId: "1:519691421873:web:be62fb5da35fd00ac6fa90",
  measurementId: "G-XVYMN5VJ3K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
