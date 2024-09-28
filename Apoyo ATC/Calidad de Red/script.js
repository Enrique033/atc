document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.service-button');
    const feedback = document.getElementById('feedback');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.textContent.trim();
            showFeedback(`¡Excelente elección! Has seleccionado el servicio de ${serviceName}.`);
        });
    });
});

function showFeedback(message) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.classList.remove('hidden');
    feedback.style.display = 'block';
    
    setTimeout(() => {
        feedback.classList.add('hidden');
        feedback.style.display = 'none';
    }, 3000); // Ocultar el mensaje después de 3 segundos
}
