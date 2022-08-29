function inicio() {
    if (localStorage.score) {
        vencedores();
    }
    if (localStorage.listaNomeTotal) {
        listaNome = JSON.parse(localStorage.getItem('listaNomeTotal'));
    }
    if (localStorage.listaScoreTotal) {
        listaScore = JSON.parse(localStorage.getItem('listaScoreTotal'));
    }
    adicionarNaLista();
}

function modal() {
    let modal = document.getElementById('tudo');
    modal.style.zIndex = 999;
}

function FecharModal() {
    let modal = document.getElementById('tudo');
    modal.style.zIndex = 0;
}

let listaNome = [];
let listaScore = [];

function addNome() {
    // if (localStorage.listaNomeTotal) {
    //     listaNome = JSON.parse(localStorage.getItem('listaNomeTotal'));
    // }

    let novoNome = document.getElementById('nome').value;
    listaNome.push(novoNome);
    document.getElementById('nome').value = "";
    localStorage.listaNomeTotal = JSON.stringify(listaNome);
}

// function addScore() {
//     if (localStorage.listaScoreTotal) {
//         listaScore = JSON.parse(localStorage.getItem('listaScoreTotal'));
//     }

//     let novoScore = localStorage.getItem("score");
//     listaScore.push(novoScore);
//     localStorage.removeItem("score");
//     // document.getElementById('score').value = "";
//     localStorage.listaScoreTotal = JSON.stringify(listaScore);
// }

function mostrarRanking() {
    let modal = document.getElementById('ranking');
    modal.style.zIndex = 999;
}

function vencedores() {
    if (localStorage.listaScoreTotal) {
        listaScore = JSON.parse(localStorage.getItem('listaScoreTotal'));
    }
    if (localStorage.listaNomeTotal) {
        listaNome = JSON.parse(localStorage.getItem('listaNomeTotal'));
    }
    if (!localStorage.topo) {
        localStorage.setItem("topo", 0);
    }
    let novoScore = localStorage.getItem("score");
    let novoNome = listaNome[listaNome.length - 1];

    if (parseInt(localStorage.getItem("topo")) == 0) {
        listaScore.push(novoScore);

    } else if (parseInt(localStorage.getItem("topo")) == 1) {
        if (novoScore > parseInt(listaScore[0])) {
            let velhoScore = listaScore[0];
            listaScore = [];
            listaScore.push(novoScore);
            listaScore.push(velhoScore);
            listaNome[1] = listaNome[0];
            listaNome[0] = novoNome;
        } else {
            listaScore.push(novoScore);
        }

    } else if (parseInt(localStorage.getItem("topo")) == 2) {
        if (novoScore > parseInt(listaScore[0])) {
            let velhoScore = listaScore;
            console.log("Velho 1", velhoScore);
            listaScore = [];
            console.log("Velhor 2", velhoScore);
            listaScore.push(novoScore);
            listaScore.push(velhoScore[0]);
            listaScore.push(velhoScore[1]);
            listaNome[2] = listaNome[1];
            listaNome[1] = listaNome[0];
            listaNome[0] = novoNome;
        } else if (novoScore > parseInt(listaScore[1])) {
            let velhoScore = listaScore[1];
            listaScore[1] = novoScore;
            listaScore.push(velhoScore);
            listaNome[2] = listaNome[1];
            listaNome[1] = novoNome;
        } else {
            listaScore.push(novoScore);
        }

    } else if (parseInt(localStorage.getItem("topo")) == 3) {
        if (novoScore > parseInt(listaScore[0])) {
            let velhoScore = listaScore;
            console.log("Velho 1", velhoScore);
            listaScore = [];
            console.log("Velhor 2", velhoScore);
            listaScore.push(novoScore);
            listaScore.push(velhoScore[0]);
            listaScore.push(velhoScore[1]);
            listaScore.push(velhoScore[2]);
            listaNome[2] = listaNome[1];
            listaNome[1] = listaNome[0];
            listaNome[0] = novoNome;
        } else if (novoScore > parseInt(listaScore[1])) {
            listaScore[2] = listaScore[1];
            listaScore[1] = novoScore;
            listaNome[2] = listaNome[1];
            listaNome[1] = novoScore;
        } else if (novoScore > parseInt(listaScore[2])) {
            listaScore[2] = novoScore;
            listaNome[2] = novoNome;
        }
    }
    localStorage.removeItem("score");

    localStorage.listaNomeTotal = JSON.stringify(listaNome);
    localStorage.listaScoreTotal = JSON.stringify(listaScore);
    localStorage.setItem("topo", parseInt(localStorage.getItem("topo")) + 1);

}

