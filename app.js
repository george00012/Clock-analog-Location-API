
/*RELOJ*/
const horaManecilla = document.querySelector(".principal-clock-hours");
const minutoManecilla = document.querySelector(".principal-clock-min");
const segundoManecilla = document.querySelector(".principal-clock-sec");

function obtenerHora() {
  const horaActual = new Date();

  const segundos = horaActual.getSeconds() / 60;
  const min = horaActual.getMinutes() / 60;
  const hora = horaActual.getHours() / 12;

  setRotation(segundoManecilla, segundos);
  setRotation(minutoManecilla, min);
  setRotation(horaManecilla, hora);
}

setInterval(obtenerHora, 1000);

function setRotation(element, rotationRadio) {
  element.style.setProperty('--rotacion', rotationRadio * 360);
}


/*FECHA*/
let meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let diasSemana = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];

const fechaActual = new Date();
const diaSemanaActual = diasSemana[fechaActual.getDay()];
const mesActual = meses[fechaActual.getMonth()];
const diaActual = fechaActual.getDate();
const anioActual = fechaActual.getFullYear();

let fechaDia = diaSemanaActual + ", " + diaActual + " de " + mesActual + " de " + anioActual;
document.querySelector(".date-actual").textContent = fechaDia;


/*localizacion*/
let imagen = document.querySelector(".img");

let searchValor = document.getElementById("search");
searchValor.addEventListener('keypress', searchFunc);

function searchFunc(e) {
  if (e.keyCode == 13) {
    getData(searchValor.value)
  }
}

function getData(value) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + value +
    '&appid=aa943b0001548ea2eda45b798f4ddbab')
    .then(function (response) {
      return response.json();
    })
    .then(function (whether) {
      document.querySelector(".city").innerHTML = whether.name;

      const temperatura = document.querySelector(".temperature");
      const kelvin = whether.main.temp;
      const celcius = kelvin - 273.15;
      temperatura.innerHTML= `${celcius.toFixed(0)}°C`;

      searchValor.value="";
      document.querySelector(".error").innerHTML="";
    })
    .catch(function (error) {
      document.querySelector(".error").innerHTML= `Se ha producido en el nombre de la ciudad: ${error}. Pon una ciudad correctamente`;
      document.querySelector(".city").innerHTML ="";
      searchValor.value="";
    });
}





