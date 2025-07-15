// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBX4abc-your-api-key",
  authDomain: "souparna1-ae0ae.firebaseapp.com",
  databaseURL: "https://souparna1-ae0ae-default-rtdb.firebaseio.com",
  projectId: "souparna1-ae0ae",
  storageBucket: "souparna1-ae0ae.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd1234"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
