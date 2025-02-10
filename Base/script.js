let isTyping = false; // Variable para rastrear si el texto se está escribiendo
let currentTimeout = null; // Variable para rastrear el timeout actual

/**
 * Escribe el texto carácter por carácter en el elemento especificado.
 * 
 * @param {string} text - El texto que se va a escribir.
 * @param {string} elementId - El ID del elemento donde se escribirá el texto.
 * @param {function} callback - Función opcional que se llamará cuando termine de escribir el texto.
 */
function typeText(text, elementId, callback) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';  // Asegurarse de que el texto esté vacío al comenzar
    let i = 0;
    isTyping = true; // Marcar como escribiendo
    document.getElementById('indicator').style.display = 'none'; // Ocultar indicador mientras se escribe
    const interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            isTyping = false; // Marcar como no escribiendo
            document.getElementById('indicator').style.display = 'block'; // Mostrar indicador cuando termine de escribir
            if (callback) callback();  // Llama al callback si está definido
        }
    }, 80); // Ajustar el intervalo para controlar la velocidad de aparición
}

/**
 * Oculta el botón "nextButton" y limpia el cuadro de diálogo, luego inicia la aventura.
 */
function nextDialogue(){
    if (isTyping) return; // No avanzar si el texto se está escribiendo
    clearTimeout(currentTimeout); // Cancelar cualquier timeout en curso
    document.getElementById("nextButton").style.display = "none";
    document.getElementById('dialogueText').innerHTML = "";
    document.getElementById('indicator').style.display = 'none'; // Ocultar el indicador al avanzar
    startAdventure();
}

/**
 * Inicia la aventura mostrando el primer diálogo después de un breve retraso.
 */
function startAdventure() {
    currentTimeout = setTimeout(() => {
        typeText('Debes estar listo para afrontar los desafios y misterios de a obra , no es apto para sensibles ¡Comienza!. . .', 'dialogueText', firstChoice);
    }, 200);
}

/**
 * Muestra la primera elección del jugador después de un breve retraso.
 */
function firstChoice() {
    currentTimeout = setTimeout(() => {
        typeText('Te encuentras en un bosque misterioso. ¿Qué deseas hacer?', 'dialogueText', showFirstChoices);
    }, 1500);
}

/**
 * Muestra las opciones de elección para el jugador.
 */
function showFirstChoices() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
    optionsDiv.innerHTML = `
        <button class="option" onclick="chooseOption('explorar')">Explorar el bosque</button>
        <button class="option" onclick="chooseOption('descansar')">Descansar junto a un árbol</button>
    `;
}

/**
 * Maneja la elección del jugador y muestra el texto correspondiente.
 * 
 * @param {string} option - La opción elegida por el jugador.
 */
function chooseOption(option) {
    if (isTyping) return; // No avanzar si el texto se está escribiendo
    document.getElementById('options').style.display = 'none';
    clearTimeout(currentTimeout); // Cancelar cualquier timeout en curso

    if (option === 'explorar') {
        typeText('Decides explorar el bosque y encuentras un sendero oculto...', 'dialogueText', continueStory);
    } else if (option === 'descansar') {
        typeText('Te sientas junto a un árbol y disfrutas de la tranquilidad del bosque...', 'dialogueText', continueStory);
    }
}

/**
 * Continúa la historia después de un breve retraso.
 */
function continueStory() {
    currentTimeout = setTimeout(() => {
        typeText('Continúa tu aventura...', 'dialogueText');
    }, 1000);
}

/**
 * Maneja el evento de la tecla Enter para avanzar el diálogo.
 */
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        nextDialogue();
    }
}

// Añade el evento de clic al cuadro de diálogo para avanzar el diálogo
document.getElementById('dialogue').addEventListener('click', nextDialogue);

// Añade el evento de la tecla Enter para avanzar el diálogo
document.addEventListener('keydown', handleEnterKey);

// Inicializa el sistema de diálogo al mostrar el primer texto.
document.getElementById('dialogue').style.display = 'block';
typeText('Prueba del sistema de dialogo', 'dialogueText');
