import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getDatabase,
  ref,
  update,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase with your config
initializeApp(firebaseConfig);

// const redirectTimer = 2000; // 2 seconds

// Get parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const redirectUrl = urlParams.get('redirect');
const urlKey = redirectUrl ? redirectUrl.replace(/[^a-zA-Z0-9\-]/g, "-") : null;
// console.log(`DEBUG: ${userId ? userId : "null"}, ${redirectUrl ? redirectUrl : "null"}, ${urlKey ? urlKey : "null"}`);

if (userId && urlKey) {
  // Add/update the "id" to the Firebase realtime database
  const database = getDatabase();
  update(ref(database, 'tracker/' + userId), {
    [urlKey]: 1
  })
  .then(() => {
    // Data saved successfully!
    // console.log(`DEBUG: ${urlKey} for ${userId} successfully saved to database`)
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    window.location.href = redirectUrl ? redirectUrl : "https://koschaos.github.io/blog";
  });
} else {
  window.location.href = redirectUrl ? redirectUrl : "https://koschaos.github.io/blog";
}

// setTimeout(() => {
//   window.location.href = redirectUrl ? redirectUrl : "https://koschaos.github.io/blog";
// }, redirectTimer);
