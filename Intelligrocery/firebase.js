// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgZL6ChP6aGjz-D5C6ABklibgGuFKR-nw",
  authDomain: "intelligrocery.firebaseapp.com",
  projectId: "intelligrocery",
  storageBucket: "intelligrocery.appspot.com",
  messagingSenderId: "912489167836",
  appId: "1:912489167836:web:cc5ce0344663abc5c0ad19"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.default.auth();
