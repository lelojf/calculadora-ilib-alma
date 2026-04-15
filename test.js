import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYztWQNOsSN7r9ymF87D80FL4D2-UIhA",
  authDomain: "ilib-alma-99538.firebaseapp.com",
  projectId: "ilib-alma-99538",
  storageBucket: "ilib-alma-99538.firebasestorage.app",
  messagingSenderId: "937917057227",
  appId: "1:937917057227:web:ce831d56709540fe94334e"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Teste de login simples
const email = "lelojf@hotmail.com"; // Substitua com um e-mail de usuário válido
const senha = "senha123"; // Substitua com uma senha válida

signInWithEmailAndPassword(auth, email, senha)
  .then(userCredential => {
    console.log("Usuário logado:", userCredential.user);
  })
  .catch(error => {
    console.error("Erro ao fazer login:", error.message);
  });