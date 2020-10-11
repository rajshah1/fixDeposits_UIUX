import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyBNIWK5vVIBOLwhvnAALduTSGS3-8W52Cc",
    authDomain: "infy-rest-data.firebaseapp.com",
    databaseURL: "https://infy-rest-data.firebaseio.com",
    projectId: "infy-rest-data",
    storageBucket: "infy-rest-data.appspot.com",
    messagingSenderId: "858756187255",
    appId: "1:858756187255:web:94958f14dcaef8d577f272"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();