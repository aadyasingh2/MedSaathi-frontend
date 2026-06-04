import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZDDN7rViH8upBJEOvmNXd_TO_55WRwIg",
    authDomain: "medsaathi-8bac6.firebaseapp.com",
    projectId: "medsaathi-8bac6",
    storageBucket: "medsaathi-8bac6.firebasestorage.app",
    messagingSenderId: "46301102470",
    appId: "1:46301102470:web:02ed7bdec3ce8667142c07",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;