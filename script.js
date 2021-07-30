let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// VARIAVEL DE AMBIENTE
let etapaAtual = 0;
let numero = ''; // preencher com os numeros
let votoBranco = false;
let votos = [];


function comecarEtapa(){
  let etapa = etapas[etapaAtual];
  
  let numeroHtml = '';
  numero = '';
  votoBranco = false;

  // LOOP Infinito
  for(let i=0;i<etapa.numeros;i++){
    if(i === 0){
      numeroHtml += '<div class="numero pisca"></div>';
    }else{
      numeroHtml += '<div class="numero"></div>';
    }
    
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){
      return true;
    }else{
      return false;
    }
  });
  if(candidato.length > 0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
    
    let fotosHtml = '';
    for(let i in candidato.fotos){
      if(candidato.fotos[i].small){
        fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      }else{
        fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
      }
      }

    lateral.innerHTML = fotosHtml;

  }else{
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

function clicou(n){
  let elNumero = document.querySelector('.numero.pisca') ;
  if(elNumero !== null){
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elNumero.classList.remove('pisca'); // remover pisca do numero
    if(elNumero.nextElementSibling !== null){
      elNumero.nextElementSibling.classList.add('pisca'); // pisca passará para proxima quadrado
    }else{
      atualizaInterface();
    }
    
  }
}


function branco(){
  if(numero === ''){
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
  }else{
    alert('Para votar em BRANCO, NÃO pode ter DIGITADO nenhum número!');
  }
}

function corrige(){
  comecarEtapa();
}

function confirma(){
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  let audioConfirma = document.querySelector('button');
  audioConfirma.addEventListener('click', function(){
    let audio = document.querySelector('audio')
    audio.play()
})

  if(votoBranco === true){
  votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  }else if(numero.length === etapa.numeros) {
  votoConfirmado = true;
  votos.push({
    etapa: etapas[etapaAtual].titulo,
    voto: numero
  
  });
  }
  if(votoConfirmado){
  etapaAtual++;
  if(etapas[etapaAtual] !== undefined){
    comecarEtapa();
    
  }else{
  document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
  console.log(votos);

} 
  }
} 
function mostra(id){
  if(document.getElementById(id).style.display == 'block'){
    document.getElementById(id).style.display = 'none';
  }else{
    document.getElementById(id).style.display = 'block';
  }

}

// let button = document.querySelector('.action-btn');


// button.addEventListener('click', function(){
//   let container = document.querySelector('.container');

//   if(container.style.display === 'none') {
//     container.style.display = 'block';
//   }else{
//     container.style.display = 'none';
//   }
// });


// let buttonB = document.querySelector('.action-btn-b');


//  buttonB.addEventListener('click', function(){
//   let containerB = document.querySelector('.container-b');

// containerB.classList.toggle('hide');

// });

// let buttonC = document.querySelector('.action-btn-c');


// buttonC.addEventListener('click', function(){
//   let containerC = document.querySelector('.container-c');

// containerC.classList.toggle('hide');

// });

comecarEtapa();