var palavraEscolhida = "balde";

let listaPerguntas = {
  "Um gênero textual: ": ["fabula", "poema", "conto", "teatro",],
  "Tipos de contos: ": ["aventura", "misterio", "fadas", "piada", "romance"],
  "Tem na fábula: ": ["animais", "personagens", "moral", "titulo"]
}

let listaPontos = ["zero pontos", "+20 pontos", "+50 pontos", "-5 pontos", "+1 bala", "+1 vez"]
//Sorteia Inteiros
function sorteiaInteiros(array) {
  return Math.floor(Math.random() * (Object.keys(array).length))
}
let listaAleatoria = sorteiaInteiros(listaPerguntas)
Object.entries(listaPerguntas).map((e, f) => {
  if (f == listaAleatoria) {
    //Pega Titulo
    let textoFrase = document.getElementById("textoFrase")
    textoFrase.innerText = e[0]

    //Pega Palavra
    palavraEscolhida = e[1][sorteiaInteiros(e[1])]


  }

})
var selecionada = palavraEscolhida;
var palavra = selecionada.toLocaleUpperCase()
let separada = palavra.split("");



separada.map((x) => {

  let letras = document.createElement("button");
  let letra = document.createElement("p");
  letras.setAttribute("class", "blocosPalavra highlight");
  let blocoPalavra = document.getElementById("containerPalavra");
  blocoPalavra.appendChild(letras);
  letras.appendChild(letra);
  letra.innerText = x;
  letra.setAttribute("class", "oculto");
}
);

//PEGA A LETRA E COMPARA SE ESTÁ CORRETA
function comparar() {
  let letraCompararLimpar = document.getElementById("nova");
  let letraComparar = letraCompararLimpar.value.toLocaleUpperCase();
  var posicoes = []

  let criada = document.createElement("p");
  let insereErradas = document.getElementById("erradas");
  separada.map((g, j) => {
    let comparador = []
    insereErradas.appendChild(criada);
    //LETRA CORRETA
    if (g == letraComparar) {
      posicoes.push(j)
      let pegaLetras = document.getElementById("containerPalavra")
      pegaLetras.childNodes[j + 1].childNodes[0].setAttribute("class", "aparece")
      pegaLetras.childNodes[j + 1].setAttribute("class", "blocosPalavra highlight act")
      comparador.push(letraComparar)

    } else if (!separada.includes(letraComparar)) {
      criada.innerText = "ERRADA";
      setTimeout(() => {
        criada.innerText = ""
      }, 1500);
    }

    letraCompararLimpar.value = "";
  })

};

//ROLETA//
var degree = 1800;
var clicks = 0;
// let frutas = ["banana", "laranja", "uva", "cereja", "acerola", "goiaba"];
// let listaRoleta = frutas
let listaRoleta = listaPontos
$(document).ready(function () {

  let roleta = document.getElementById("interno-roleta")
  listaRoleta.map((x, y) => {
    let faixa = document.createElement("div")
    faixa.setAttribute("class", "sec")
    faixa.setAttribute("id", y)
    roleta.appendChild(faixa)
    let texto = document.createElement("span")
    texto.setAttribute("class", "texto")
    texto.innerText = x
    faixa.appendChild(texto)
  })

  $('#spin').click(function () {
    clicks++;

    var newDegree = degree * clicks;
    var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    totalDegree = newDegree + extraDegree;

    $('#roleta .sec').each(function () {
      var t = $(this);
      var noY = 0;

      var c = 0;
      var n = 0;
      var interval = setInterval(function () {
        c++;
        if (c === n) {
          clearInterval(interval);
        }
        var aoY = t.offset().top;
        $('#txt').html(aoY);
        // console.log(aoY);

        if (aoY < 23.83) {
          console.log('<<<');
          $('#spin').addClass('spin');
          setTimeout(function () {
            $('#spin').removeClass('spin');

          }, 100);
        }
      }, 10);

      $('#interno-roleta').css({
        'transform': 'rotate(' + totalDegree + 'deg)'
      });
      noY = t.offset().top;
    });
  });
});
