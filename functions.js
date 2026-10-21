document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. BARRA DE PROGRESO DE SCROLL !!!!NO TOCAR!!!!
    // ==========================================
    const processScroll = () => {
        let docElem = document.documentElement,
            docBody = document.body,
            scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
            scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
            scrollPercent = (scrollTop / scrollBottom) * 100 + '%';

        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.setProperty('--scrollAmount', scrollPercent);
        }
    };

    window.addEventListener('scroll', processScroll);

    // ==========================================
    // 2. REFERENCIAS GLOBALES PARA MODALES
    // ==========================================
    const modal = document.getElementById('ventana');
    const modalCerrar = document.getElementById('ventana-cerrar');
    const titulo = document.getElementById('ventana-titulo');
    const texto = document.getElementById('ventana-texto');

    // ==========================================
    // 3. LÓGICA DE LOGIN (Busca dentro del form de login)
    // ==========================================
    const formLogin = document.querySelector('.login-formulario form');
    if (formLogin) {
        const inputUsuarioLogin = document.getElementById('username-login');
        const inputPasswordLogin = document.getElementById('password-login');
        
        // Autocompletar el usuario guardado previamente
        const usuarioGuardado = localStorage.getItem('usuarioGuardado');
        if (usuarioGuardado && inputUsuarioLogin) {
            inputUsuarioLogin.value = usuarioGuardado;
        }

        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const usuarioIngresado = inputUsuarioLogin ? inputUsuarioLogin.value.trim() : "";
            const passwordIngresada = inputPasswordLogin ? inputPasswordLogin.value : "";
            
            const usuarioRegistrado = localStorage.getItem('usuarioGuardado');
            const passwordRegistrada = localStorage.getItem('passwordGuardada');

            // 1. Validar si los datos coinciden
            if (usuarioIngresado !== usuarioRegistrado || passwordIngresada !== passwordRegistrada) {
                if (titulo) titulo.innerText = "Error de Acceso";
                if (texto) texto.innerText = "Usuario o contraseña incorrectos. Verifica tus datos.";
                
                if (modalCerrar) {
                    modalCerrar.onclick = () => { if (modal) modal.close(); };
                }
                if (modal) modal.showModal();
                return; 
            }
            
            // 2. Si todo es correcto -> Bienvenido 
            if (titulo) titulo.innerText = "¡Hola de nuevo!";
            if (texto) texto.innerText = `¡Bienvenido, ${usuarioIngresado}!`;
            
            if (modalCerrar) {
                modalCerrar.onclick = () => {
                    if (modal) modal.close();
                    window.location.href = "productos.html"; 
                };
            }

            if (modal) modal.showModal();
            formLogin.reset();
        });
    }

    // ==========================================
    // 4. LÓGICA DE REGISTRO (Usa los nuevos IDs del formulario de registro)
    // ==========================================
    const formRegistro = document.querySelector('.registro-formulario form');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const inputUsuarioReg = document.getElementById('username-reg');
            const pass1 = document.getElementById('password-reg').value;
            const pass2 = document.getElementById('passwordconfirm-reg').value;
            
            // Validar contraseñas iguales
            if (pass1 !== pass2) {
                if (titulo) titulo.innerText = "Error";
                if (texto) texto.innerText = "Las contraseñas no coinciden. Por favor, revísalas.";
                
                if (modalCerrar) {
                    modalCerrar.onclick = () => { if (modal) modal.close(); };
                }

                if (modal) modal.showModal();
                return; 
            }
            
            // Guardar usuario y contraseña
            if (inputUsuarioReg) {
                localStorage.setItem('usuarioGuardado', inputUsuarioReg.value.trim());
                localStorage.setItem('passwordGuardada', pass1);
            }

            if (titulo) titulo.innerText = "¡Registro Exitoso!";
            if (texto) texto.innerText = "Registro completado exitosamente, ahora puedes iniciar sesión.";
            
            if (modalCerrar) {
                modalCerrar.onclick = () => {
                    if (modal) modal.close();
                    window.location.href = "login.html";
                };
            }

            if (modal) modal.showModal();
            formRegistro.reset();
        });
    }

    // ==========================================
    // 5. CONFIGURACIÓN Y PRECIOS DE TIENDA
    // ==========================================
    const CONFIG_TIENDA = {
        precioEstandarPorDefecto: 120000, 
        multiplicadorGlobal: 1.0,         
        moneda: "COP"
    };

    const formateadorCOP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });

    const productos = document.querySelectorAll(".producto");
    productos.forEach(prod => {
        const spanPrecio = prod.querySelector(".precio");
        if (!spanPrecio) return;

        let precioIndividual = spanPrecio.getAttribute("data-precio-base");
        precioIndividual = precioIndividual ? parseFloat(precioIndividual) : CONFIG_TIENDA.precioEstandarPorDefecto;

        let precioFinal = precioIndividual * CONFIG_TIENDA.multiplicadorGlobal;

        spanPrecio.textContent = formateadorCOP.format(precioFinal);
    });
});