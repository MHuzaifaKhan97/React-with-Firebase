import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBIGg_4FtTwfN4u4gD84M_rjn5wqELxzP8",
    authDomain: "reactwith-firebase.firebaseapp.com",
    databaseURL: "https://reactwith-firebase.firebaseio.com",
    projectId: "reactwith-firebase",
    storageBucket: "reactwith-firebase.appspot.com",
    messagingSenderId: "427244013607",
    appId: "1:427244013607:web:6d18e1a6c3d4547dde6602",
    measurementId: "G-5WYKDBVK1X"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export {
    db,
    auth,
}