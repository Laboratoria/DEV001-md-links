const Api = require('./Api.js');

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
            const links2 = Promise.all(arrayPaths.map((file) => Api.readFiles(file)
            .then((resp)=> {
              if (options && options.validate === false){
                resolve(resp)
                }else { // Validate ===true
                const array = resp;
                const arrayLinks = Api.validateLinks(array)
                resolve(arrayLinks)
                }
              }).catch((error)=> error)
            ));              
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
