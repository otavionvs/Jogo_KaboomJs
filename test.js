let listaNome = [];
let listaScore = [];

function addNome() {
    if (localStorage.listaNomeTotal) {
        listaNome = JSON.parse(localStorage.getItem('listaNomeTotal'));
    }

    let novoNome = document.getElementById('nome').value;
    listaNome.push(novoNome);
    document.getElementById('nome').value = "";
    localStorage.listaNomeTotal = JSON.stringify(listaNome);
}

function addScore() {
    if (localStorage.listaScoreTotal) {
        listaScore = JSON.parse(localStorage.getItem('listaScoreTotal'));
    }

    let novoNome = document.getElementById('score').value;
    listaScore.push(novoNome);
    document.getElementById('score').value = "";
    localStorage.listaScoreTotal = JSON.stringify(listaScore);
}

function mostrarRanking(){
    console.log("LISTA", listaNome);
    for(let i=0; i<listaNome.length; i++){
        console.log("LISTA", listaNome[i]);
    }
}

function verificarScoreVencedor(){
    let numeros = [];
    for(let i=0; i<listaScore.length; i++){
        numeros.push(parseInt(listaScore[i]));
    }
    let maiorValor = Math.max.apply(null, numeros);
    for (let i=0; i<numeros.length; i++){
        if (maiorValor == numeros[i]){
            console.log("nome", listaNome[i], "score", maiorValor);
        }
    }
}
