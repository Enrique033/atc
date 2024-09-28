document.addEventListener('DOMContentLoaded', () => {
    const marcas = document.querySelectorAll('.marca');
    const plantillas = document.querySelectorAll('.plantilla-contenido'); // Selecciona todas las plantillas con la clase

    const showConfirmation = (message) => {
        let confirmationMessage = document.getElementById('confirmation-message');
        
        if (!confirmationMessage) {
            // Si el mensaje no existe, crearlo
            confirmationMessage = document.createElement('div');
            confirmationMessage.id = 'confirmation-message';
            document.body.appendChild(confirmationMessage);
        }

        // Establecer el texto y mostrar el mensaje
        confirmationMessage.textContent = message;
        confirmationMessage.classList.add('visible');

        // Ocultar el mensaje después de un tiempo
        setTimeout(() => {
            confirmationMessage.classList.remove('visible');
        }, 2000);
    };

    // Agregar eventos de clic a las marcas para copiar el texto al portapapeles
    marcas.forEach(marca => {
        marca.addEventListener('click', () => {
            navigator.clipboard.writeText(marca.dataset.clipboardText).then(() => {
                showConfirmation('¡Mensaje copiado!');
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });

    // Agregar eventos de clic a todas las plantillas para copiar el contenido
    plantillas.forEach(plantilla => {
        plantilla.addEventListener('click', () => {
            const textoParaCopiar = plantilla.textContent.trim(); // Eliminar espacios innecesarios
            if (textoParaCopiar) {
                navigator.clipboard.writeText(textoParaCopiar).then(() => {
                    showConfirmation('¡Plantilla copiada!');
                }).catch(err => {
                    console.error('Error al copiar la plantilla:', err);
                });
            } else {
                console.error('La plantilla está vacía o no tiene contenido para copiar.');
            }
        });
    });
});
