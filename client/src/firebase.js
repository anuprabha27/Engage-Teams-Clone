import firebase from 'firebase/app';
import 'firebase/auth';

export const auth =  firebase.initializeApp({
    apiKey: "AIzaSyAmO4hQCki5aUZIpZJ2gLqPhhrlozIWO0U",
  authDomain: "teams-clone-30c29.firebaseapp.com",
  projectId: "teams-clone-30c29",
  storageBucket: "teams-clone-30c29.appspot.com",
  messagingSenderId: "952931537479",
  appId: "1:952931537479:web:078d58e86c813e72c35762"
  }).auth();