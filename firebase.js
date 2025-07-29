// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3LKLEgiu_hCwZjknwtvhGyG0qEhInc6E",
  authDomain: "futbol-ai-uygulama.firebaseapp.com",
  projectId: "futbol-ai-uygulama",
  storageBucket: "futbol-ai-uygulama.firebasestorage.app",
  messagingSenderId: "748986759798",
  appId: "1:748986759798:web:21a96134cc33ab74dabd57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };