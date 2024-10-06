document.addEventListener('DOMContentLoaded', () => {
    console.log("Sección de Llamadas cargada.");
    const plantillas = document.querySelectorAll('.plantilla-contenido'); // Selecciona todas las plantillas con la clase

    // Función para mostrar confirmación de copiado con mensaje personalizado
    const showConfirmation = (message) => {
        const confirmacion = document.getElementById('confirmacion-copiar');

        // Establecer el texto y mostrar el mensaje
        confirmacion.textContent = message;
        confirmacion.classList.add('visible'); // Asegúrate de que sea visible
        confirmacion.classList.remove('hidden'); // Asegúrate de que no esté oculto

        // Ocultar el mensaje después de un tiempo
        setTimeout(() => {
            confirmacion.classList.remove('visible');
            confirmacion.classList.add('hidden'); // Ocultar después de que desaparezca
        }, 2000);
    };

    // Botones para copiar códigos de llamadas
    const copyButtons = document.querySelectorAll('.copiar-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const code = e.target.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                showConfirmation('¡Código copiado!');  // Mensaje para los códigos
            }).catch(err => {
                console.error('Error al copiar el código: ', err);
            });
        });
    });

    // Agregar eventos de clic a todas las plantillas para copiar el contenido
    plantillas.forEach(plantilla => {
        plantilla.addEventListener('click', () => {
            const textoParaCopiar = plantilla.textContent.trim(); // Eliminar espacios innecesarios
            if (textoParaCopiar) {
                navigator.clipboard.writeText(textoParaCopiar).then(() => {
                    showConfirmation('¡Plantilla copiada!');  // Mensaje para las plantillas
                }).catch(err => {
                    console.error('Error al copiar la plantilla:', err);
                });
            } else {
                console.error('La plantilla está vacía o no tiene contenido para copiar.');
            }
        });
    });

    // Función para mostrar el contenido de la sección seleccionada
    const showContent = (section) => {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(sec => {
            sec.classList.add('hidden'); // Oculta todas las secciones
        });
        document.getElementById(section).classList.remove('hidden'); // Muestra la sección seleccionada
    };

    // Asignar eventos a los botones de acción
    document.getElementById('preguntas-filtro-btn').addEventListener('click', () => {
        showContent('filtro'); // Muestra la sección de Preguntas Filtro
    });

    document.getElementById('pedidos-btn').addEventListener('click', () => {
        showContent('pedidos'); // Muestra la sección de Pedidos
    });

    // Por defecto al cargar la página
    showContent('pedidos');
});
