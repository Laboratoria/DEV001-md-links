const fs = require("fs");
const path = require("path");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
  
    // Identifica si la ruta existe.
    if (fs.existsSync(path)) {
      // Si existe resolver la promesa.
      resolve('si existe la ruta');
    // Chequear o convertir a una ruta absoluta.
    
    } else{
    //  Si no existe la ruta se rechaza la promesa.
    reject('El archivo no existe');
    
  };
  

  // Probar si esa ruta absoluta es un archivo o un directorio.
  // Si es un directorio filtrar los archivos md.
});
};
module.exports = { mdLinks };
