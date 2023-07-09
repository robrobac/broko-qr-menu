// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqn3aMO52Bu_pX2-jBUpEh93ywIFSnDeI",
    authDomain: "broko-menu.firebaseapp.com",
    projectId: "broko-menu",
    storageBucket: "broko-menu.appspot.com",
    messagingSenderId: "711632757730",
    appId: "1:711632757730:web:218aa8f3d94c866a718fbb",
    measurementId: "G-KEH937KRK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth }