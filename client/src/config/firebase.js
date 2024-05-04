// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB544ckh-_U7w62PljZlQpXmotDp2UfVTw",
  authDomain: "my-basket-diaries.firebaseapp.com",
  projectId: "my-basket-diaries",
  storageBucket: "my-basket-diaries.appspot.com",
  messagingSenderId: "847696439485",
  appId: "1:847696439485:web:2f2546aef1ee02e70defd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
