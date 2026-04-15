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
document.getElementById("btnLogin").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("app").style.display = "block";
    })
    .catch(err => alert("Erro: " + err.message));
});

// ================= CADASTRO =================
document.getElementById("btnCadastro").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => alert("Conta criada!"))
    .catch(err => alert("Erro: " + err.message));
});

// ================= RESET SENHA =================
document.getElementById("btnResetSenha").addEventListener("click", function () {
  const email = document.getElementById("email").value;

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email enviado!"))
    .catch(err => alert("Erro: " + err.message));
});

// ================= CALCULAR =================
document.getElementById("btnCalcular").addEventListener("click", function () {
  const nome = document.getElementById('nome_paciente').value;
  const sexo = document.getElementById('sexo').value;
  const idade = Number(document.getElementById('idade').value);
  const peso = Number(document.getElementById('peso').value);
  const alturaCm = Number(document.getElementById('altura').value);
  const altura = alturaCm / 100;
  const spo2 = Number(document.getElementById('spo2').value);
  const comorb = document.getElementById('comorbidades').value;
  const corPele = document.getElementById('cor_pele').value;
  const foco = document.getElementById('foco').value;

  if (!nome || !sexo || !idade || !peso || !alturaCm || !spo2 || !corPele || !foco) {
    document.getElementById('resultado').innerHTML = "⚠️ Preencha todos os campos.";
    return;
  }

  // IMC
  let imc = peso / (altura * altura);

  // SPO2
  let classificacaoSpo2 = "";
  if (spo2 >= 95) classificacaoSpo2 = "Ótima";
  else if (spo2 >= 92) classificacaoSpo2 = "Aceitável";
  else if (spo2 >= 90) classificacaoSpo2 = "Limite preocupante";
  else classificacaoSpo2 = "🚨 Emergência médica";

  if (spo2 < 90) {
    document.getElementById('resultado').innerHTML =
    "<b>🚨 ALERTA CLÍNICO</b><br>SpO2: " + spo2 + "%<br>Encaminhar imediatamente.";
    return;
  }

  // TEMPO BASE
  let tempo = 0;

  if (foco === "anti_age") tempo = 10;
  if (foco === "antioxidante") tempo = 15;
  if (foco === "anti_inflamatorio") tempo = 20;
  if (foco === "adaptativa") tempo = 25;
  if (foco === "regulatoria") tempo = 30;
  if (foco === "metabolica") tempo = 40;
  if (foco === "sos") tempo = 60;

  // AJUSTES
  if (sexo === "F") tempo *= 0.95;
  if (idade <= 12) tempo *= 0.8;
  if (idade > 60) tempo *= 0.9;
  if (spo2 < 95) tempo *= 1.1;

  if (comorb === "cardiopatia") tempo *= 0.85;
  if (comorb === "respiratoria") tempo *= 1.1;
  if (comorb === "autoimune") tempo *= 1.1;

  if (corPele === "morena") tempo *= 1.05;
  if (corPele === "negra") tempo *= 1.1;

  if (tempo < 10) tempo = 10;
  if (tempo > 60) tempo = 60;

  tempo = Math.round(tempo);

  // ENERGIA E DOSE
  let energia = tempo * 6;
  let volume = peso * 70;
  let dose = Number((energia / volume).toFixed(3));

  let condutaDose = "";
  if (dose < 0.03) condutaDose = "🔼 Aumentar estímulo";
  else if (dose <= 0.05) condutaDose = "✅ Manter protocolo";
  else if (dose <= 0.06) condutaDose = "⚠️ Monitorar";
  else condutaDose = "🚨 Reduzir dose";

  // TRATAMENTO
  let tratamento = "";

  switch(foco){
    case "anti_age":
      tratamento = "ILIB Anti-age (regeneração celular)";
      break;
    case "antioxidante":
      tratamento = "ILIB Antioxidante (redução de radicais livres)";
      break;
    case "anti_inflamatorio":
      tratamento = "ILIB Anti-inflamatório";
      break;
    case "adaptativa":
      tratamento = "ILIB Adaptativa";
      break;
    case "regulatoria":
      tratamento = "ILIB Regulatória";
      break;
    case "metabolica":
      tratamento = "ILIB Metabólica";
      break;
    case "sos":
      tratamento = "ILIB SOS Clínico";
      break;
  }

  // FREQUÊNCIA E DURAÇÃO
  let frequencia = "";
  let duracao = "";

  switch(foco){
    case "anti_age":
      frequencia = "2 a 3x por semana";
      duracao = "4 a 8 semanas";
      break;
    case "antioxidante":
      frequencia = "3x por semana";
      duracao = "3 a 6 semanas";
      break;
    case "anti_inflamatorio":
      frequencia = "diário ou 5x por semana";
      duracao = "1 a 3 semanas";
      break;
    case "adaptativa":
      frequencia = "3x por semana";
      duracao = "4 semanas";
      break;
    case "regulatoria":
      frequencia = "2 a 3x por semana";
      duracao = "6 semanas";
      break;
    case "metabolica":
      frequencia = "3 a 5x por semana";
      duracao = "4 a 8 semanas";
      break;
    case "sos":
      frequencia = "diário";
      duracao = "até estabilização clínica";
      break;
  }

  // CLASSIFICAÇÃO
  let classificacao = "Baixo risco";
  if (spo2 < 95 || comorb !== "nenhuma") classificacao = "Moderado";
  if (comorb === "cardiopatia") classificacao = "Alto risco";

  // RESULTADO FINAL
  document.getElementById('resultado').innerHTML = `
    <b>📋 RELATÓRIO ILIB ALMA</b><br><br>

    👤 ${nome}<br>
    ⚧ ${sexo === "M" ? "Masculino" : "Feminino"}<br>
    📏 IMC: ${imc.toFixed(1)}<br>
    🫁 SpO2: ${spo2}% (${classificacaoSpo2})<br>
    🎨 Pele: ${corPele}<br>
    🩺 Comorbidade: ${comorb || "Nenhuma"}<br><br>

    🧬 <b>Tratamento:</b><br>
    ${tratamento}<br>

    📅 <b>Frequência:</b> ${frequencia}<br>
    📆 <b>Duração:</b> ${duracao}<br><br>

    ⏱ <b>Tempo por sessão:</b> ${tempo} min<br><br>

    ⚡ Energia: ${energia} J<br>
    🩸 Volume: ${volume} ml<br>
    💉 Dose: ${dose} J/ml<br><br>

    📊 ${condutaDose}<br><br>

    📊 Classificação: ${classificacao}<br><br>

    ⚠️ Monitorar resposta clínica
  `;
});
