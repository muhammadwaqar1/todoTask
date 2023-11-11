// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEXpEA5nPOXskbNjRmuCl9aLndd_bRKaE",
  authDomain: "todotask-870c3.firebaseapp.com",
  projectId: "todotask-870c3",
  storageBucket: "todotask-870c3.appspot.com",
  messagingSenderId: "855406920582",
  appId: "1:855406920582:web:345e8f98515f5d9b6f6207",
  measurementId: "G-E5GX5VEMKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const storage= getStorage(app);