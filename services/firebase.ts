import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADvSy9F57h5ztEUsdl_w8XiasNlCHdTz0",
    authDomain: "assignmint-63f8b.firebaseapp.com",
    projectId: "assignmint-63f8b",
    storageBucket: "assignmint-63f8b.appspot.com",
    messagingSenderId: "908260062635",
    appId: "1:908260062635:web:80ec4d473546097c190eee",
    measurementId: "G-LE7VXB2MFS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
