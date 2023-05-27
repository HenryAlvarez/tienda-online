import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPuUz_OLGY8_SuRI9fan1vTuSj6oToWSQ",
  authDomain: "e-comerce-7cb2c.firebaseapp.com",
  projectId: "e-comerce-7cb2c",
  storageBucket: "e-comerce-7cb2c.appspot.com",
  messagingSenderId: "900547067182",
  appId: "1:900547067182:web:916ea35eae91a3875b4ebf"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();