import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

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

// Objective:
// The objective of the LoginAPI function is to authenticate a user by signing them in with their email and password using Firebase authentication.

// Inputs:
// - email: a string representing the user's email address
// - password: a string representing the user's password

// Flow:
// 1. The function calls the signInWithEmailAndPassword method from Firebase authentication, passing in the auth object, email, and password as arguments.
// 2. If the sign-in is successful, the function returns the response object.
// 3. If there is an error, the function catches it and returns the error object.

// Outputs:
// - response: an object containing information about the signed-in user, including their user ID and email address.
// - error: an object containing information about the error that occurred during sign-in, including an error code and message.

// Additional aspects:
// - The LoginAPI function is asynchronous, meaning it returns a promise that resolves with the response object or rejects with the error object.
// - The function uses Firebase authentication methods imported at the beginning of the code to sign in the user.
// - The auth object used in the function is created using the getAuth method from Firebase authentication and the app object imported from firebaseConfig.
