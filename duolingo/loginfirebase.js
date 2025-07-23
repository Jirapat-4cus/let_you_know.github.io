// ใช้ Firebase Modular API (v10)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBU0x1OfkVMlKUTvu6zsgBo5V2m2tHkgJM",
  authDomain: "ticta-7dffe.firebaseapp.com",
  projectId: "ticta-7dffe",
  storageBucket: "ticta-7dffe.appspot.com",
  messagingSenderId: "150669352989",
  appId: "1:150669352989:web:daec6d947ae8aa0bc6e6f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Email/Password login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login successful! Welcome, ' + userCredential.user.email);
      window.location.href = "course.html";
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
});

// Google login
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById('google-login-btn');

googleLogin.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert('Google login successful! Welcome, ' + result.user.email);
      window.location.href = "course.html";
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    });
});
