let listaDeNumerosSorteados = [];
let listaDeNumerosChutados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let mensagem = '';


function habilitarTextoChutes(){

    let textoVisualizacao = document.getElementsByClassName('lista_numeros')[0];

    if (listaDeNumerosChutados.length == 0){
        textoVisualizacao.style.display = "none";
    } else{
        textoVisualizacao.style.display = "block";
    }
}

function exibirNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirListaNumeros(classe, texto){
    let lista = document.getElementsByClassName(classe)[0];
    lista.innerHTML = texto;
}

function exibirMensagemInicial(){
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){

    let chute = document.querySelector('input').value;

    listaDeNumerosChutados.push(chute);

    habilitarTextoChutes();

    if (chute == numeroSecreto){
        exibirNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTenativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirNaTela('p', mensagemTenativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let mensagem = `Os números chutados até agora foram: ${listaDeNumerosChutados}`;

        if (chute > numeroSecreto){
            exibirNaTela('p', 'O número secreto é menor.');
            exibirListaNumeros('lista_numeros', mensagem);
        } else {
            exibirNaTela('p', 'O número secreto é maior.');
            exibirListaNumeros('lista_numeros', mensagem);
        }

        tentativas++;
        limparCampo();
    }
        
}

function gerarNumeroAleatorio(){
    let numEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNumerosEscolhidos = listaDeNumerosSorteados.length;

    if (qtdNumerosEscolhidos == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numEscolhido);
        return numEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    listaDeNumerosChutados = [];
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    habilitarTextoChutes();
    
}