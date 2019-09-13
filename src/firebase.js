// import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCKYr8akor5Dkq4r0owOzgmoq-bhIC-yr8",
  authDomain: "concertaccountant.firebaseapp.com",
  databaseURL: "https://concertaccountant.firebaseio.com",
  projectId: "concertaccountant",
  storageBucket: "",
  messagingSenderId: "915408755528",
  appId: "1:915408755528:web:c4ca3e4d61759e8861317d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase;