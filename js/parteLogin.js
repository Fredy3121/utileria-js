function funlog(){
    const formLogin = document.getElementById('formularioLogin');
    const modalLogin = document.getElementById('modalLogin');
    const cerrarModalLogin = document.getElementById('cerrarModalLogin');

    formLogin.addEventListener('submit', function(e) {
      e.preventDefault();
      let valido = true;

      const correo = document.getElementById('loginCorreo');
      const errCorreo = document.getElementById('err-loginCorreo');
      const pass = document.getElementById('loginPassword');
      const errPass = document.getElementById('err-loginPassword');

      // Validación con validarCorreo
      if (!validarCorreo(correo.value)) {
        errCorreo.textContent = 'Ingresa un formato de correo válido.';
        correo.classList.add('is-invalid');
        valido = false;
      } else {
        errCorreo.textContent = '';
        correo.classList.remove('is-invalid');
        correo.classList.add('is-valid');
      }

      // Validación con validarPassword
      if (!validarPassword(pass.value)) {
        errPass.textContent = 'La contraseña no cumple los requisitos (mín. 8 chars, mayúscula, número y símbolo).';
        pass.classList.add('is-invalid');
        valido = false;
      } else {
        errPass.textContent = '';
        pass.classList.remove('is-invalid');
        pass.classList.add('is-valid');
      }

      if (valido) {
        document.getElementById('modalLoginTexto').innerHTML = `
          Bienvenido(a) <strong>${correo.value}</strong>.<br>
          Tus credenciales cumplen todas las políticas de formato y seguridad.
        `;
        modalLogin.classList.add('active');
      }
    });

    cerrarModalLogin.addEventListener('click', () => {
      modalLogin.classList.remove('active');
      formLogin.reset();
      document.querySelectorAll('input').forEach(i => i.classList.remove('is-valid'));
    });
}