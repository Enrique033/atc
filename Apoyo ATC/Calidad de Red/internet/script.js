document.addEventListener('DOMContentLoaded', () => {
    console.log("Sección de Internet cargada.");
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

    // Función para mostrar contenido específico
    function showContent(section) {
        // Oculta todas las plantillas
        plantillas.forEach(plantilla => {
            plantilla.classList.add('hidden'); // Oculta todas las plantillas
        });

        // Lógica para mostrar contenido según la sección seleccionada
        if (section === 'pedidos') {
            // Muestra todas las plantillas si la sección es 'pedidos'
            plantillas.forEach(plantilla => {
                plantilla.classList.remove('hidden'); // Muestra todas las plantillas (contenido de Pedidos)
            });
            showConfirmation('¡Mostrando el contenido de Pedidos!'); // Mensaje de confirmación
        } else if (section === 'preguntas-filtro') {
            // Aquí puedes ocultar o mostrar contenido relacionado con "Preguntas Filtro"
            showConfirmation('¡No hay contenido en Preguntas Filtro aún!'); // Mensaje de aviso
        }

        // Desplazarse suavemente al contenido
        const mainContent = document.querySelector('main'); // Selecciona el elemento main
        mainContent.scrollIntoView({ behavior: 'smooth' });
    }

    // Agregar eventos de clic a todas las plantillas para copiar el contenido
    plantillas.forEach(plantilla => {
        plantilla.addEventListener('click', () => {
            const textoParaCopiar = plantilla.textContent.trim(); // Eliminar espacios innecesarios
            if (textoParaCopiar) {
                navigator.clipboard.writeText(textoParaCopiar).then(() => {
                    showConfirmation('¡Plantilla copiada!'); // Mensaje para las plantillas
                }).catch(err => {
                    console.error('Error al copiar la plantilla:', err);
                });
            } else {
                console.error('La plantilla está vacía o no tiene contenido para copiar.');
            }
        });
    });

    // Agregar eventos de clic a las marcas para copiar el texto al portapapeles
    const marcas = document.querySelectorAll('.marca');
    marcas.forEach(marca => {
        marca.addEventListener('click', () => {
            const textoParaCopiar = marca.dataset.clipboardText; // Obtener el texto del atributo data-clipboard-text
            navigator.clipboard.writeText(textoParaCopiar).then(() => {
                showConfirmation('¡Texto copiado!'); // Mensaje al copiar
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });

    // Eventos para los nuevos botones de navegación
    const preguntasFiltroBtn = document.getElementById('preguntas-filtro');
    const pedidosBtn = document.getElementById('pedidos');

    preguntasFiltroBtn.addEventListener('click', () => {
        showContent('preguntas-filtro'); // Muestra la sección de Preguntas Filtro
    });

    pedidosBtn.addEventListener('click', () => {
        showContent('pedidos'); // Muestra la sección de Pedidos
    });

    // Mostrar la sección "pedidos" por defecto al cargar la página
    showContent('pedidos');
});
