import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/firestore'; 
import 'firebase/storage'; 
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();  
}

export default firebase;
