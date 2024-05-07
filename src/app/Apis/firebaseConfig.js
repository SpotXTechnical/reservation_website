import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCReqZttDwMxHZp-qW2xkdeHQZIHU16Ez8",
  authDomain: "spotx-otp.firebaseapp.com",
  projectId: "spotx-otp",
  storageBucket: "spotx-otp.appspot.com",
  messagingSenderId: "487153413918",
  appId: "1:487153413918:web:5f4d2491e012877d05e30f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
