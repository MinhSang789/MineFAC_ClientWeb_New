import { onMessage } from 'firebase/messaging'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyCP83BfVYmTXmMQcOR6LrSxINnb3X_KaW4",
    authDomain: "findcoin-e7a1d.firebaseapp.com",
    projectId: "findcoin-e7a1d",
    storageBucket: "findcoin-e7a1d.appspot.com",
    messagingSenderId: "559293809618",
    appId: "1:559293809618:web:14d62d5bfc65b95c967e0b",
    measurementId: "G-N769RD1C9G"
  };

firebase.initializeApp(firebaseConfig);
const message = firebase.messaging()
const auth = firebase.auth()

export { auth, firebase, message };

