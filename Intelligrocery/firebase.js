import { initializeApp } from "firebase/app";
import { signOut, getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, increment, serverTimestamp } from "firebase/firestore";
import Alert from 'react-native';

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
export const app = initializeApp(firebaseConfig); //this line should be before others to make a default app
export const db = getFirestore(app);

export const auth = getAuth();

const handleSignOut = async ({navigation}) => {
  //Note: for some reason needed to pass in as {}
  try {
      const email = auth.currentUser?.email
      userCredentials = await signOut(auth)
      console.log('Logged out with: ', email);
      navigation.replace("Login")
  }
  catch (error) {
      alert(error.message)
  }
}

const addDocFB = async (docData, collectionName) => {
  //Takes a reference to an ingredient doc and adds it to the database
  docData.userID = auth.currentUser.uid;
  docData.timeAdded = serverTimestamp();
  try {
    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  } catch (error) {
      Alert.alert("There seems to have been an issue adding your grocery list item to the database.")
      alert(error.message);
  }
}

const deleteDocFB = async (collectionName, documentID) => {
  try {
    await deleteDoc(doc(db, collectionName, documentID));
  } catch (error) {
    Alert.alert("There seems to have been an issue deleting your grocery list item from the database.")
    alert(error.message);
  }
}


export {handleSignOut, addDocFB, deleteDocFB};



