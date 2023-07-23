import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase-tools/lib/error";

export const LoginAPI = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const RegisterAPI = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const GoogleSignInAPI = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    return error;
  }
};

export const ResetPasswordAPI = async (email) => {
  try {
    const res = await sendPasswordResetEmail(auth, email);
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
