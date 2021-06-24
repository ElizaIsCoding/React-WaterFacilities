
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const config = {
     apiKey: "AIzaSyDyIV8hvOEnR-PBQX1sqCEaW5wJ0tGq8S4",
     authDomain: "water-9c264.firebaseapp.com",
     projectId: "water-9c264",
     storageBucket: "water-9c264.appspot.com",
     messagingSenderId: "916528474960",
     appId: "1:916528474960:web:2dbebcc48b4b6de2b49a55",
     measurementId: "G-GQHPG5Z68W"
   };


firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase;