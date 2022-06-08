//variables del DOM
const circulos = document.querySelectorAll(".circulo");
const contenedorTimer = document.querySelector(".timer");
const modal = document.querySelector(".modal");
const resultadoJuego = document.querySelector(".modal h2");
const ganadorAbsoluto = document.querySelector(".modal h3");
const botonJugar = document.querySelector(".modal a");
let ganador = false;

//variables del juego
let puntuacion = 0;
let tiempo = 15;//tiempo inicial
let contador = null;

function juego(tiempo){
	modal.classList.remove("modal-visible");
	ganadorAbsoluto.classList.remove("visible");
	puntuacion = 0;//reinicia puntuación
	ganador = false;
	circulos.forEach(circulo => circulo.classList.remove("invisible"));//
	contenedorTimer.innerHTML = "";
	for(var i = 0; i < tiempo; i++){
		let div = document.createElement("div");
		div.style.width = `calc(${100/tiempo}% - 10px)`;
		contenedorTimer.appendChild(div);
	}
	contador = setInterval(() => {
		contenedorTimer.children[0].remove();
		if(contenedorTimer.children.length == 0){
			clearInterval(contador);
			resultadoJuego.innerHTML = ":-(";
			modal.classList.add("modal-visible");
		}
	}, 1000);
}


circulos.forEach(circulo => {
	circulo.addEventListener("click", function(){
		this.classList.add("invisible");
		puntuacion++;
		if(puntuacion == 12){
			clearInterval(contador);
			ganador = true;//deja constancia en el sistema que gané
			if(tiempo == 5){
				ganadorAbsoluto.classList.add("visible");
			}
			resultadoJuego.innerHTML = ":-)";
			modal.classList.add("modal-visible");
		}
	});
});

botonJugar.addEventListener("click", function(evento){
	evento.preventDefault();
	if(ganador){ 
		tiempo = tiempo == 5 ? 15 : tiempo - 1;
	}
	juego(tiempo);
});

juego(tiempo);