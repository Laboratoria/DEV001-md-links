const { pathExists, pathIsAbsolute, turnPathAbsolute } = require('./functions');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // La ruta existe?
  if (!pathExists(path)) {
    // Si no existe la ruta se rechaza
    reject(new Error('La ruta no existe'));
    // Chequear o convertir a una ruta absoluta.
    // Probar si es archivo o directorio.
    // Si es un directorio filtrar los archivos md.
  } if (!pathIsAbsolute(path)) {
    resolve(turnPathAbsolute(path));
    // Si existe la ruta, queremos que avanza y revise si es relativa o absoluta
  }
});
console.log(pathExists('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
console.log(pathExists('C:/noexiste'));
console.log(pathIsAbsolute('./functions'));
console.log(turnPathAbsolute('./functions'));

module.exports = {
  mdLinks,
};
