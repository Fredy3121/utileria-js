/**
 * LIBRERA 
 * Librería funcional de utilidades puras para validación, formateo y cálculos.
 */

/**
 * 1. Valida si una cadena cumple con el formato estándar de correo electrónico.
 * {string} correo - Correo a validar.
 *  {boolean} True si el formato es válido, False en caso contrario.
 */
function validarCorreo(correo) {
  if (typeof correo !== 'string') return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo.trim());
}

/**
 * 2. Valida que una cadena contenga exclusivamente letras y espacios,
 * admitiendo vocales acentuadas y eñes (mayúsculas y minúsculas).
 *  {string} texto - Texto a validar.
 *  {boolean} True si contiene solo letras/acentos/espacios, False en caso contrario.
 */
function soloLetras(texto) {
  if (typeof texto !== 'string' || texto.trim().length === 0) return false;
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(texto);
}

/**
 * 3. Valida si la representación en dígitos de un valor numérico o cadena numérica
 * no excede una longitud máxima especificada.
 *  {number|string} numero - Número o cadena de dígitos.
 *  {number} maxLongitud - Longitud máxima admitida.
 *  {boolean} True si la longitud en caracteres no excede el límite.
 */
function validarLongitud(numero, maxLongitud) {
  if (numero === null || numero === undefined || isNaN(Number(maxLongitud))) return false;
  const str = String(numero).trim();
  return str.length > 0 && str.length <= Number(maxLongitud);
}

/**
 * 4. Calcula la edad cumplida en años a partir de una fecha de nacimiento.
 *  {string|Date} fechaNacimiento - Fecha válida (formato YYYY-MM-DD o instancia Date).
 *  {number} Entero con la edad calculada (o -1 si la fecha es inválida o futura).
 */
function calcularEdad(fechaNacimiento) {
  const fecha = new Date(fechaNacimiento);
  if (isNaN(fecha.getTime())) return -1;

  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = fecha.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fecha.getDate())) {
    edad--;
  }

  return edad >= 0 ? edad : -1;
}

/**
 * 5. Determina si una persona tiene 18 años o más según su fecha de nacimiento.
 *  {string|Date} fechaNacimiento - Fecha de nacimiento.
 *  {boolean} True si la edad calculada es mayor o igual a 18 años.
 */
function esMayorDeEdad(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  return edad >= 18;
}

/**
 * 6. Valida contraseña de contraseña: mínimo 8 caracteres, al menos una mayúscula,
 * una minúscula, un número y un carácter especial.
 *  {string} password - Contraseña a evaluar.
 *  {boolean} True si cumple con todos los criterios de seguridad.
 */
function validarPassword(password) {
  if (typeof password !== 'string') return false;
  // Min 8 chars, 1 mayus, 1 minus, 1 num, 1 especial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
}

/**

 * SECCIÓN LIBRE: FUNCIONES ADICIONALES

 */

/**
 * Valida si un número telefónico contiene exactamente 10 dígitos numéricos
 * (estándar para telefonía celular y fija en México).
 *  {string|number} telefono - Cadena o número a evaluar.
 *  {boolean} True si posee exactamente 10 dígitos numéricos.
 */
function validarTelefonoMX(telefono) {
  if (telefono === null || telefono === undefined) return false;
  const limpio = String(telefono).replace(/\D/g, '');
  return limpio.length === 10;
}

/**
 * 8. [Función Adicional 2]
 * Convierte cualquier número a formato de moneda (ej: 1250.5 -> $1,250.50 MXN).
 *  {number|string} valor - Valor numérico a formatear.
 *  {string} [codigoMoneda='MXN'] - Código ISO de la divisa.
 *  {string} Cadena formateada o '$0.00' si el valor es inválido.
 */
function formatearMoneda(valor, codigoMoneda = 'MXN') {
  const monto = Number(valor);
  if (isNaN(monto)) return '$0.00 ' + codigoMoneda;
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: codigoMoneda
  }).format(monto);
}