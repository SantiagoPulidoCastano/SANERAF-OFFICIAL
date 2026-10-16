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
    // 2. REFERENCIAS GLOBALES PARA MODALES !!!POR AHORA NO TOCAR!!!
    // ==========================================
    const modal = document.getElementById('ventana');
    const modalCerrar = document.getElementById('ventana-cerrar');
    const titulo = document.getElementById('ventana-titulo');
    const texto = document.getElementById('ventana-texto');

    // ==========================================
    // 3. LÓGICA DE LOGIN !!!POR AHORA NO TOCAR!!!
    // ==========================================
    const formLogin = document.getElementById('login');
    if (formLogin) {
        const inputUsuarioLogin = formLogin.querySelector('input[type="text"]') || formLogin.querySelector('input');
        const inputPasswordLogin = formLogin.querySelector('input[type="password"]');
        
        // Autocompletar el usuario guardado previamente
        const usuarioGuardado = localStorage.getItem('usuarioGuardado');
        if (usuarioGuardado && inputUsuarioLogin) {
            inputUsuarioLogin.value = usuarioGuardado;
        }

        formLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const usuarioIngresado = inputUsuarioLogin ? inputUsuarioLogin.value : "";
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
    // 4. LÓGICA DE REGISTRO !!!POR AHORA NO TOCAR!!!
    // ==========================================
    const formRegistro = document.getElementById('registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const inputUsuarioReg = formRegistro.querySelector('input[type="text"]') || formRegistro.querySelector('input');
            const pass1 = document.getElementById('password').value;
            const pass2 = document.getElementById('passwordconfirm').value;
            
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
                localStorage.setItem('usuarioGuardado', inputUsuarioReg.value);
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
    // 5. CONFIGURACIÓN Y PRECIOS DE TIENDA !!!USENLO PARA ASIGNAR DESCUENTOS GLOBALES Y PRECIOS POR DEFECTO!!!
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