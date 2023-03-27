import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7-qsQJMR5j8R90G-BiEFtu2NPcmtNURs",
  authDomain: "sae401clubmed.firebaseapp.com",
  projectId: "sae401clubmed",
  storageBucket: "sae401clubmed.appspot.com",
  messagingSenderId: "905391230116",
  appId: "1:905391230116:web:49d50d71e968287baeea31"
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.use(router)

app.mount('#app')
