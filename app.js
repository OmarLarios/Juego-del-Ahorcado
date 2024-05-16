// variabless globales
let imagenes = document.querySelectorAll('#muñeco img');
let puntuacionG = document.getElementById('marcadorG');
let puntuacionP = document.getElementById('marcadorP');
let texto = document.querySelectorAll('#texto p')
let jugar = document.getElementById('jugar');
let limpiar = document.getElementById('limpiar');
let letras = document.querySelectorAll('#botones button');
let contPal = document.getElementById('palabra');
let diccionario = ["mouse", "teclado","computadora", "compilador","minecraft","software", 
"sistemas","servidores","protocolos","redes","datos","codigo","programacion",
"yorch","algoritmo"];
let palAle;
let errores=0;
let aciertos=0;
let acerto=false;
let c=0;
let c1=0;
let confirmacionR;

// eventos a botones de inicar juego y limpiar puntuación

jugar.addEventListener('click', inicioJuego);
limpiar.addEventListener('click', reiniciar);

//funcion que da inicio al juego 

function inicioJuego(){
   if(palAle){texto[indicePalAle].style.display='none';}
   imagenes[errores].style.display='none';
   errores=0;
   aciertos=0;
   imagenes[errores].style.display='block';
   jugar.disabled = true;
   indicePalAle=Math.floor(Math.random()*diccionario.length)
   palAle = diccionario[indicePalAle];
   contPal.textContent = '';
   
   for(let i = 0; i<palAle.length; i++){
      let span = document.createElement('span');
      contPal.appendChild(span);
   }

   for(let i = 0; i < letras.length ; i++ ){
      letras[ i ].disabled = false;
  }

};

//ciclo para evento continuo a los botones de las letras 

for(let i = 0; i<letras.length; i++){
   letras[i].addEventListener('click',click_letras);
}

// función de los botones de las letras
// cotiene la lógica del juego del ahorcado

function click_letras(event){
   const spans = document.querySelectorAll('#palabra span');
   const button = event.target;
   button.disabled = true;
   const letra = button.innerHTML.toLowerCase();
   button.style.backgroundColor = "red";
   acerto=false;
   for(let i = 0; i<palAle.length; i++){
      if(letra == palAle[i]){
         spans[i].textContent = letra;
         aciertos++;
         acerto = true;
      }
   }
   if(acerto==false){  
      imagenes[errores].style.display='none';
      errores++;
      imagenes[errores].style.display='block';
   }
   if(errores==7){
      alert("Perdiste X_X \n la palabra era: "+palAle);
      c1++;
      puntuacionP.textContent=c1;
      texto[indicePalAle].style.display='block';
      
      gameOver();
   }else if(aciertos==palAle.length){
      alert("GANASTE!!!");
      c++;
      puntuacionG.textContent=c;
      texto[indicePalAle].style.display='block';
      gameOver();
   }
}

// función para reiniciar putuación del usuario 
function reiniciar(){
   confirmacionR = confirm("Limpiaras tu puntuación de partidas ganadas y perdidas, ¿Estás seguro?");
   if(confirmacionR==true){
      texto[indicePalAle].style.display='none';
      imagenes[errores].style.display='none';
      jugar.disabled=false;
      aciertos=0;
      errores=0;
      imagenes[0].style.display='block';
      puntuacionG.textContent="0";
      puntuacionP.textContent="0";
   }
}

//función de fin del juego que desabilita las letras restantes y habilita nuevo juego

function gameOver(){
   jugar.disabled=false;
   for(let i = 0; i<letras.length; i++){
      letras[i].disabled=true;
      letras[i].style.backgroundColor = "whitesmoke";
   }
   jugar.disabled=false;
}

gameOver();
