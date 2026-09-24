function fun(){
    
    const form = document.getElementById('formularioRegistro');
    const modal = document.getElementById('modalResultado');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalMensaje = document.getElementById('modalMensaje');
    const modalBadge = document.getElementById('modalBadge');
    const modalCerrar = document.getElementById('modalCerrar');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valido = true;

      // 1. Validar Nombre (soloLetras)
      const nombre = document.getElementById('nombre');
      const errNombre = document.getElementById('err-nombre');
      if (!soloLetras(nombre.value)) {
        errNombre.textContent = 'Solo se admiten letras y acentos.';
        nombre.classList.add('is-invalid');
        valido = false;
      } else {
        errNombre.textContent = '';
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
      }

      // 2. Validar Matrícula (validarLongitud - máximo 6 dígitos)
      const matricula = document.getElementById('matricula');
      const errMatricula = document.getElementById('err-matricula');
      if (!validarLongitud(matricula.value, 6) || isNaN(Number(matricula.value))) {
        errMatricula.textContent = 'Debe ser un número válido de hasta 6 caracteres.';
        matricula.classList.add('is-invalid');
        valido = false;
      } else {
        errMatricula.textContent = '';
        matricula.classList.remove('is-invalid');
        matricula.classList.add('is-valid');
      }

      // 3. Validar Correo (validarCorreo)
      const correo = document.getElementById('correo');
      const errCorreo = document.getElementById('err-correo');
      if (!validarCorreo(correo.value)) {
        errCorreo.textContent = 'Ingresa un correo electrónico válido.';
        correo.classList.add('is-invalid');
        valido = false;
      } else {
        errCorreo.textContent = '';
        correo.classList.remove('is-invalid');
        correo.classList.add('is-valid');
      }

      // 4. Validar Fecha y Mayoría de Edad (calcularEdad y esMayorDeEdad)
      const fecha = document.getElementById('fechaNacimiento');
      const errFecha = document.getElementById('err-fechaNacimiento');
      const edad = calcularEdad(fecha.value);

      if (edad < 0) {
        errFecha.textContent = 'Ingresa una fecha de nacimiento válida.';
        fecha.classList.add('is-invalid');
        valido = false;
      } else if (!esMayorDeEdad(fecha.value)) {
        errFecha.textContent = `Debes ser mayor de edad. Edad calculada: ${edad} años.`;
        fecha.classList.add('is-invalid');
        valido = false;
      } else {
        errFecha.textContent = '';
        fecha.classList.remove('is-invalid');
        fecha.classList.add('is-valid');
      }

      // 5. Validar Teléfono (Función libre: validarTelefonoMX)
      const telefono = document.getElementById('telefono');
      const errTel = document.getElementById('err-telefono');
      if (!validarTelefonoMX(telefono.value)) {
        errTel.textContent = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
        telefono.classList.add('is-invalid');
        valido = false;
      } else {
        errTel.textContent = '';
        telefono.classList.remove('is-invalid');
        telefono.classList.add('is-valid');
      }

      // 6. Validar y Formatear Salario (Función libre: formatearMoneda)
      const salario = document.getElementById('salario');
      const errSalario = document.getElementById('err-salario');
      if (!salario.value || Number(salario.value) <= 0) {
        errSalario.textContent = 'Indica un monto numérico positivo.';
        salario.classList.add('is-invalid');
        valido = false;
      } else {
        errSalario.textContent = '';
        salario.classList.remove('is-invalid');
        salario.classList.add('is-valid');
      }

      // 7. Validar Password (validarPassword)
      const pass = document.getElementById('password');
      const errPass = document.getElementById('err-password');
      if (!validarPassword(pass.value)) {
        errPass.textContent = 'Requiere mín. 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo especial.';
        pass.classList.add('is-invalid');
        valido = false;
      } else {
        errPass.textContent = '';
        pass.classList.remove('is-invalid');
        pass.classList.add('is-valid');
      }

      // Despliegue en Modal si pasa todas las validaciones
      if (valido) {
        const monedaFormateada = formatearMoneda(salario.value, 'MXN');
        modalBadge.textContent = '🎂';
        modalTitulo.textContent = `¡Hola, ${nombre.value}!`;
        modalMensaje.innerHTML = `
          Tu registro ha sido completado con éxito.<br><br>
          <strong>Edad calculada:</strong> ${edad} años (Mayor de edad verificado).<br>
          <strong>Sueldo pretendido registrado:</strong> ${monedaFormateada}.
        `;
        modal.classList.add('active');
      }
    });

    modalCerrar.addEventListener('click', () => {
      modal.classList.remove('active');
      form.reset();
      document.querySelectorAll('input').forEach(i => i.classList.remove('is-valid'));
    });
}