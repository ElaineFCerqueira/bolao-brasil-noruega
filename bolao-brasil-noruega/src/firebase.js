// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZQzz28H2zpeS03dfT2Grld_31_EXgZag",
  authDomain: "bolao-brasil-noruega-ab329.firebaseapp.com",
  projectId: "bolao-brasil-noruega-ab329",
  storageBucket: "bolao-brasil-noruega-ab329.firebasestorage.app",
  messagingSenderId: "282109470133",
  appId: "1:282109470133:web:23f5a3485f4d509078a5fc",
  measurementId: "G-PFGG3J5MBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
