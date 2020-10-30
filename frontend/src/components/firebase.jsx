import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyDBAhGn6N0Zi4xxQ5CcNkJtN334mV1Nemo",
	authDomain: "hack-a-blog.firebaseapp.com",
	databaseURL: "https://hack-a-blog.firebaseio.com",
	projectId: "hack-a-blog",
	storageBucket: "hack-a-blog.appspot.com",
	messagingSenderId: "374374139900",
	appId: "1:374374139900:web:173ba830985e2dd0399479",
	measurementId: "G-S6WMYX28VJ",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