// function verificarScoreVencedor() {
//     let numeros = [];
//     for (let i = 0; i < listaScore.length; i++) {
//         numeros.push(parseInt(listaScore[i]));
//     }

//     let maiorValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (maiorValor == numeros[i]) {
//             return i;
//         }
//     }
// }

// function verificarScoreSegundo() {
//     let numeros = [];
//     for (let i = 0; i < listaScore.length; i++) {
//         numeros.push(parseInt(listaScore[i]));
//     }
//     let maiorValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (maiorValor == numeros[i]) {
//             numeros[i] = 0;
//         }
//     }
//     console.log(numeros);

//     let segundoValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (segundoValor == numeros[i]) {
//             return i;
//         }
//     }
// }

// function verificarScoreTerceiro() {
//     let numeros = [];
//     for (let i = 0; i < listaScore.length; i++) {
//         numeros.push(parseInt(listaScore[i]));
//     }
//     let maiorValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (maiorValor == numeros[i]) {
//             numeros[i] = 0;
//         }
//     }

//     let segundoValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (segundoValor == numeros[i]) {
//             numeros[i] = 0
//         }
//     }

//     let terceiroValor = Math.max.apply(null, numeros);
//     for (let i = 0; i < numeros.length; i++) {
//         if (terceiroValor == numeros[i]) {
//             return i;
//         }
//     }
// }

function adicionarNaLista() {
    // let indice = verificarScoreVencedor();
    let nome = listaNome[0];
    let score = listaScore[0];
    let vencedorNome = document.getElementById('nomeWin');
    vencedorNome.textContent = nome;
    let vencedorScore = document.getElementById('score1');
    vencedorScore.textContent = score;

    // let indice2 = verificarScoreSegundo();
    let nome2 = listaNome[1];
    let score2 = listaScore[1];
    let vencedorNome2 = document.getElementById('nomeTwo');
    vencedorNome2.textContent = nome2;
    let vencedorScore2 = document.getElementById('score2');
    vencedorScore2.textContent = score2;

    // let indice3 = verificarScoreTerceiro();
    let nome3 = listaNome[2];
    let score3 = listaScore[2];
    let vencedorNome3 = document.getElementById('nomeTree');
    vencedorNome3.textContent = nome3;
    let vencedorScore3 = document.getElementById('score3');
    vencedorScore3.textContent = score3;
}


function game() {
    addNome();
    // addScore();
    // adicionarNaLista();
    window.location.href = "game.html";
}

















// let falso = 0;
// const score = localStorage.getItem("Score")
// const score1;
// const score2;
// const score3;

// if (localStorage.getItem("Score1")) {
//     score1 = localStorage.getItem("Score1");
// } else {
//     localStorage.setItem("Score1", score)
//     score1 = localStorage.getItem("Score1");
// }
// if (localStorage.getItem("Score2")) {
//     score2 = localStorage.getItem("Score2");
// }
// if (localStorage.getItem("Score3")) {
//     score3 = localStorage.getItem("Score3");
// }

// if (score > score1) {
//     falso = score1;
//     score1 = score;
//     score3 = score2;
//     score2 = falso;
// } else if (score > score2) {
//     score3 = score2;
//     score2 = score;
// } else if (score > score3) {
//     score3 = score;
// }



// let nomeRank = document.getElementById('nomeWin');
// nomeRank.textContent = localStorage.getItem("nome1");

// function game() {
//     const nome = document.querySelector("#nome").value;
//     // if(lista){
//     //     lista = 0;
//     //     // lista.push({nome: nome, score: 0});
//     // }
//     lista = 0;
//     localStorage.setItem("Rank", JSON.stringify(lista))
//     window.location.href = "game.html";

// }

// function nome() {
//     localStorage.setItem("Score1", score1);
//     localStorage.setItem("Score2", score2);
//     localStorage.setItem("Score3", score3);
//     // localStorage.setItem("nome1", lista[0].nome);
//     if (localStorage.getItem("Score1")) {
//         let nomeRank = document.getElementById('nomeWin');
//         nomeRank.textContent = localStorage.getItem("Score1");
//     }
//     if (localStorage.getItem("Score2")) {
//         let nomeRank2 = document.getElementById('nomeTwo');
//         nomeRank2.textContent = localStorage.getItem("Score2");
//     }
//     if (localStorage.getItem("Score3")) {
//         let nomeRank3 = document.getElementById('nomeTree');
//         nomeRank3.textContent = localStorage.getItem("Score3");
//     }
// }