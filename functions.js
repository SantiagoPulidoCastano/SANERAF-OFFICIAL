let processScroll = () => {
  let docElem = document.documentElement,
      docBody = document.body,
      scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
      scrollBottom = (docElem['scrollHeight'] || 
  docBody['scrollHeight']) - window.innerHeight,
      scrollPercent = scrollTop / scrollBottom * 100 + '%';

        // console.log(scrollTop + ' / ' + scrollBottom + ' = ' + scrollPercent);

  document.getElementById('progress-bar').style.setProperty('--scrollAmount', scrollPercent);
}

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('ventana');
  const modalCerrar = document.getElementById('ventana-cerrar');
  const titulo = document.getElementById('ventana-titulo');
  const texto = document.getElementById('ventana-texto');

  // --- LOGIN ---
  const formLogin = document.getElementById('login');
  if (formLogin) {
    const inputUsuarioLogin = formLogin.querySelector('input[type="text"]') || formLogin.querySelector('input');
    const inputPasswordLogin = formLogin.querySelector('input[type="password"]');
    
    // Autocompletar el usuario guardado previamente
    const usuarioGuardado = localStorage.getItem('usuarioGuardado');
    if (usuarioGuardado && inputUsuarioLogin) {
      inputUsuarioLogin.value = usuarioGuardado;
    }

    formLogin.addEventListener('submit', function(evento) {
      evento.preventDefault();
      
      const usuarioIngresado = inputUsuarioLogin ? inputUsuarioLogin.value : "";
      const passwordIngresada = inputPasswordLogin ? inputPasswordLogin.value : "";
      
      // Recuperamos los datos reales registrados
      const usuarioRegistrado = localStorage.getItem('usuarioGuardado');
      const passwordRegistrada = localStorage.getItem('passwordGuardada');

      // 1. Validar si los datos coinciden con el registro
      if (usuarioIngresado !== usuarioRegistrado || passwordIngresada !== passwordRegistrada) {
        if (titulo) titulo.innerText = "Error de Acceso";
        if (texto) texto.innerText = "Usuario o contraseña incorrectos. Verifica tus datos.";
        
        if (modalCerrar) {
          modalCerrar.onclick = function() {
            if (modal) modal.close(); // Solo cierra el modal para corregir
          };
        }

        if (modal) modal.showModal();
        return; // Frena el acceso
      }
      
      // 2. Si todo es correcto -> ¡Bienvenido a productos!
      if (titulo) titulo.innerText = "¡Hola de nuevo!";
      if (texto) texto.innerText = `¡Bienvenido, ${usuarioIngresado}!`;
      
      if (modalCerrar) {
        modalCerrar.onclick = function() {
          if (modal) modal.close();
          window.location.href = "productos.html"; 
        };
      }

      if (modal) modal.showModal();
      formLogin.reset();
    });
  }

  // --- REGISTRO ---
  const formRegistro = document.getElementById('registro');
  if (formRegistro) {
    formRegistro.addEventListener('submit', function(evento) {
      evento.preventDefault();
      
      const inputUsuarioReg = formRegistro.querySelector('input[type="text"]') || formRegistro.querySelector('input');
      const pass1 = document.getElementById('password').value;
      const pass2 = document.getElementById('passwordconfirm').value;
      
      // Validar contraseñas iguales
      if (pass1 !== pass2) {
        if (titulo) titulo.innerText = "Error";
        if (texto) texto.innerText = "Las contraseñas no coinciden. Por favor, revísalas.";
        
        if (modalCerrar) {
          modalCerrar.onclick = function() {
            if (modal) modal.close();
          };
        }

        if (modal) modal.showModal();
        return; 
      }
      
      // Guardar usuario Y contraseña en el localStorage
      if (inputUsuarioReg) {
        localStorage.setItem('usuarioGuardado', inputUsuarioReg.value);
        localStorage.setItem('passwordGuardada', pass1);
      }

      if (titulo) titulo.innerText = "¡Registro Exitoso!";
      if (texto) texto.innerText = "Registro completado exitosamente, ahora puedes iniciar sesión.";
      
      if (modalCerrar) {
        modalCerrar.onclick = function() {
          if (modal) modal.close();
          window.location.href = "login.html";
        };
      }

      if (modal) modal.showModal();
      formRegistro.reset();
    });
  }
});