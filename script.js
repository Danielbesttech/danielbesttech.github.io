var separada = ["b", "a", "l", "d", "e"];
var blocoPalavra = document.getElementById("containerPalavra");
var totalLetrasCertas = []
var componenteAudio = document.getElementById("letraCerta")
var letraBox = "";
let textoFrase = document.getElementById("textoFrase")
let letraCompararLimpar = document.getElementById("nova");
let insereErradas = document.getElementById("erradas");
let roleta = document.getElementById("interno-roleta")

async function gerenciarReproducao(audio) {
  console.log("chegou")
  try {
    await (audio.paused ? audio.play() : audio.pause());
  } catch (error) {
    // Tratar erros de reprodução aqui
    console.log("error")
    console.log(error)
  }
}


//LISTA DE TEMAS E RESPOSTAS(MODELO STRING:ARRAY)
let listaPerguntas = {
  "Um gênero textual: ": ["fabula", "poema", "conto", "teatro",],
  "Tipos de contos: ": ["aventura", "misterio", "fadas", "piada", "romance"],
  "Tem na fábula: ": ["animais", "personagens", "moral", "titulo"]
}
//LISTA DE PONTUAÇÕES DA ROLETA
let listaRoleta = ["zero pontos", "+20 pontos", "+50 pontos", "-5 pontos", "+1 bala", "+1 vez"]
//Sorteia Inteiros
function sorteiaInteiros(array) {
  return Math.floor(Math.random() * (Object.keys(array).length))
}
//SORTEIA TEMA E RESPOSTA
let listaAleatoria = sorteiaInteiros(listaPerguntas)
Object.entries(listaPerguntas).map((e, f) => {
  if (f == listaAleatoria) {
    //OBTEM UM TEMA E IMPRIME NA TELA
    textoFrase.innerText = e[0]
    //OBTEM E PREPARA UMA PALAVRA
    separada = separaPalavra(e[1][sorteiaInteiros(e[1])])
  }

})
//COLOCA EM MAIÚSCULA E SEPARA AS LETRAS
function separaPalavra(array) {
  return (array.toLocaleUpperCase()).split("")
}

//CRIA OS ELEMENTOS DA PALAVRA E DA INFORMAÇÃO DE LETRA ERRADA
separada.map((x) => {
  letraBox = document.createElement("button");
  let letra = document.createElement("p");
  letraBox.setAttribute("class", "blocosPalavra highlight");
  blocoPalavra.appendChild(letraBox);
  letraBox.appendChild(letra);
  letra.innerText = x;
  letra.setAttribute("class", "oculto");
});
let criada = document.createElement("p");
insereErradas.appendChild(criada);

//PEGA A LETRA E COMPARA SE ESTÁ CORRETA
function comparar() {
  let letraComparar = letraCompararLimpar.value.toLocaleUpperCase();
  var posicoes = []

  separada.map((g, j) => {
    let comparador = []
    //LETRA CORRETA
    if (g == letraComparar) {
      posicoes.push(j)
      blocoPalavra.childNodes[j + 1].setAttribute("class", "blocosPalavra highlight act")
      comparador.push(letraComparar)
      totalLetrasCertas.push(g)
      blocoPalavra.childNodes[j + 1].childNodes[0].setAttribute("class", "aparece")
      componenteAudio.setAttribute("src", ".//sounds/letraCerta.mp3")
      gerenciarReproducao(componenteAudio)
      //VERIFICA E CONTA LETRAS CERTAS
      if (totalLetrasCertas.length == separada.length) {
        let i = 1
        while (i < blocoPalavra.childNodes.length) {
          addCSS(blocoPalavra, i)
          i++
        }
        //ALTERA A ANIMAÇÃO EM CASO DE PALAVRA CORRETA
        let para = document.querySelectorAll(".blocosPalavra")
        componenteAudio.setAttribute("src", ".//sounds/palavraCerta.mp3")
        gerenciarReproducao(componenteAudio)


        setTimeout(() => {
          Array.from(para).map((a) => {
            a.style.animation = ""
          })
        }, 5000);
      }

      //MOSTRA CASO LETRA ERRADA
    } else if (!separada.includes(letraComparar)) {
      componenteAudio.setAttribute("src", ".//sounds/letraErrada.mp3")
      gerenciarReproducao(componenteAudio)
      criada.innerText = "ERRADA";
      setTimeout(() => {
        criada.innerText = ""
      }, 1500);
    }
    letraCompararLimpar.value = "";
  })
};

//ADICIONA UM ESTILO DE ANIMAÇÃO CSS
function addCSS(elemento, indice) {
  elemento.childNodes[indice].style.animation = "bounce 0.4s ease infinite alternate"
  let tempoAnimacao = medidasAnimation()
  elemento.childNodes[indice].style.animationDelay = tempoAnimacao[indice]
  return true
}

//ROLETA//
var degree = 1800;
var clicks = 0;

// let listaRoleta = listaPontos
$(document).ready(function () {
  //CRIA OS ELEMENTOS INTERNOS DA ROLETA
  listaRoleta.map((x, y) => {
    //*AQUI PODERIA ENTRAR A CRIAÇÃO DINÂMICA DA ROLETA
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
    componenteAudio.setAttribute("src", ".//sounds/roleta.mp3")
    gerenciarReproducao(componenteAudio)


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

//RELOAD DA PÁGINA
function reload() {
  location.reload();
}

//GERA UMA LISTA COM UM TEMPO DA ANIMAÇÃO PARA CADA LETRA DA PALAVRA
function medidasAnimation() {
  let i = 0
  let arrayMedidas = []
  while (i < separada.length) {
    let valor = sorteiaInteiros(separada) + 1
    arrayMedidas.push("0." + valor + "s")
    i++
  }
  return arrayMedidas
}
