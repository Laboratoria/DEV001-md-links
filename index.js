const fs = require('fs');
const path = require('path');

//identificar si la ruta existe.
const existsSync = (route) => fs.existsSync(route);
//Vamos determinar si la ruta es absoluta,si es relativo, entonces hay que convertilo en absoluto
const isAbsolute = (route) => (path.isAbsolute(route)) ? route : path.resolve(route);

//Saber si es un directorio o es un archivo.
const isDirectoryorfile = (route) => {
    if (fs.statSync(route).isDirectory()) {
        return 'Is a directory'
    } else if (fs.statSync(route).isFile()) {
        return 'Is a file'
    } else {
        return 'invalid route'
    }
};
//ahora tenemos que leer el directorio y devolver solo archivos dentro del direc.
const isFile = (routeFile) => {
    return fs.lstatSync(routeFile).isFile();
  };
const folderPath = (folderPath) => {
    fs.readdirSync(folderPath).map(routeFile => {
        //el metodo path.join une todos los seg de ruta, si la cadena es de long 0 devolverá '.'
      return path.join(folderPath, routeFile);
    })
    .filter(isFile);
};
//guardamos los archivos en un array y sino ejecute la funcion folderPath
const arrayForFiles = (routeFile) => {
    let arrayForFilesMd = [];
    if(isFile(routeFile)){
        arrayForFiles.push(routeFile);
    }else{
        folderPath;
    }
    return arrayForFiles;
}
//función para devolver la extensión de la ruta
// ejemplo route='index.md' devuelve 'md'
const returnOnlyFilesMd = (routeFile) => {
    if(arrayForFiles.length === 0){
        return (`There are no '.md' files in ${routeFile}`)
    }else{
    return arrayForFiles(routeFile).filter(path.extname(route)==='.md');
};





    module.exports = {
        existsSync,
        isAbsolute,
        isDirectoryorfile,
        isFile,
        folderPath,
        returnOnlyFilesMd
    }