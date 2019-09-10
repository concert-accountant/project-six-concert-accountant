import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCrKZI3FRGd5Fq3sMdkRufn8fUT3uspt7o",
    authDomain: "concert-accountant.firebaseapp.com",
    databaseURL: "https://concert-accountant.firebaseio.com",
    projectId: "concert-accountant",
    storageBucket: "",
    messagingSenderId: "258247958616",
    appId: "1:258247958616:web:59a46fe5ffd95b82dd2a2d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;