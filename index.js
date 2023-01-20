const Api = require("./Api.js");
const path = require("path");
const fs = require("fs");

//Funcion mdLinks
const mdLinks = (pathReceived, options) => {
  const promise = new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (pathReceived) {
      // Verifica si existe y es absoluta, sino convertirla en Absoluta
      if (Api.isPathValid(Api.pathDefinitive(pathReceived))) {
        let arrayFiles = Api.pathFileMd(Api.pathDefinitive(pathReceived))
        console.log('antes', arrayFiles)
        const files = arrayFiles.map((file)=> {
        Api.readFiles(file).then((resp) => resp).catch((Error) => Error);
        console.log('durante', file)})

        if (arrayFiles.length === 0) {
          reject("No hay archivos con la extensión .Md");
        }
        console.log('despues', arrayFiles)
        resolve(files)
        
            // if (options.validate === true) {
            //   Api.validateLinks(resp).then((links) => {
            //     resolve(links);
            //   });
            // }
        // if (options.validate === false) {
        //   resolve(resp);
        //   // console.log(files)
        // 
      } else {
        //  Si no existe la ruta se rechaza la promesa.
        reject(`El archivo no existe`);
    }
  }
});
return promise;
}

module.exports = { mdLinks };
