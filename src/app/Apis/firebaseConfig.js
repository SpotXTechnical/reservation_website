import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyArEObhjKcua9LY-FPe4zqdDlJkV6zwABA",
  authDomain: "spotx-5cafb.firebaseapp.com",
  projectId: "spotx-5cafb",
  storageBucket: "spotx-5cafb.appspot.com",
  messagingSenderId: "850774658008",
  appId: "1:850774658008:web:5c4016290e0ae31f4380ad",
  measurementId: "G-KDD8KZ8XZD",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
