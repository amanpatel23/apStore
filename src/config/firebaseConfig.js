// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVxq4Ee4X29DMTUnBTVRwVqhJ9-ImLcM8",
  authDomain: "ap-online-store.firebaseapp.com",
  projectId: "ap-online-store",
  storageBucket: "ap-online-store.appspot.com",
  messagingSenderId: "778877631945",
  appId: "1:778877631945:web:d3caf5e31f8c0a68fdbc18",
  measurementId: "G-XNJBD1K0DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);