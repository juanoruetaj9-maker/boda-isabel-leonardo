/* ================================= */
/* ROMPER SELLO */
/* ================================= */

function romperSello(){

const sello = document.querySelector(".seal")

sello.classList.add("romper")

setTimeout(function(){

abrirSobre()

},600)

}



/* ================================= */
/* ABRIR SOBRE */
/* ================================= */

function abrirSobre(){

const flap = document.querySelector(".flap")

flap.style.transform = "rotateX(180deg)"

setTimeout(function(){

document.getElementById("intro").style.display="none"
document.getElementById("contenido").style.display="block"

iniciarMusica()
activarParticulas()
activarPetalos()

},1000)

}



/* ================================= */
/* MUSICA */
/* ================================= */

function iniciarMusica(){

const musica = document.getElementById("musicaFondo")

if(musica){

musica.volume = 0.5

musica.play().catch(function(){

console.log("Autoplay bloqueado por el navegador")

})

}

}



/* ================================= */
/* CONTADOR */
/* ================================= */

const fechaBoda = new Date("Apr 11, 2026 17:00:00").getTime()

const contador = setInterval(function(){

const ahora = new Date().getTime()

const diferencia = fechaBoda - ahora

const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60))
const segundos = Math.floor((diferencia % (1000 * 60)) / 1000)

document.getElementById("dias").innerHTML = dias
document.getElementById("horas").innerHTML = horas
document.getElementById("minutos").innerHTML = minutos
document.getElementById("segundos").innerHTML = segundos

if(diferencia < 0){

clearInterval(contador)

document.querySelector(".contador").innerHTML="¡Hoy es el gran día!"

}

},1000)



/* ================================= */
/* PARTICULAS DORADAS */
/* ================================= */

function activarParticulas(){

tsParticles.load("particles-js", {

particles:{

number:{
value:40
},

color:{
value:"#d4af37"
},

shape:{
type:"circle"
},

opacity:{
value:0.6
},

size:{
value:{min:1,max:4}
},

move:{
enable:true,
speed:1,
direction:"none",
outModes:{
default:"out"
}
}

},

detectRetina:true

})

}



/* ================================= */
/* PETALOS */
/* ================================= */

function activarPetalos(){

const totalPetalos = 25

for(let i=0;i<totalPetalos;i++){

let petalo = document.createElement("div")

petalo.classList.add("petalo")

petalo.style.left = Math.random()*100+"vw"

petalo.style.animationDuration = (5 + Math.random()*5)+"s"

petalo.style.opacity = Math.random()

document.body.appendChild(petalo)

setTimeout(()=>{

petalo.remove()

},9000)

}

}



/* ================================= */
/* SCROLL SUAVE */
/* ================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

})

})

})



/* ================================= */
/* ANIMACION AL HACER SCROLL */
/* ================================= */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity = 1
entry.target.style.transform = "translateY(0)"

}

})

})

document.querySelectorAll(".fade").forEach(section=>{

section.style.opacity = 0
section.style.transform = "translateY(40px)"

observer.observe(section)

})



/* ================================= */
/* ENVIO A GOOGLE SHEETS */
/* ================================= */

const scriptURL = "https://script.google.com/macros/s/AKfycbzhSVzs78m-4HNhol7wGbY8Cy9tsDrNDz8FW58wMDkurYlAB9WiEeUa0LV2MJ8y3x1_ag/exec"

document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("rsvpForm")

if(!form) return

form.addEventListener("submit", function(e){

e.preventDefault()

const nombre = document.getElementById("nombre").value
const telefono = document.getElementById("telefono").value
const asistentes = document.getElementById("asistentes").value
const mensaje = document.getElementById("mensaje").value

if(!nombre || !telefono || !asistentes){

alert("Por favor completa todos los campos")
return

}

const boton = form.querySelector("button")

boton.disabled = true
boton.innerText = "Enviando..."

fetch(scriptURL,{

method:"POST",

body:JSON.stringify({

nombre:nombre,
telefono:telefono,
asistentes:asistentes,
mensaje:mensaje

})

})

.then(response => response.text())

.then(data => {

alert("Confirmación enviada correctamente ❤️")

form.reset()

boton.disabled=false
boton.innerText="Confirmar asistencia"

})

.catch(error => {

alert("Error al enviar la confirmación")

boton.disabled=false
boton.innerText="Confirmar asistencia"

})

})

})
