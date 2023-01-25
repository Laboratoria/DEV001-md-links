const fs = require('fs');
const path = require('path');

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    //identifica si la ruta existe.
    const fileExist = fs.existsSync(fileName);
    //se resuelve la ruta como absoluta
    const fileName = path.resolve(filePath);
    if (fileExist) {
      resolve([]);
      //chequear y convertir  a una ruta absoluta.
      //probar si es md o no.
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

