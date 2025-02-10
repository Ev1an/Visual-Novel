let isTyping = false; // Variable para rastrear si el texto se está escribiendo
let currentTimeout = null; // Variable para rastrear el timeout actual
let adventureStarted = false; // Variable para rastrear si la aventura ya ha comenzado
let currentCallback = null; // Variable para guardar el callback actual

/** 
 * Escribe el texto carácter por carácter en el elemento especificado. 
 * 
 * @param {string} text - El texto que se va a escribir. 
 * @param {string} elementId - El ID del elemento donde se escribirá el texto. 
 * @param {function} callback - Función opcional que se llamará cuando termine de escribir el texto. 
 */
function typeText(text, elementId, callback) {
    const element = document.getElementById(elementId);
    element.innerHTML = ''; // Asegurarse de que el texto esté vacío al comenzar
    let i = 0;
    isTyping = true; // Marcar como escribiendo
    document.getElementById('indicator').style.display = 'none'; // Ocultar indicador mientras se escribe
    currentCallback = callback; // Guardar el callback para ejecutarlo más tarde
    const interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            isTyping = false; // Marcar como no escribiendo
            document.getElementById('indicator').style.display = 'block'; // Mostrar indicador cuando termine de escribir
        }
    }, 80);
}

/** 
 * Oculta el botón "nextButton" y limpia el cuadro de diálogo, luego inicia la aventura. 
 */
/** 
 * Oculta el botón "nextButton" y limpia el cuadro de diálogo, luego inicia la aventura. 
 */
function nextDialogue() {
    if (isTyping) return; // No avanzar si el texto se está escribiendo
    clearTimeout(currentTimeout); // Cancelar cualquier timeout en curso
    document.getElementById('dialogueText').innerHTML = "";
    document.getElementById('indicator').style.display = 'none'; // Ocultar el indicador al avanzar
    if (currentCallback) {
        const callback = currentCallback; // Guardar el callback actual
        currentCallback = null; // Limpiar el callback antes de ejecutarlo
        callback(); // Ejecutar el callback guardado
    } else if (!adventureStarted) {
        startAdventure();
    }
}


/** 
 * Inicia la aventura mostrando el primer diálogo. 
 */
function startAdventure() {
    adventureStarted = true; // Marcar que la aventura ha comenzado
    typeText('Te preparas para una aventura emocionante llena de desafíos. ¡Adelante!. . .', 'dialogueText', firstChoice);
}

/** 
 * Muestra la primera elección del jugador. 
 */
function firstChoice() {
    typeText('Te encuentras en una encrucijada en el bosque. ¿Qué deseas hacer?', 'dialogueText', showFirstChoices);
}

/** 
 * Muestra las opciones de elección para el jugador. 
 */
function showFirstChoices() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
    optionsDiv.innerHTML = `
        <button class="option" onclick="chooseOption('explorar')">Explorar el sendero izquierdo</button>
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
    if (option === 'explorar') {
        typeText('Decides explorar el sendero izquierdo y encuentras un arroyo...', 'dialogueText', continueStory);
    } else if (option === 'descansar') {
        typeText('Te sientas junto a un árbol y disfrutas de la serenidad del bosque...', 'dialogueText', continueStory);
    }
}

/** 
 * Continúa la historia y muestra nuevas opciones. 
 */
function continueStory() {
    typeText('La aventura continúa mientras te adentras más en el bosque... De repente, escuchas un ruido extraño proveniente de los arbustos. ¿Qué deseas hacer?', 'dialogueText', showSecondChoices);
}

/** 
 * Muestra las segundas opciones de elección para el jugador. 
 */
function showSecondChoices() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
    optionsDiv.innerHTML = `
        <button class="option" onclick="chooseSecondOption('investigar')">Investigar el ruido</button>
        <button class="option" onclick="chooseSecondOption('ignorar')">Ignorar el ruido y seguir caminando</button>
    `;
}

/** 
 * Maneja la elección del jugador y muestra el texto correspondiente para las segundas opciones. 
 * 
 * @param {string} option - La opción elegida por el jugador. 
 */
function chooseSecondOption(option) {
    if (isTyping) return; // No avanzar si el texto se está escribiendo
    document.getElementById('options').style.display = 'none';
    if (option === 'investigar') {
        typeText('Decides investigar el ruido y descubres un misterioso cofre escondido entre los arbustos...', 'dialogueText', continueSecondStory);
    } else if (option === 'ignorar') {
        typeText('Decides ignorar el ruido y seguir caminando. Pronto te encuentras en un claro del bosque...', 'dialogueText', continueSecondStory);
    }
}

/** 
 * Continúa la historia y muestra nuevas opciones.
 */
function continueSecondStory() {
    typeText('La aventura sigue y te preguntas qué más secretos esconde el bosque... De repente, encuentras una cueva oscura con extraños símbolos en la entrada. ¿Qué deseas hacer?', 'dialogueText', showThirdChoices);
}

/** 
 * Muestra las terceras opciones de elección para el jugador. 
 */
function showThirdChoices() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
    optionsDiv.innerHTML = `
        <button class="option" onclick="chooseThirdOption('entrar')">Entrar en la cueva</button>
        <button class="option" onclick="chooseThirdOption('explorar')">Explorar los alrededores de la cueva</button>
    `;
}

/** 
 * Maneja la elección del jugador y muestra el texto correspondiente para las terceras opciones. 
 * 
 * @param {string} option - La opción elegida por el jugador. 
 */
function chooseThirdOption(option) {
    if (isTyping) return; // No avanzar si el texto se está escribiendo
    document.getElementById('options').style.display = 'none';
    if (option === 'entrar') {
        typeText('Decides entrar en la cueva y descubres una serie de túneles que te llevan a un misterioso santuario...', 'dialogueText', concludeStory);
    } else if (option === 'explorar') {
        typeText('Decides explorar los alrededores de la cueva y encuentras un camino oculto que te lleva a un antiguo pueblo abandonado...', 'dialogueText', concludeStory);
    }
}

/** 
 * Concluye la historia de esta parte, dejando espacio para nuevas aventuras. 
 */
function concludeStory() {
    typeText('Te das cuenta de que tu aventura apenas comienza y que hay mucho más por descubrir en este mundo lleno de misterios...', 'dialogueText');
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
typeText('Prueba del sistema de diálogo', 'dialogueText');
