import * as firebase from "firebase/app";
import "firebase/firestore"; // Import additional Firebase services as needed

const firebaseConfig = {
  apiKey: "AIzaSyArEObhjKcua9LY-FPe4zqdDlJkV6zwABA",
  authDomain: "spotx-5cafb.firebaseapp.com",
  projectId: "spotx-5cafb",
  storageBucket: "spotx-5cafb.appspot.com",
  messagingSenderId: "850774658008",
  appId: "1:850774658008:web:5c4016290e0ae31f4380ad",
  measurementId: "G-KDD8KZ8XZD",
};
console.log("firebasefirebasefirebase", firebase);

firebase.initializeApp(firebaseConfig);

export default firebase;
