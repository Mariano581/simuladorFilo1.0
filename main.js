const preguntas = [
    {
        pregunta: "¿Cuál es la rama de la filosofía que se ocupa de cuestiones fundamentales sobre la existencia, el ser y la realidad?",
        opciones: ["Epistemología", "Metafísica", "Ética"],
        respuestaCorrecta: "Metafísica"
    },
    {
        pregunta: "¿Qué filósofo griego fue el discípulo de Sócrates y el maestro de Aristóteles?",
        opciones: ["Platón","Epicuro","Heráclito"],
        respuestaCorrecta: "Platón"
    },
    {
        pregunta: "El movimiento: es el paso del acto a la potencia en cuanto esta en:",
        opciones: ["relacion a otro", "acto", "potencia"],
        respuestaCorrecta: "potencia"
    },
    {
        pregunta: "¿Cuál es el concepto filosófico que se refiere a la creencia de que todo conocimiento se deriva de la experiencia sensorial?",
        opciones: ["Empirismo", "Racionalismo", "Idealismo"],
        respuestaCorrecta: "Empirismo"
    },
    {
        pregunta: "¿Qué rama de la filosofía se enfoca en la naturaleza de la belleza y el arte?",
        opciones: ["Ética", "Estética", "Lógica"],
        respuestaCorrecta: "Estética"
    },
    {
        pregunta: " ¿Qué filósofo presocrático afirmó que 'todo fluye' y que no podemos bañarnos dos veces en el mismo río?",
        opciones: ["Parménides", "Anaximandro", "Heráclito"],
        respuestaCorrecta: "Heráclito"
    },
    {
        pregunta: " ¿En filosofía, cuál es la definición de 'esencia'? ",
        opciones: ["La existencia actual de un objeto", "Aquello que hace que una cosa sea lo que es y no otra cosa", "El estado de cambio constante en la realidad"],
        respuestaCorrecta: "Aquello que hace que una cosa sea lo que es y no otra cosa"
    },
    {
        pregunta: "¿Qué filósofo afirmó la famosa frase 'Cogito, ergo sum' (Pienso, luego existo)?",
        opciones: ["Immanuel Kant", "René Descartes", "John Locke"],
        respuestaCorrecta: "René Descartes"
    },
    {
        pregunta: "¿Qué filósofo alemán es conocido por su obra 'Crítica de la razón pura' y su enfoque en la epistemología y la metafísica?",
        opciones: ["Friedrich Nietzsche", "Immanuel Kant", "Jean-Paul Sartre"],
        respuestaCorrecta: "Immanuel Kant"
    },
    {
        pregunta: "¿Cómo se definen los 'accidentes' en relación con la materia?",
        opciones: ["Los accidentes son eventos fortuitos que no tienen relación con la materia.", "Los accidentes son propiedades o cualidades que pueden cambiar sin cambiar la sustancia o naturaleza de la materia.", "Los accidentes se refieren a cambios en la estructura fundamental de la materia."],
        respuestaCorrecta: "Los accidentes son propiedades o cualidades que pueden cambiar sin cambiar la sustancia o naturaleza de la materia."
    },
    // Aquí se pueden agregar más preguntas...
];

let preguntasIncorrectas = [];
let indicePreguntaActual = 0;
let puntaje = 0;
let nombreEstudiante;

const elementoPregunta = document.getElementById("pregunta");
const elementoOpciones = document.getElementById("opciones");
const elementoRetroalimentacion = document.getElementById("retroalimentacion");
const elementoPuntaje = document.getElementById("puntuacion");
const botonReiniciarFinal = document.getElementById("boton-reiniciar-final");

function iniciarJuego() {
    if (!nombreEstudiante) {
        nombreEstudiante = prompt("Por favor, ingresa tu nombre:");
    }
    indicePreguntaActual = 0;
    puntaje = 0;
    preguntasIncorrectas = [];

    jugarJuego();
}

function jugarJuego() {
    if (indicePreguntaActual < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultado();
    }
}

function cargarPregunta() {
    const preguntaActual = preguntas[indicePreguntaActual];
    elementoPregunta.textContent = `Pregunta ${indicePreguntaActual + 1}: ${preguntaActual.pregunta}`;
    elementoOpciones.innerHTML = "";

    for (let i = 0; i < preguntaActual.opciones.length; i++) {
        const opcion = preguntaActual.opciones[i];
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.classList.add("opcion");
        boton.addEventListener("click", () => verificarRespuesta(opcion, preguntaActual.respuestaCorrecta));
        elementoOpciones.appendChild(boton);
    }
}

function verificarRespuesta(respuestaSeleccionada, respuestaCorrecta) {
    if (respuestaSeleccionada === respuestaCorrecta) {
        puntaje++;
        elementoRetroalimentacion.textContent = "¡Respuesta correcta!";
    } else {
        preguntasIncorrectas.push(indicePreguntaActual);
        elementoRetroalimentacion.textContent = `Respuesta incorrecta. La respuesta correcta es: ${respuestaCorrecta}`;
    }

    indicePreguntaActual++;
    setTimeout(jugarJuego, 2000);
    elementoPuntaje.textContent = `Puntuación de ${nombreEstudiante}: ${puntaje}`;
}

function mostrarResultado() {
    elementoPregunta.textContent = "Juego Terminado";
    elementoOpciones.innerHTML = "";
    elementoRetroalimentacion.textContent = "";

    if (preguntasIncorrectas.length > 0) {
        mostrarPreguntasIncorrectas();
    } else {
        elementoRetroalimentacion.textContent = `Puntuación final de ${nombreEstudiante}: ${puntaje}`;
        botonReiniciarFinal.style.display = "block";
        botonReiniciarFinal.addEventListener("click", iniciarJuego);
        // Mostrar un alert al completar el juego
        alert(`¡Felicidades, ${nombreEstudiante}! Has completado el juego.`);
    }
}

function mostrarPreguntasIncorrectas() {
    elementoPregunta.textContent = "Preguntas Incorrectas";
    elementoOpciones.innerHTML = "";
    elementoRetroalimentacion.textContent = "";

    for (const indice of preguntasIncorrectas) {
        const preguntaActual = preguntas[indice];
        const preguntaElement = document.createElement("div");
        preguntaElement.textContent = preguntaActual.pregunta;
        elementoOpciones.appendChild(preguntaElement);
    }

    botonReiniciarFinal.style.display = "block";
    botonReiniciarFinal.addEventListener("click", iniciarJuego);
}

// Iniciar el juego cuando se carga la página por primera vez
iniciarJuego();