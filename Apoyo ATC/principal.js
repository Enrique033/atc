let isDarkMode = false;
const toggleModeBtn = document.getElementById('toggle-mode-btn');
const container = document.querySelector('.container');
const importedText = document.getElementById('imported-text');
const helpBox = document.querySelector('.help');
const notification = document.getElementById('notification');

// Cargar el estado del importedText al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const progresoGuardado = localStorage.getItem('progreso');
    if (progresoGuardado) {
        importedText.value = progresoGuardado;
        importedText.removeAttribute('readonly'); // Permitir edición
    }
});

// Guardar el estado del importedText cuando cambie
importedText.addEventListener('input', () => {
    localStorage.setItem('progreso', importedText.value);
});

toggleModeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    container.classList.toggle('dark-mode', isDarkMode);
    importedText.classList.toggle('dark-mode', isDarkMode);
    helpBox.classList.toggle('dark-mode', isDarkMode);
    const speechBlocks = document.querySelectorAll('.speech-block');
    speechBlocks.forEach(block => block.classList.toggle('dark-mode', isDarkMode));
    toggleModeBtn.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
});

function toggleHelp() {
    helpBox.style.display = helpBox.style.display === 'block' ? 'none' : 'block';
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = function (e) {
            importedText.value = e.target.result;
            importedText.removeAttribute('readonly'); // Permitir edición
            localStorage.setItem('progreso', importedText.value); // Guardar estado al cargar un archivo
        };
        reader.readAsText(file);
    } else {
        alert('Por favor, suba un archivo de texto.');
    }
}

function capitalizeText(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // Muestra la notificación por 2 segundos
}

//apartado para cambiar texto

function showCopyConfirmation() {
    const confirmation = document.getElementById('copy-confirmation');
    confirmation.style.display = 'block';

    setTimeout(() => {
        confirmation.style.display = 'none'; // Oculta la confirmación después de 2 segundos
    }, 2000);
}

function copyToClipboard() {
    const textArea = document.getElementById('text-to-change');
    textArea.select();
    document.execCommand('copy');
    showCopyConfirmation(); // Muestra el mensaje de confirmación
}

function toUpperCase() {
    const textArea = document.getElementById('text-to-change');
    textArea.value = textArea.value.toUpperCase();
    copyToClipboard(); // Copia el texto transformado
}

function toLowerCase() {
    const textArea = document.getElementById('text-to-change');
    textArea.value = textArea.value.toLowerCase();
    copyToClipboard(); // Copia el texto transformado
}

function toTitleCase() {
    const textArea = document.getElementById('text-to-change');
    textArea.value = textArea.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    copyToClipboard(); // Copia el texto transformado
}



function generateResult() {
    const clientNumber = document.getElementById('client-number').value || 'Número no ingresado';
    const clientQuery = document.getElementById('client-query').value || 'cliente no realiza consulta';
    const response = document.getElementById('response').value || 'cliente finaliza llamada';
    const callCode = document.getElementById('call-code').value || '$$__&&';

    const result = `${clientNumber} // ${clientQuery} // ${response} // ${callCode}`;
    const resultElement = document.createElement('textarea');
    resultElement.value = result;
    document.body.appendChild(resultElement);
    resultElement.select();
    document.execCommand('copy');
    document.body.removeChild(resultElement);
    showNotification('Resultado generado y copiado al portapapeles.');
}

function copySpeech(number) {
    const speechTexts = [
        '(Nombre del cliente), si tiene más dudas sobre su facturación le invitamos a realizarlo por nuestro canal de WhatsApp, le enviaré un SMS con el link de acceso directo para una atención personalizada y rápida.',
        '(Nombre del cliente), puedes seguir consultando sobre tu facturación a través de nuestro canal de WhatsApp Bitel, ingresando al siguiente enlace: http://bit.ly/3rIo3dG. Dale en enviar y uno de nuestros asesores te responderá a la brevedad.',
        'También puedes visualizar esta información ingresando a la sección “MI BITEL” de nuestra página web o descargando nuestra app MI BITEL.'
    ];
    const textToCopy = speechTexts[number - 1];
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    showNotification('Texto copiado al portapapeles.');
}

