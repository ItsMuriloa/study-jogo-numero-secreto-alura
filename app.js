//Jogo do numero secreto
let listaDeNumerosSecretos = []; // Lista que armazena os numeros secretos
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio(); //Gera um n.s aleatorio
let tentativas = 1; //Armazena o valor das tentativas

//Exibir texto na tela, se o n.s é maior ou menor
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

//Gerar o numero aleatorio
function gerarNumeroAleatorio() {
  let numeroAleatorioGerado = parseInt(Math.random() * numeroLimite + 1);
  if (listaDeNumerosSecretos.length == numeroLimite) {
    listaDeNumerosSecretos = [];
  }
  if (listaDeNumerosSecretos.includes(numeroAleatorioGerado)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSecretos.push(numeroAleatorioGerado);
    return numeroAleatorioGerado;
  }
}

//Verificar o chute
function verificarChute() {
  //Pega o valor do chute que foi adicionado
  let chute = document.querySelector("input").value;
  //Condição para verificar o chute
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

//Limpa o campo toda vez
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

//Reinicia o jogo apos terminar
function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

//Exibi a mensagem inicial apos reiniciar o jogo
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
