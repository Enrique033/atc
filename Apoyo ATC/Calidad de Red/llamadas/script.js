document.addEventListener('DOMContentLoaded', () => {
    console.log("Sección de Llamadas cargada.");

    // Función para mostrar confirmación de copiado con mensaje personalizado
    const mostrarConfirmacion = (mensaje) => {
        const confirmacion = document.getElementById('confirmacion-copiar');
        confirmacion.textContent = mensaje;
        confirmacion.classList.add('visible');

        setTimeout(() => {
            confirmacion.classList.remove('visible');
        }, 2000);
    };

    // Botones para copiar códigos de llamadas
    const copyButtons = document.querySelectorAll('.copiar-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const code = e.target.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                mostrarConfirmacion('¡Código copiado!');  // Mensaje para los códigos
            }).catch(err => {
                console.error('Error al copiar el código: ', err);
            });
        });
    });

    // Copiar el contenido de la plantilla de "Pedido por No Recepción de Llamadas"
    const copiarPlantillaBtn = document.getElementById('copiar-plantilla');
    const plantillaTexto = document.getElementById('plantilla-no-llamadas').textContent;

    copiarPlantillaBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(plantillaTexto).then(() => {
            mostrarConfirmacion('¡Plantilla copiada!');  // Mensaje para la plantilla
        }).catch(err => {
            console.error('Error al copiar la plantilla: ', err);
        });
    });
});
