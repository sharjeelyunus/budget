import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBzRchSfhvuK-fCWGIgpz75GNx8sPwo2m4",
    authDomain: "budgetbysharjeel.firebaseapp.com",
    projectId: "budgetbysharjeel",
    storageBucket: "budgetbysharjeel.appspot.com",
    messagingSenderId: "1002810851633",
    appId: "1:1002810851633:web:ab6bae6833b67c8ac23010"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };