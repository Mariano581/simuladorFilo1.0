const questions = [
    {
        question: "¿Cuál es la rama de la filosofía que se ocupa de cuestiones fundamentales sobre la existencia, el ser y la realidad?",
        options: ["Epistemología", "Metafísica", "Ética"],
        correctAnswer: "Metafísica"
    },
    {
        question: "¿Qué filósofo griego fue el discípulo de Sócrates y el maestro de Aristóteles?",
        options: ["Platón","Epicuro","Heráclito"],
        correctAnswer: "Platón"
    },
    {
        question: "El movimiento: es el paso del acto a la potencia en cuanto esta en:",
        options: ["relacion a otro", "acto", "potencia"],
        correctAnswer: "potencia"
    },
    {
        question: "¿Cuál es el concepto filosófico que se refiere a la creencia de que todo conocimiento se deriva de la experiencia sensorial?",
        options: ["Empirismo", "Racionalismo", "Idealismo"],
        correctAnswer: "Empirismo"
    },
    {
        question: "¿Qué rama de la filosofía se enfoca en la naturaleza de la belleza y el arte?",
        options: ["Ética", "Estética", "Lógica"],
        correctAnswer: "Estética"
    },
    {
        question: " ¿Qué filósofo presocrático afirmó que 'todo fluye' y que no podemos bañarnos dos veces en el mismo río?",
        options: ["Parménides", "Anaximandro", "Heráclito"],
        correctAnswer: "Heráclito"
    },
    {
        question: " ¿En filosofía, cuál es la definición de 'esencia'? ",
        options: ["La existencia actual de un objeto", "Aquello que hace que una cosa sea lo que es y no otra cosa", "El estado de cambio constante en la realidad"],
        correctAnswer: "Aquello que hace que una cosa sea lo que es y no otra cosa"
    },
    {
        question: "¿Qué filósofo afirmó la famosa frase 'Cogito, ergo sum' (Pienso, luego existo)?",
        options: ["Immanuel Kant", "René Descartes", "John Locke"],
        correctAnswer: "René Descartes"
    },
    {
        question: "¿Qué filósofo alemán es conocido por su obra 'Crítica de la razón pura' y su enfoque en la epistemología y la metafísica?",
        options: ["Friedrich Nietzsche", "Immanuel Kant", "Jean-Paul Sartre"],
        correctAnswer: "Immanuel Kant"
    },
    {
        question: "¿cómo se definen los 'accidentes' en relación con la materia?",
        options: ["Los accidentes son eventos fortuitos que no tienen relación con la materia.", "Los accidentes son propiedades o cualidades que pueden cambiar sin cambiar la sustancia o naturaleza de la materia.", "Los accidentes se refieren a cambios en la estructura fundamental de la materia."],
        correctAnswer: "Los accidentes son propiedades o cualidades que pueden cambiar sin cambiar la sustancia o naturaleza de la materia."
    },
    // Aquí se pueden agrega más preguntas...
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Pregunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", checkAnswer);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        feedbackElement.textContent = "¡Respuesta correcta!";
        // Avanzar automáticamente a la siguiente pregunta después de 2 segundos si la respuesta es correcta
        setTimeout(nextQuestion, 2000);
    } else {
        feedbackElement.textContent = `Respuesta incorrecta. La respuesta correcta es: ${currentQuestion.correctAnswer}`;
        // Avanzar automáticamente a la siguiente pregunta después de 5 segundos si la respuesta es incorrecta
        setTimeout(nextQuestion, 5000);
    }

    scoreElement.textContent = `Puntuación: ${score}`;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        feedbackElement.textContent = "";
    } else {
        // Juego terminado, muestra la puntuación final
        questionElement.textContent = "Juego Terminado";
        optionsElement.innerHTML = "";
        feedbackElement.textContent = "";
        scoreElement.textContent = `Puntuación final: ${score}`;
        showRestartButton(); // Muestra el botón de reinicio
    }
}

function showRestartButton() {
    restartButton.style.display = "block";
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    scoreElement.textContent = `Puntuación: ${score}`;
    feedbackElement.textContent = "";
    restartButton.style.display = "none"; // Oculta el botón al reiniciar
}

loadQuestion();
restartButton.addEventListener("click", restartGame);