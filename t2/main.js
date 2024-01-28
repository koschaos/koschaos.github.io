import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase with your config
initializeApp(firebaseConfig);

const redirectTimer = 5000; // 5 seconds

// Get parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const redirectUrl = urlParams.get('redirect');
const urlKey = redirectUrl ? redirectUrl.replace(/[^a-zA-Z0-9\-]/g, "-") : null;
// console.log(`DEBUG: ${userId ? userId : "null"}, ${redirectUrl ? redirectUrl : "null"}, ${urlKey ? urlKey : "null"}`);

if (userId && urlKey) {
  // Add the "id" to the Firebase realtime database
  const database = getDatabase();
  set(ref(database, 'tracker/' + userId), {
    [urlKey]: 1
  })
  .then(() => {
    // Data saved successfully!
    console.log(`DEBUG: ${urlKey} for ${userId} successfully saved to database`)
  })
  .catch((error) => {
    console.error(error);
  });
}

setTimeout(() => {
  window.location.href = redirectUrl ? redirectUrl : "https://koschaos.github.io/blog";
}, redirectTimer);
