const { existsSync, isAbsolute, isDirectoryorfile, isFile, returnOnlyFilesMd} = require('./index.js')

const mdLinks = (route, options) => {
  //resolve(resuelto) cuando se resuelve la promesa, y reject no,relacionado al then y catch, resolve y reject son callback,son funciones!! 
  const pathAbsolute = isAbsolute(route);
  const root = isDirectoryorfile(pathAbsolute);
  return new Promise((resolve, reject) => {
    //estamos devolviendo una promesa, en este caso usamos reject
    if (!existsSync(pathAbsolute)) { 
      return reject(`${route} This path does not exist`);
    } else if( root !== 'directory' && root !== 'file'){
      return reject(`${pathAbsolute} is not a directory or a file`)
    } else {
      returnOnlyFilesMd;
    }
    
    
   
      //Probar si va a ser archivo o directorio.
      //Si es un directorio hay que devolver un arreglo con archivos que sean md

  });

}

module.exports = {
  mdLinks

};

