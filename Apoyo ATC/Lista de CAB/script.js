// Obtenemos los elementos select
const departamentoFilter = document.getElementById('departamento-filter');
const provinciaFilter = document.getElementById('provincia-filter');
const distritoFilter = document.getElementById('distrito-filter');

// Guardamos la tabla
const rows = document.querySelectorAll('#cab-table tbody tr');

// Cargamos las opciones iniciales en los selects
function cargarOpciones() {
    let departamentos = new Set();
    let provincias = new Map();
    let distritos = new Map();

    rows.forEach(row => {
        const departamento = row.cells[2].textContent;
        const provincia = row.cells[3].textContent;
        const distrito = row.cells[4].textContent;

        departamentos.add(departamento);

        if (!provincias.has(departamento)) {
            provincias.set(departamento, new Set());
        }
        provincias.get(departamento).add(provincia);

        if (!distritos.has(provincia)) {
            distritos.set(provincia, new Set());
        }
        distritos.get(provincia).add(distrito);
    });

    departamentos.forEach(dep => {
        const option = document.createElement('option');
        option.value = dep;
        option.textContent = dep;
        departamentoFilter.appendChild(option);
    });

    // Cuando se cambia el Departamento, se actualizan las Provincias y Distritos
    departamentoFilter.addEventListener('change', function () {
        provinciaFilter.innerHTML = '<option value="">Todos</option>';
        distritoFilter.innerHTML = '<option value="">Todos</option>';
        distritoFilter.disabled = true;

        if (this.value) {
            provincias.get(this.value).forEach(prov => {
                const option = document.createElement('option');
                option.value = prov;
                option.textContent = prov;
                provinciaFilter.appendChild(option);
            });
            provinciaFilter.disabled = false;
        } else {
            provinciaFilter.disabled = true;
            distritoFilter.disabled = true;
        }

        filtrarTabla();
    });

    // Cuando se cambia la Provincia, se actualizan los Distritos
    provinciaFilter.addEventListener('change', function () {
        distritoFilter.innerHTML = '<option value="">Todos</option>';

        if (this.value) {
            distritos.get(this.value).forEach(dist => {
                const option = document.createElement('option');
                option.value = dist;
                option.textContent = dist;
                distritoFilter.appendChild(option);
            });
            distritoFilter.disabled = false;
        } else {
            distritoFilter.disabled = true;
        }

        filtrarTabla();
    });

    // Cuando se cambia el Distrito
    distritoFilter.addEventListener('change', filtrarTabla);
}

// Función para filtrar la tabla
function filtrarTabla() {
    const departamento = departamentoFilter.value;
    const provincia = provinciaFilter.value;
    const distrito = distritoFilter.value;

    rows.forEach(row => {
        const rowDepartamento = row.cells[2].textContent;
        const rowProvincia = row.cells[3].textContent;
        const rowDistrito = row.cells[4].textContent;

        const mostrar =
            (!departamento || rowDepartamento === departamento) &&
            (!provincia || rowProvincia === provincia) &&
            (!distrito || rowDistrito === distrito);

        row.style.display = mostrar ? '' : 'none';
    });
}

// Función para copiar el contenido de la tabla
document.getElementById('copy-btn').addEventListener('click', function() {
    const table = document.getElementById('cab-table');
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        const success = document.execCommand('copy');
        alert(success ? 'Tabla copiada con éxito' : 'Error al copiar');
    } catch (err) {
        alert('Error al copiar');
    }

    window.getSelection().removeAllRanges();
});

// Inicializamos las opciones de los filtros
cargarOpciones();
