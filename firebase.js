// Importando as funções necessárias do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNYztWQNOsSN7r9ymF87D80FL4D2-UIhA",
  authDomain: "ilib-alma-99538.firebaseapp.com",
  projectId: "ilib-alma-99538",
  storageBucket: "ilib-alma-99538.firebasestorage.app",
  messagingSenderId: "937917057227",
  appId: "1:937917057227:web:ce831d56709540fe94334e"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função de login
window.login = function () {
  const email = emailInput.value;
  const senha = senhaInput.value;

  if (!email || !senha) {
    alert("Digite email e senha");
    emailInput.focus();
    return;
  }

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("app").style.display = "block";
    })
    .catch(err => alert(err.message));
};

// Função de cadastro
window.cadastrar = function () {
  const email = emailInput.value;
  const senha = senhaInput.value;

  if (!email || !senha) {
    emailInput.focus();
    return;
  }

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => alert("Conta criada!"))
    .catch(err => alert(err.message));
};

// Função de reset de senha
window.resetSenha = function () {
  const email = emailInput.value;

  if (!email) {
    emailInput.focus();
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email enviado!"))
    .catch(err => alert(err.message));
};