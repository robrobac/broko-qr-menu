// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCqn3aMO52Bu_pX2-jBUpEh93ywIFSnDeI",
    authDomain: "broko-menu.firebaseapp.com",
    projectId: "broko-menu",
    storageBucket: "broko-menu.appspot.com",
    messagingSenderId: "711632757730",
    appId: "1:711632757730:web:218aa8f3d94c866a718fbb",
    measurementId: "G-KEH937KRK3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, storage, db }
