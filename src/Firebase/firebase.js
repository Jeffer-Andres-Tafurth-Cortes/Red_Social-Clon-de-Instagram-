// Importamos las funciones necesarias del SDK que necesitamos
import { initializeApp } from "firebase/app";

// Importamos el autenticador de firebase que va a ser usado en la aplicacion
import { getAuth } from 'firebase/auth'

// Importamos las funciones para guardar la informacion
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Esta es la configuracion de Firebase dentro de la aplicacion
const firebaseConfig = {
  apiKey: "AIzaSyD0WGPxWUSBTKr7eVz8rwhTKGeU6H7mDnk",
  authDomain: "instagram-clone-full-sta-e1ec1.firebaseapp.com",
  projectId: "instagram-clone-full-sta-e1ec1",
  storageBucket: "instagram-clone-full-sta-e1ec1.appspot.com",
  messagingSenderId: "556826088725",
  appId: "1:556826088725:web:22e28f05d54348718f851c",
  measurementId: "G-8JBVCZC860"
};

// Las siguientes constantes lo que hacen es inicializar firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, auth, firestore, storage}