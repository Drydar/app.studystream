        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const database = firebase.database();

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPAssword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC5qQdiJpCHW6FtZnpa2RYdL-b66VqYQfk",
    authDomain: "streamplex-935ff.firebaseapp.com",
    databaseURL: "https://streamplex-935ff-default-rtdb.firebaseio.com",
    projectId: "streamplex-935ff",
    storageBucket: "streamplex-935ff.firebasestorage.app",
    messagingSenderId: "32314467540",
    appId: "1:32314467540:web:8a6ada369a64c4ecd80741"
  };