import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCOSN16J36RARKQdX2dUxLyyGi1n3usDoU",
    authDomain: "react-curso-2c4b2.firebaseapp.com",
    databaseURL: "https://react-curso-2c4b2.firebaseio.com",
    projectId: "react-curso-2c4b2",
    storageBucket: "react-curso-2c4b2.appspot.com",
    messagingSenderId: "18510150359",
    appId: "1:18510150359:web:2e7f5dc0201bd79ee48e92"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}