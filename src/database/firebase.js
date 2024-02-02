import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBh7sPTPVISW3H0ReTguRLC7y3n4KlZqnE",
  authDomain: "hirein5.firebaseapp.com",
  projectId: "hirein5",
  storageBucket: "hirein5.appspot.com",
  messagingSenderId: "914569118397",
  appId: "1:914569118397:web:46e6b0c6c08288f0eaadd4",
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };
