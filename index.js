const fs = require('fs');
const path = require('path');

const mdLinks = (path, options) => {
 return new Promise((resolve, reject) => {
      //ruta existe
    if (fs.existsSync(path)){
      //es absoluta?
       // convertir ruta absoluta
      //ruta es archivo
      //es archivo md

    }else{
       //si no existe la ruta rechaza la promesa
      reject('La ruta no es valida');
    }
     
     
  });

}

module.exports =  {
mdLinks,
};