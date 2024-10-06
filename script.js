const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

// Cambiar entre formularios de inicio de sesión y registro
btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});
btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

// Inicializa la base de datos
let db;

initSqlJs().then(SQL => {
    db = new SQL.Database();
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT);`);
    console.log("Base de datos SQLite creada con éxito");
}).catch(err => {
    console.error("Error al inicializar SQL.js:", err);
});

// Función para registrar un nuevo usuario
const signUpForm = document.querySelector(".sign-up");
signUpForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = signUpForm.querySelector("input[placeholder='Nombre']").value;
    const email = signUpForm.querySelector("input[placeholder='Email']").value;
    const password = signUpForm.querySelector("input[placeholder='Password']").value;

    // Validar que los campos no estén vacíos
    if (!name || !email || !password) {
        alert("Por favor, rellena todos los campos para registrarte.");
        return;
    }

    const user = { name, email, password };
    console.log("Intentando registrar usuario:", user);

    try {
        db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
        console.log("Usuario registrado exitosamente:", user);
        alert("Usuario registrado exitosamente");
        signUpForm.reset();  // Limpiar formulario después del registro
    } catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
            alert("Error: El usuario ya existe.");
        } else {
            console.error("Error al registrar el usuario:", error);
            alert("Error: No se pudo registrar el usuario.");
        }
    }
});

// Función para iniciar sesión
const signInForm = document.querySelector(".sign-in");
signInForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = signInForm.querySelector("input[placeholder='Email']").value;
    const password = signInForm.querySelector("input[placeholder='Password']").value;

    // Verificar si los campos están vacíos
    if (!email || !password) {
        alert("Por favor, ingresa tanto el correo como la contraseña.");
        return; // Salir de la función si los campos están vacíos
    }

    console.log("Intentando iniciar sesión con:", { email, password });

    // Buscar el usuario en la base de datos
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
    stmt.bind([email]);

    if (stmt.step()) {
        const user = stmt.getAsObject();
        console.log("Usuario encontrado:", user);
        // Verificar la contraseña
        if (user.password === password) {
            alert("Inicio de sesión exitoso");
            console.log("Contraseña correcta, usuario autenticado");

            // Guardar información en localStorage
            localStorage.setItem('currentUser', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

            // Redirigir a otra página
            window.location.href = "dashboard.html"; // Cambia esto a tu página deseada
        } else {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
            console.error("Contraseña incorrecta");
        }
    } else {
        alert("El usuario no existe. Verifica el correo ingresado.");
        console.error("Usuario no encontrado en la base de datos");
    }

    stmt.free();
});
