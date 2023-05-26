// Add firebaseConfig from your firebase account to the file firebaseConfigKeys.js
import { firebaseConfigKeys } from "./firebaseConfigKeys";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// // // TODO: Add SDKs for Firebase products that you want to use // //
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfigKeys);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, auth, firestore, storage };
