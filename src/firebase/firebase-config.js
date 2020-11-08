import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCPGzYLWjSE-8cCojpCClhkbDZouZVqVVo",
	authDomain: "sicper-e1812.firebaseapp.com",
	databaseURL: "https://sicper-e1812.firebaseio.com",
	projectId: "sicper-e1812",
	storageBucket: "sicper-e1812.appspot.com",
	messagingSenderId: "868337651917",
	appId: "1:868337651917:web:ce83022e99f450f19dd984"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
