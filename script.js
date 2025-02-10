const textElement = document.getElementById('text');
const text = "El último suspiro del mar";
const speed = 100; // Velocidad en milisegundos

let i = 0;

function typeWriter() {
    if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener('DOMContentLoaded', typeWriter);
