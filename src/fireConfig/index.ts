import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

dotenv.config();

const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY_PROD,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PROD,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PROD,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PROD,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PROD,
        appId: process.env.REACT_APP_FIREBASE_APP_ID_PROD,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_PROD,
      }
    : {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      };
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY_PROD,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PROD,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PROD,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PROD,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PROD,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID_PROD,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_PROD,
// };
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
