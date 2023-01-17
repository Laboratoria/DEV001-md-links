const fs = require('fs');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // La ruta existe?
  if (fs.existsSync(path)) {
    resolve('si existe la ruta');
    // Chequear o convertir a una ruta absoluta.
    // Probar si es archivo o directorio.
    // Si es un directorio filtrar los archivos md.
  } else {
    // Si no existe la ruta se rechaza
    reject('La ruta no existe');
  }
});
console.log(fs.existsSync('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));

module.exports = {
  mdLinks,
};
