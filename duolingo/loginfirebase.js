import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";

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



const submit = document.getElementById('submit');
submit.addEventListener('click', function(event) {
  event.preventDefault();

  //input
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

 signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert('Registration successful! Welcome, ' + user.email);
    window.location.href = "login.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Error: ' + errorMessage);
    // ..
  });
})

const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('google-login-btn');
googleLogin.addEventListener('click', function() {
    signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        alert('Login successful! Welcome, ' + user.email);
        window.location.href = "index.html";
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        alert('Error: ' + errorMessage);
        });
})