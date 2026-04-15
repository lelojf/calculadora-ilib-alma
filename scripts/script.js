// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYztWQNOsSN7r9ymF87D80FL4D2-UIhA",
  authDomain: "ilib-alma-99538.firebaseapp.com",
  projectId: "ilib-alma-99538",
  storageBucket: "ilib-alma-99538.firebasestorage.app",
  messagingSenderId: "937917057227",
  appId: "1:937917057227:web:ce831d56709540fe94334e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= LOGIN =================
window.login = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("app").style.display = "block";
    })
    .catch(err => alert("Erro: " + err.message));
};

// ================= CADASTRO =================
window.cadastrar = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => alert("Conta criada!"))
    .catch(err => alert("Erro: " + err.message));
};

// ================= RESET SENHA =================
window.resetSenha = function () {
  const email = document.getElementById("email").value;

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email enviado!"))
    .catch(err => alert("Erro: " + err.message));
};

// ================= CALCULAR =================
function calcular() {
  const nome = document.getElementById("nome_paciente").value;
  const sexo = document.getElementById("sexo").value;
  const idade = parseInt(document.getElementById("idade").value) || 0;
  const peso = parseFloat(document.getElementById("peso").value) || 0;
  const altura = parseFloat(document.getElementById("altura").value) || 0;
  const spo2 = parseFloat(document.getElementById("spo2").value) || 0;
  const comorbidades = document.getElementById("comorbidades").value;
  const cor = document.getElementById("cor_pele").value;
  const foco = document.getElementById("foco").value;

  if (!nome || !idade || !peso || !altura || !spo2) {
    alert("Preencha todos os campos");
    return;
  }

  // ================= IMC =================
  const imc = peso / ((altura / 100) ** 2);
  let classIMC = "";

  if (imc < 18.5) classIMC = "Baixo peso";
  else if (imc < 25) classIMC = "Normal";
  else if (imc < 30) classIMC = "Sobrepeso";
  else classIMC = "Obesidade";

  // ================= RISCO =================
  let risco = "Baixo";

  if (spo2 < 92) risco = "Alto";
  else if (spo2 < 95) risco = "Moderado";

  if (idade > 60) risco = "Elevado";

  if (comorbidades !== "nenhuma" && comorbidades !== "") {
    risco = "Alto";
  }

  // ================= ILIB PARÂMETROS =================
  let tempo = 20;
  let energia = 120;
  let dose = (energia / peso).toFixed(2);

  // ajuste por risco
  let conduta = "";

  if (risco === "Alto") {
    tempo = 30;
    energia = 150;
    conduta = "🔼 Aumentar estímulo";
  } else if (risco === "Moderado") {
    tempo = 25;
    energia = 130;
    conduta = "⚖️ Manter com atenção";
  } else {
    tempo = 20;
    energia = 120;
    conduta = "🔽 Manter padrão";
  }

  // ================= PROTOCOLO =================
  let sessoes = "";
  let frequencia = "";

  if (foco === "anti_inflamatorio") {
    sessoes = "6 a 8 sessões";
    frequencia = "3x por semana";
  } else if (foco === "metabolica") {
    sessoes = "8 a 12 sessões";
    frequencia = "2 a 3x por semana";
  } else if (foco === "regulatoria") {
    sessoes = "5 a 10 sessões";
    frequencia = "2x por semana";
  } else if (foco === "adaptativa") {
    sessoes = "4 a 6 sessões";
    frequencia = "2x por semana";
  } else if (foco === "sos") {
    sessoes = "1 a 3 sessões";
    frequencia = "Imediato";
  }

  // ================= RECOMENDAÇÃO =================
  let recomendacao = "";

  if (foco === "anti_inflamatorio") {
    recomendacao = "Controle inflamatório sistêmico";
  } else if (foco === "metabolica") {
    recomendacao = "Controle metabólico e dieta";
  } else if (foco === "regulatoria") {
    recomendacao = "Regulação hormonal";
  } else if (foco === "adaptativa") {
    recomendacao = "Resposta adaptativa";
  } else if (foco === "sos") {
    recomendacao = "Atendimento clínico imediato";
  }

  // ================= RESULTADO =================
  document.getElementById("resultado").innerHTML = `
    <strong>Paciente:</strong> ${nome}<br>
    <strong>Sexo:</strong> ${sexo}<br>
    <strong>Idade:</strong> ${idade}<br><br>

    <strong>IMC:</strong> ${imc.toFixed(2)} (${classIMC})<br>
    <strong>SpO2:</strong> ${spo2}%<br>
    <strong>Risco:</strong> ${risco}<br><br>

    <strong>Comorbidades:</strong> ${comorbidades}<br>
    <strong>Cor da pele:</strong> ${cor}<br>
    <strong>Foco:</strong> ${foco}<br><br>

    <strong>Tempo:</strong> ${tempo} min<br>
    <strong>Energia:</strong> ${energia} J<br>
    <strong>Dose:</strong> ${dose} J/kg<br>
    <strong>Conduta:</strong> ${conduta}<br><br>

    <strong>Protocolo:</strong><br>
    Sessões: ${sessoes}<br>
    Frequência: ${frequencia}<br><br>

    <strong>Recomendação:</strong> ${recomendacao}
  `;
}

// ================= EVENTO DE CLIQUE =================
// Garantir que o código só rode depois que a página estiver carregada
document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("btnCalcular");

  if (botao) {
    botao.addEventListener("click", calcular);  // Associa o evento de clique à função calcular
  }
});