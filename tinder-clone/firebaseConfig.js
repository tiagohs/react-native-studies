import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBHOcfdHg9b5NeMDprm2k_mrOlv3hrpLi4",
    authDomain: "tinder-clone-dc2eb.firebaseapp.com",
    projectId: "tinder-clone-dc2eb",
    storageBucket: "tinder-clone-dc2eb.appspot.com",
    messagingSenderId: "815559523545",
    appId: "1:815559523545:web:19f8405bcea3216c7ad2c8",
    measurementId: "G-XDS8H9ZMHG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }