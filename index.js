const Api = require('./Api.js');

//Funcion mdLinks
const mdLinks = (pathReceived, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (pathReceived) {
      // Verifica si existe y es absoluta, sino convertirla en Absoluta
      if (Api.isPathValid(Api.pathDefinitive(pathReceived))) {
        const arrayPaths = Api.pathFileMd(Api.pathDefinitive(pathReceived));
      if (options && options.validate === false){
            const links2 = Promise.all(arrayPaths.map((file) => Api.readFiles(file)));
            resolve(links2);
          }else if(options && options.validate === true) {
            Api.validateLinks(links2).then((links) => {
            resolve(links);
            })
        }
      } else {
        //  Si no existe la ruta se rechaza la promesa.
        reject(`El archivo no existe, si necesitas ayuda use el comando --help o --h`);
      }
    }else {
      reject('Ingrese la ruta del archivo o directorio');
    }
  })
}
module.exports = { mdLinks };
