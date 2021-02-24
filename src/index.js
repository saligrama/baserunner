import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

window.firebaseConfig = null;
window.db = null;
window.firebaseUser = null;
window.uid = null;
window.confirmationResult = null;

window.displayReadResults = function(querySnapshot) {
  var rows = "";
  querySnapshot.forEach((doc) => {
    var row = `${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`;
    console.log(row);
    rows = `${rows}\n${row}`
  });
  document.getElementById("query-results").innerHTML = rows;
};

window.displayMessage = function(message) {
  console.log(message)
  document.getElementById("query-results").innerText = message;
}

window.displayError = function(message) {
  console.error(message)
  document.getElementById("query-results").innerText = message;
}

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

