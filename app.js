
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
document.querySelector(".principal-date-actual").textContent = fechaDia;


/*LOCALIZACION*/

let searchValor = document.getElementById("principal-search-input");
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
    .then(function (weather) {
      document.querySelector(".principal-weather-localizacion-city").innerHTML = weather.name;
      document.querySelector(".principal-weather-localizacion-country").innerHTML = weather.sys.country;

      const iconElement = document.querySelector(".principal-weather-icon");
      const temperatura = document.querySelector(".principal-weather-temperature");
      const kelvin = weather.main.temp;
      const celcius = kelvin - 273.15;
      temperatura.innerHTML = `${celcius.toFixed(0)}°C`;

      if (celcius > 30) {
        iconElement.innerHTML = '<img src="../0/img/sunny_FILL0_1.png">';
      } else if (celcius > 20) {
        iconElement.innerHTML = '<img src="../0/img/light_mode_2.png">';
      } else if (celcius > 10) {
        iconElement.innerHTML = '<img src="../0/img/cloud_FILL0_3.png">';
      } else if (celcius > 0) {
        iconElement.innerHTML = '<img src="../0/img/foggy_FILL0_4.png">';
      } else {
        iconElement.innerHTML = '<img src="../0/img/severe_cold_5.png" >';
      }

      searchValor.value = "";
      document.querySelector(".principal-date-error").innerHTML = "";
    })
    .catch(function (error) {
      document.querySelector(".principal-date-error").innerHTML =
        `Se ha producido en el nombre de la ciudad: ${error}.Pon una ciudad correctamente`;
      document.querySelector(".principal-weather-localizacion-city").innerHTML = "";
      searchValor.value = "";
    });
}





