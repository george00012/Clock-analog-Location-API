
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
const dia = document.querySelector(".principal-date-day");
const mes = document.querySelector(".principal-date-month");
const año = document.querySelector(".principal-date-year");
