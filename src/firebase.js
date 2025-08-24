import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBU0x1OfkVMlKUTvu6zsgBo5V2m2tHkgJM",
  authDomain: "ticta-7dffe.firebaseapp.com",
  databaseURL:
    "https://ticta-7dffe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ticta-7dffe",
  storageBucket: "ticta-7dffe.firebasestorage.app",
  messagingSenderId: "150669352989",
  appId: "1:150669352989:web:daec6d947ae8aa0bc6e6f4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics;
if (typeof window !== "undefined" && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

export { analytics };

if (import.meta.env.DEV && typeof window !== "undefined") {
  // Uncomment these lines if you want to use Firebase emulators in development
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;
