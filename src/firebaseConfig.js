// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUYSVRHlUYQGxgvnvLYnbihF1IsPTkeY",
  authDomain: "anime-bddfe.firebaseapp.com",
  projectId: "anime-bddfe",
  storageBucket: "anime-bddfe.appspot.com",
  messagingSenderId: "945160212520",
  appId: "1:945160212520:web:9460ffa2ed15018225e51d"
};

const app = initializeApp(firebaseConfig);


const storage = getStorage(app);
export { storage };


