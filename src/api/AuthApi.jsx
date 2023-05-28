import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LoginAPI = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const RegisterAPI = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const GoogleSignInAPI = async () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    return error;
  }
};

export const onLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error;
  }
};
