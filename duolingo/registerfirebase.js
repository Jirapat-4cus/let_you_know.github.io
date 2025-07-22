import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBU0x1OfkVMlKUTvu6zsgBo5V2m2tHkgJM",
  authDomain: "ticta-7dffe.firebaseapp.com",
  projectId: "ticta-7dffe",
  storageBucket: "ticta-7dffe.firebasestorage.app",
  messagingSenderId: "150669352989",
  appId: "1:150669352989:web:daec6d947ae8aa0bc6e6f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//input
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const submit = document.getElementById('submit');
submit.addEventListener('click', function(Event)) {
  event.preventDefault();
  alert('Registering...');
}