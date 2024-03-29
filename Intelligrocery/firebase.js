import { getApps, initializeApp } from "firebase/app";
import { signOut, getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, setDoc, deleteDoc, getDocs, query, increment, serverTimestamp } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { Alert } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
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
// export const app = initializeApp(firebaseConfig); //this line should be before others to make a default app
// export const db = getFirestore(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// Initialize Firebase app

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

// Initialize Firebase services
const db = getFirestore(app);

export { app, db, auth };
// export const auth = getAuth();

const handleSignOut = async ({navigation}) => {
  //Note: for some reason needed to pass in as {}
  try {
    const email = auth.currentUser?.email
    userCredentials = await signOut(auth)
    console.log('Logged out with: ', email);
    navigation.replace("Login")
  } catch(error) {
    Alert.alert("It seems we had a problem signing you out.");
    console.log(error.message);
  } 
}

const addDocFB = async (docData, collectionName) => {
  //Takes a reference to an ingredient doc and adds it to the database
  try {
    docData.userID = auth.currentUser.uid;
    docData.timestamp = serverTimestamp();
    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  } catch(error) {
    Alert.alert("There seems to have been an issue adding your item to the database.")
    console.log(error.message);
  } 
}

const updateDocFB = async (collectionName, documentID, docData) => {
  try {
    await updateDoc(doc(db, collectionName, documentID), {...docData, timestamp: serverTimestamp()});
  } catch(error) {
    Alert.alert("There seems to have been an issue updating your item in the database.");
    console.log(error.message);
  } 
 }


const deleteDocFB = async (collectionName, documentID) => {
  try {
    await deleteDoc(doc(db, collectionName, documentID));
  } catch(error) {
    Alert.alert("There seems to have been an issue deleting your item from the database.")
    console.log(error.message);
  } 
}

const queryCollectionFB = async (collectionName, whereRef = null, orderByRef = null) => {
  //Making it not async because 
  try {
    let queryData; 
    if (whereRef !== null && orderByRef !== null) {
      queryData = await getDocs(query(collection(db, collectionName), whereRef, orderByRef)); 
    } else if ( whereRef !== null) {
      queryData = await getDocs(query(collection(db, collectionName), orderByRef)); 
    } else {
      queryData = await getDocs(query(collection(db, collectionName), whereRef)); 
    }
    return queryData;
  } catch(error) {
    Alert.alert("We seemed to have a problem loading your data");
    console.error("Error loading pantry: ", error);
  } 
}

export {handleSignOut, addDocFB, updateDocFB, deleteDocFB, queryCollectionFB};



