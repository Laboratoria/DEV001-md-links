const fs = require('fs');

const {mdLinks}= (path, options) => {
  return new Promise((resolve, reject) => {
    // identificar si la ruta existe
    if (fs.existsSync(path)) {
      resolve('esta ruta existe');
//ver  si la ruta es absoluta 
// si no es abosoluta ,convertir en ruta absoluta.
// ver si es archivo
//ver si el archivo es md
// crear una funcion para  leer el archivo
// Ver si el archivo tiene links
// si es un archivo md,
// ver si los links son validos o no

    } else {
      // si no existe la ruta rechazar la promesa
      reject('la ruta no existe')
    } 

  });

}
module.exports = {
  mdLinks
};
