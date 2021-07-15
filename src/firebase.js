import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8Rao1f4Jcm2d8GuIHsZk45bwcIXEJIUU",
  authDomain: "tweetit-2a9fb.firebaseapp.com",
  projectId: "tweetit-2a9fb",
  storageBucket: "tweetit-2a9fb.appspot.com",
  messagingSenderId: "105516842367",
  appId: "1:105516842367:web:5a92036a2d3bb6e654ae4a",
  measurementId: "G-CM5R42WRE2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
