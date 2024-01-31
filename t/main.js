import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, update, } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
let redirectUrl = urlParams.get('redirect');
if (!redirectUrl) {
  redirectUrl = "https://koschaos.github.io/pages";
}
const urlKey =  redirectUrl.replace(/[^a-zA-Z0-9\-]/g, "-");
// console.log(`DEBUG: ${userId ? userId : "null"}, ${redirectUrl ? redirectUrl : "null"}, ${urlKey ? urlKey : "null"}`);

if (userId && urlKey) {
  initializeApp(firebaseConfig);
  const database = getDatabase();
  update(ref(database, 'tracker/' + urlKey), {
    [userId]: 1
  })
  .then(() => {
    // console.log(`DEBUG: ${userId} for ${urlKey} successfully saved to database`);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    window.location.href = redirectUrl;
  });
} else {
  window.location.href = redirectUrl;
}
