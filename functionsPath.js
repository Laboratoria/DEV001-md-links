const fs = require("fs");
const path = require("path");

// identifica si la ruta existe o no
const pathExist = (param) => fs.existsSync(param);

// chequear o convertir a ruta absoluta
const getAbsolutePath = (paths) => {
  return path.isAbsolute(paths) ? paths : path.resolve(paths);
};

// chequear si la extensión corresponde a un archivo md
const isFileMd = (pathAbsolute) => {
  const filePath = path.extname(pathAbsolute);
  if (filePath === ".md") {
    return true;
  }
  return false;
};

// evaluar si el path corresponde a un directorio
const isDirectory = (pathAbsolute) => fs.statSync(pathAbsolute).isDirectory();

// función para leer el directorio buscando archivos md
let arrayFilesMd = [];
const searchFilesMd = (param) => {
  if (!isDirectory(param) && isFileMd(param)) {
    arrayFilesMd.push(param);
  } else {
    // constante para leer el directorio
    const readDir = fs.readdirSync(param);
    readDir.forEach((list) => {
      //separando cada ruta dentro del directorio
      list = path.join(param, list);
      // recursividad para leer un directorio
      if (isDirectory(list)) {
        searchFilesMd(list);
      } else if (isFileMd(list)) {
        // guardando cada archivo md dentro del array
        arrayFilesMd.push(list);
      }
    });
  }
  console.log("estamos en arrayFileMd", arrayFilesMd);
  return arrayFilesMd;
};

module.exports = {
  pathExist,
  getAbsolutePath,
  isFileMd,
  searchFilesMd,
  isDirectory,
};
