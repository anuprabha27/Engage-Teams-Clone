import firebase from 'firebase/app';
import 'firebase/auth';

export const auth =  firebase.initializeApp({
    {FIREBASE_CREDENTIALS}
  }).auth();