const Api = require("./Api.js");
const path = require("path");
const fs = require("fs");

//Funcion mdLinks
const mdLinks = (pathReceived, options) => {
  const mdlink = new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (pathReceived) {
      // Verifica si existe y es absoluta, sino convertirla en Absoluta
      if (Api.isPathValid(Api.pathDefinitive(pathReceived))) {
        const arrayPaths = Api.pathFileMd(Api.pathDefinitive(pathReceived));
        
        if (arrayPaths.length === 0) {
          
          reject("No hay archivos con la extensión .Md");
        } else {
          console.log('arrayPath', arrayPaths)
          // let links = [];
          // let array = arrayPaths.forEach((file)=> Api.readFiles(file)
          // .then((file)=>Api.getLinks(file)))
          let array = arrayPaths.map((file)=>{
            Api.readFiles(file).then((resp)=>{
              console.log(Api.getLinks(resp))
            
            })
          })
          
          console.log('mdlinks', array)
          resolve(array);
        }
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
  return Promise.resolve(mdlink);
};

module.exports = { mdLinks };
