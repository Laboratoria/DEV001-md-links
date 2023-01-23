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

// evaluar si el path corresponde a un directorio
const isDirectory = (pathAbsolute) => fs.statSync(pathAbsolute).isDirectory();

// función para leer el directorio buscando archivos md
let arrayFileMd = [];
const searchFilesMd = (param) => {
  if (!isDirectory(param) && isFileMd(param)) {
    arrayFileMd.push(param);
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
        arrayFileMd.push(list);
      }
    });
  }
  console.log('estamos en arrayFileMd', arrayFileMd);
  return arrayFileMd;
};

// leer el archivo si es una extensión md
const readFiles = (pathMd) =>
  new Promise((resolve, reject) => {
    fs.readFile(pathMd, 'utf-8', function (error, data) {
      if (error) {
        reject('Ocurrio un Error');
      } else {
        resolve(data);
      }
    });
  });

// obtener los links dentro del archivo md

const getLinks = (pathsMd) => {
  return new Promise((resolve, reject) => {
    const links = [];
    // iterar el array para convertir a string cada path
    pathsMd.map((pathMd) => {
      const str = pathMd.toString();
      readFiles(str) // leer cada archivo md para obtener los links
        .then((data) => {
          const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
          let match = regex.exec(data);
          while (match !== null) {
            links.push({
              href: match[2],
              text: match[1],
              file: str,
            });
            match = regex.exec(data);
          }
          resolve(links);
          console.log('cada link en el archivo md', links);
        })
        .catch((error) => reject(error));
    });
  });
};

module.exports = {
  pathExist,
  getAbsolutePath,
  isFileMd,
  readFiles,
  searchFilesMd,
  isDirectory,
  getLinks,
};
