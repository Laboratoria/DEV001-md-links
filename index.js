const Api = require('./Api.js');
const fetch = require("node-fetch");

//Funcion mdLinks
const mdLinks = (pathReceived, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (pathReceived) {
      // Verifica si existe y es absoluta, sino convertirla en Absoluta
      if (Api.isPathValid(pathReceived)) {
        pathReceived = Api.pathDefinitive(pathReceived);
          if(Api.pathFileMd(pathReceived)){
          const arrayPaths = Api.pathFileMd(pathReceived);
          if(arrayPaths === 0){
            reject('No existen archivos con extensión .Md')
          }else{
            let arrayFiles = Promise.all(arrayPaths.map((file) => Api.readFiles(file)
            .then((resp)=> resp).catch((error)=> console.log(`Ah ocurrido un ${error}`))));
            if (options.validate === false){
              resolve(arrayFiles);
              } else if(options.validate === true){ // Validate ===true
              let array = arrayFiles.then(links => Api.validateLinks(links.flat()));
              resolve(array)
              }  
          }
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
