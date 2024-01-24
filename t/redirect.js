// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9zlLH9xgSUrw2WEi4PCVtsU5jqdwaKj8",
  authDomain: "url-tracker-f404e.firebaseapp.com",
  databaseURL: "https://url-tracker-f404e-default-rtdb.firebaseio.com",
  projectId: "url-tracker-f404e",
  storageBucket: "url-tracker-f404e.appspot.com",
  messagingSenderId: "73492629103",
  appId: "1:73492629103:web:b755c95078d9600247ef9a"
};

firebase.initializeApp(firebaseConfig);

// Get the "id" and "redirect" query parameters
const id = getParameterByName("id");
const redirect = getParameterByName("redirect");

// Add the "id" to the Firebase realtime database
const database = firebase.database();
const ref = database.ref("url-ids").push();
ref.set({
  id: id
});

// Redirect the user to the "redirect" URL
window.location.href = redirect;

// Helper function to get a query parameter by name
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
