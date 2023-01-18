const fs = require('fs');
const path = require('path');

// identifica si la ruta existe o no
const pathExist = (param) => fs.existsSync(param);

// chequear o convertir a ruta absoluta
const getAbsolutePath = (paths) => {
  return path.isAbsolute(paths) ? paths : path.resolve(paths);
};

// chequear si la extensión corresponde a un archivo md
const isFileMd = (pathAbsolute) => {
  const filePath = path.extname(pathAbsolute);
  if (filePath === '.md') {
    return true;
  }
  return false;
};
// leer el archivo si es una extensión md
const readFile = (pathsMd) => {
  if (pathsMd === true) {
    return fs.readFileSync(pathsMd, 'utf-8');
  }
};

// evaluar si el path corresponde a un directorio
const isDirectory = (pathAbsolute) => fs.lstatSync(pathAbsolute).isDirectory();


// función para leer el directorio buscando archivos md
const arrayFileMd = [];
const searchFilesMd = (param) => {
  if (!isDirectory(param) && isFileMd(param)){
    arrayFileMd.push(param)
  } else {
    // constante para leer el directorio
    const readDir = fs.readdirSync(param);
    readDir.forEach((list) => {
      //separando cada ruta dentro del directorio
      list = path.join(param, list);
       //console.log('cada ruta dentro del directorio: ', list);
       // recursividad para leer un directorio
      if (isDirectory(list)) {
        searchFilesMd(list);
      } else if (isFileMd(list)) {
        // guardando cada archivo md dentro del array
        arrayFileMd.push(list);
      }
    });
  } 
  console.log('estamos en arrayFileMd', arrayFileMd);
  return arrayFileMd;
};


module.exports = {
  pathExist,
  getAbsolutePath,
  isFileMd,
  readFile,
  searchFilesMd
};
