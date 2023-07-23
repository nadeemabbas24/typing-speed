import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsULuqoWMJZ9muF9v5NghUx2DrcEt8tjw",
  authDomain: "gyro-typing.firebaseapp.com",
  projectId: "gyro-typing",
  storageBucket: "gyro-typing.appspot.com",
  messagingSenderId: "130091121433",
  appId: "1:130091121433:web:bd6f2a3a54174bc45f2388",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
