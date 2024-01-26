import { initializeApp } from "firebase/app";
import {
  getDatabase,
  // ref,
  // set,
} from 'firebase/database';
import { firebaseConfig } from './config';

// Initialize Firebase with your config
initializeApp(firebaseConfig);

// Reference to your Firebase Realtime Database
const database = getDatabase();

// Get parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const redirectUrl = urlParams.get('redirect');

// Update the hidden form with user ID and redirect URL
document.getElementById('userId').value = userId;
document.getElementById('redirectUrl').value = redirectUrl;

// Store the data in Firebase Realtime Database
database.ref('redirects/' + userId).set({
  redirectUrl: redirectUrl,
});

// Redirect the user to the specified URL
setTimeout(() => {
  document.getElementById('redirectForm').submit();
}, 2000); // Redirect after 2 seconds (adjust as needed)
