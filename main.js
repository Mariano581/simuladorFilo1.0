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

let indicePreguntaActual = 0;
let puntaje = 0;

const elementoPregunta = document.getElementById("pregunta");
const elementoOpciones = document.getElementById("opciones");
const elementoRetroalimentacion = document.getElementById("retroalimentacion");
const elementoPuntaje = document.getElementById("puntuacion");
const elementoBotonReinicio = document.getElementById("reiniciarJuego");

function iniciarJuego() {
    // Reinicia las variables de estado
    indicePreguntaActual = 0;
    puntaje = 0;

    // Llama a la función para comenzar el juego después de reiniciar el puntaje
    jugarJuego();
}


function jugarJuego() {
    if (indicePreguntaActual < preguntas.length) {
        cargarPregunta();
        esperarRespuesta();
    } else {
        // Juego terminado, muestra la puntuación final
        elementoPregunta.textContent = "Juego Terminado";
        elementoOpciones.innerHTML = "";
        elementoRetroalimentacion.textContent = "";
        elementoPuntaje.textContent = `Puntuación final: ${puntaje}`;
        mostrarBotonReinicio(); // Muestra el botón de reinicio
    }
}

function cargarPregunta() {
    const preguntaActual = preguntas[indicePreguntaActual];
    elementoPregunta.textContent = `Pregunta ${indicePreguntaActual + 1}: ${preguntaActual.pregunta}`;

    elementoOpciones.innerHTML = "";
    preguntaActual.opciones.forEach((opcion) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.classList.add("opcion");
        boton.addEventListener("click", verificarRespuesta);
        elementoOpciones.appendChild(boton);
    });
}

function verificarRespuesta(evento) {
    const respuestaSeleccionada = evento.target.textContent;
    const preguntaActual = preguntas[indicePreguntaActual];

    if (respuestaSeleccionada === preguntaActual.respuestaCorrecta) {
        puntaje++;
        elementoRetroalimentacion.textContent = "¡Respuesta correcta!";
        // Avanzar automáticamente a la siguiente pregunta después de 2 segundos si la respuesta es correcta
        setTimeout(siguientePregunta, 2000);
    } else {
        elementoRetroalimentacion.textContent = `Respuesta incorrecta. La respuesta correcta es: ${preguntaActual.respuestaCorrecta}`;
        // Avanzar automáticamente a la siguiente pregunta después de 5 segundos si la respuesta es incorrecta
        setTimeout(siguientePregunta, 5000);
    }

    elementoPuntaje.textContent = `Puntuación: ${puntaje}`;
}

function siguientePregunta() {
    indicePreguntaActual++;

    if (indicePreguntaActual < preguntas.length) {
        cargarPregunta();
        elementoRetroalimentacion.textContent = "";
    } else {
        // Juego terminado, muestra la puntuación final
        elementoPregunta.textContent = "Juego Terminado";
        elementoOpciones.innerHTML = "";
        elementoRetroalimentacion.textContent = "";
        elementoPuntaje.textContent = `Puntuación final: ${puntaje}`;
        mostrarBotonReinicio(); // Muestra el botón de reinicio
    }
}

function mostrarBotonReinicio() {
    elementoBotonReinicio.style.display = "block";
}

function reiniciarJuego() {
    indicePreguntaActual = 0;
    puntaje = 0; // Reiniciamos el puntaje a 0
    elementoPuntaje.textContent = `Puntuación: ${puntaje}`; // Actualizamos el elemento HTML con el puntaje reiniciado
    cargarPregunta();
    elementoRetroalimentacion.textContent = "";
    elementoBotonReinicio.style.display = "none"; // Oculta el botón al reiniciar
}

cargarPregunta();
elementoBotonReinicio.addEventListener("click", iniciarJuego);

// Llama a la función para comenzar el juego
iniciarJuego();