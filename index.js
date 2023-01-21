// NOS PERMITE TRABAJAR CON ARCHIVOS DEL SISTEMA OPERATIVO.
const fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //identifica si la ruta existe.
    if (fs.existsSync(path)) {
      //chequear y convertir  a una ruta absoluta.
      //probar si esa ruta absoluta es un archivo o un directorio.
      // si es un directorio extraer los archivos md y devolverlo en un arreglo.
    } else {
      // si no existe la ruta se rechaza la promesa.
      reject('la ruta no existe');
    }
  });
};

module.exports = {
  mdLinks,
}
