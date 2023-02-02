const fs = require('fs');
const { readFile } = require('fs/promises'); //Promesa
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
let arrayFilesMd;
const searchFilesMd = (param) => {
  arrayFilesMd = [];
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
  return arrayFilesMd;
};

// obtener los links dentro del archivo md
const getLinks = (pathsMd) => {
  return new Promise((resolve, reject) => {
    const links = [];
    // iterar el array para convertir a string cada path
    pathsMd.forEach((pathMd) => {
      const str = pathMd.toString();
      readFile(str, "utf-8") // leer cada archivo md para obtener los links
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
        })
        .catch((error) => reject(error));
    });
  });
};

// Validando los links
const validateLinks = (links) => {
  const linksValidated = links.map((link) => {
    return fetch(link.href)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: res.status,
            OK: res.statusText,
          };
        } else if (res.status >= 400 && res.status <= 499) {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: res.status,
            OK: 'Fail',
          };
        }
      })
      .catch((error) => {
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          OK: 'Fail',
          status: error.message,
          message: error.cause,
        };
      });
  });
  return Promise.all(linksValidated);
};

module.exports = {
  pathExist,
  getAbsolutePath,
  isFileMd,
  searchFilesMd,
  isDirectory,
  getLinks,
  validateLinks,
};
