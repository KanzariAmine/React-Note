import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

  // Your web app's Firebase configuration
  var firebaseConfig = {
  apiKey: "AIzaSyCfrroVw04-1nSXLd1q4iAHu4s4mFMgziE",
  authDomain: "evernote-clone-cc2a1.firebaseapp.com",
  databaseURL: "https://evernote-clone-cc2a1.firebaseio.com",
  projectId: "evernote-clone-cc2a1",
  storageBucket: "evernote-clone-cc2a1.appspot.com",
  messagingSenderId: "1098892673880",
  appId: "1:1098892673880:web:562ed72bec36f71a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
