var palabras = ["TELEFONO", "AMOR", "ESCOBA", "MUEBLE", "TOALLA", "REGALO"];
var palabraDesconocida = [];
var palabraDescifrada = []; 
var letrasIncorrectas = [];
var errores = 10;


function iniciarJuego(){

    var botonesInicio = document.querySelector(".btnInicio");
    var displayHorca = document.querySelector(".horca");

    fade(botonesInicio, displayHorca, "none", "none");
    setTimeout(() => {  unfade(displayHorca, "block"); }, 1500);

    palabraSecreta(palabras);
}


function agregarPalabra(){

    var botonesIngresar = document.querySelector(".IngresarPalabra");
    var botonesInicio = document.querySelector(".btnInicio");
  

    fade(botonesInicio, botonesIngresar, "none", "none");
    
    setTimeout(() => {  unfade(botonesIngresar, "block"); }, 1500);
}

//funcion que agrega la nueva palabra a la lista de posibles palabras y luego inicia el juego
function modificarLista(){
    var botonesIngresar = document.querySelector(".IngresarPalabra");
    var displayHorca = document.querySelector(".horca");
    var textareaLista = document.querySelector(".palabra-agregada").value;

    palabraAgregada = textareaLista.toUpperCase();

    //comprueba que la palabra tenga hasta 8 caracteres
    if(palabraAgregada.length > 8){
        alert("Maximo 8 caracteres");
        textareaLista = "";
    }else{  
        palabras.push(palabraAgregada);
        fade(botonesIngresar, displayHorca, "none", "none");

        setTimeout(() => {  unfade(displayHorca, "block"); }, 1500);
    
        palabraSecreta(palabras);
    }

}


function volverInicio(){

    var botonesIngresar = document.querySelector(".IngresarPalabra");
    var botonesInicio = document.querySelector(".btnInicio");

    fade(botonesIngresar, botonesInicio, "none", "none");

    setTimeout(() => {  unfade(botonesInicio, "flex"); }, 1500);
}

//animacion fadeOUT
function fade(element1, element2, display1, display2) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element1.style.display = display1;
            element2.style.display= display2;
        }
        element1.style.opacity = op;
        element2.style.opacity = op;
        element1.style.filter = 'alpha(opacity=' + op * 100 + ")";
        element2.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

//animacion fadeIN
function unfade(element, display) {
    var op = 0.1;  // initial opacity
    
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.display = display;
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 60);
}


function palabraSecreta(palabras){
    
    var palabraAleatoria = palabras[Math.floor(Math.random()*palabras.length)];

    palabraDesconocida = palabraAleatoria.split("");

    mostrarGuiones(palabraDesconocida);
    
    comprobarLetra(palabraAleatoria);

    console.log(palabraAleatoria);
}

//inserta en el array palabraDescifrada la misma cantidad de letras que contenga la palabra secreta
function mostrarGuiones(palabraAleatoria){
    var palabraOculta = document.querySelector(".palabraOculta");
   

    for (let letra of palabraAleatoria) {
        palabraDescifrada.push('_ ');
    }
    
    for(let i = 0; i < palabraDesconocida.length; i++){
        palabraOculta.innerHTML += palabraDescifrada[i];
        console.log(i);
    }
}

//comprueba si la letra ingresada en el input es correcta, de ser asi cambia en el array palabraDescifrada el guion respectivo de la letra ingresada
function comprobarLetra(){
    var input = document.querySelector(".inputLetra");
    var palabraOculta = document.querySelector(".palabraOculta");
    var letraIncorrecta = document.querySelector(".letraIncorrecta")

    input.addEventListener("keypress", function(event){
        if(event.key === "Enter" && isNaN(input.value)){
            var inputUpperCase = this.value.toUpperCase();
            for (let i = 0; i < palabraDesconocida.length; i++) {
                // Comprobamos si la letra del usuario es igual a la letra a adivinar
                if (inputUpperCase == palabraDesconocida[i]) {
                    // Sustituimos el guion por la letra acertada
                    palabraDescifrada[i] = inputUpperCase;
                    palabraOculta.innerHTML = "";
                    for(let i = 0; i < palabraDesconocida.length; i++){
                        palabraOculta.innerHTML += palabraDescifrada[i]+" ";
                    }
                    console.log("coincide");
                }
            }

            if(!palabraDescifrada.includes(inputUpperCase) && !letrasIncorrectas.includes(inputUpperCase)){
                letrasIncorrectas.push(inputUpperCase);
                letraIncorrecta.innerHTML = "";
                letrasIncorrectas.forEach(letras => {
                    
                        letraIncorrecta.innerHTML += letras + " ";
    
                });

                errores-=1;
                dibujarHorca();
            }
            
            this.value= '';
            terminarJuego();

            console.log(palabraDesconocida);
        }
        
    });
}

//comprueba que en el array palabraDescifrada no queden mas guiones, si esto es asi el jugador ganó
function terminarJuego () {
    var input = document.querySelector(".inputLetra");
    var botonReset = document.querySelector(".btnNuevoJuego");
    var wingame =  document.querySelector(".ganar");
    
    if (!palabraDescifrada.includes('_ ')) {
        wingame.style.display = "flex";
        input.style.display = "none";
        setTimeout(() => {  unfade(botonReset,); }, 1000);
    }
}

function btnNuevoJuego(){
    location.reload(true);
}

function dibujarHorca(){
    var botonReset = document.querySelector(".btnNuevoJuego");
    var desistir = document.querySelector(".btnDesistir")
    var input = document.querySelector(".inputLetra");
    var perderJuego = document.querySelector(".perder");
    const canvas = document.querySelector('.tablero');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 7;

    ctx.beginPath();
    

    switch(errores){
        case 9:
            ctx.moveTo(20, 850);
            ctx.lineTo(1170, 850);
            ctx.stroke();
            break;
        case 8: 
            ctx.moveTo(150, 850);
            ctx.lineTo(150, 10);
            ctx.stroke();
            break;
        case 7:
            ctx.moveTo(150, 10);
            ctx.lineTo(800, 10);
            ctx.stroke();
            break;
        case 6: 
            ctx.moveTo(800, 10);
            ctx.lineTo(800, 80);
            ctx.stroke()
            break;
        case 5:
            ctx.arc(800,180,100,200*Math.PI,-200*Math.PI,true);
            ctx.stroke();
            break;
        case 4: 
            ctx.moveTo(800, 280);
            ctx.lineTo(800, 600);
            ctx.stroke();
            break;
        case 3:
            ctx.moveTo(800, 280);
            ctx.lineTo(600, 400);
            ctx.stroke();
            break;
        case 2: 
            ctx.moveTo(800, 280);
            ctx.lineTo(1000, 400);
            ctx.stroke();
            break;
        case 1:
            ctx.moveTo(800, 600);
            ctx.lineTo(600, 750);
            ctx.stroke();
            break;
        case 0: 
            ctx.moveTo(800, 600);
            ctx.lineTo(1000, 750);
            ctx.stroke();
            perderJuego.style.display = "flex";
            input.style.display = "none";
            desistir.style.display = "none";
            setTimeout(() => {  unfade(botonReset, "flex"); }, 1500);
            break;
    }
  
}

