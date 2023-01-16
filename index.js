const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const md = new markdownIt();

//Convertir el path en Absoluto
const pathAbsolute = (pathReceived) => {
  return path.resolve(pathReceived);
};

// Verificar que el path si existe
const isPathValid = (path) => {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
// Ver si es un directorio, devuelve true o false
const statDir = (path) => {
  try {
    if (fs.statSync(path).isDirectory()) {
      return true;
    }
  } catch (error) {
    return `el directorio no existe`;
  }
};

// // Leer si existe un directorio
const readDir = (pathReceived) => {
  return fs.readdirSync(pathReceived);
};
// Es un archivo, devuelve true o false
const statFile = (path) => {
  const statsObj = fs.statSync(path);
  if (statsObj.isFile()) {
    return statsObj.isFile();
  } else {
    return `No existe el archivo ${statsObj.isFile()}`;
  }
};
// Extraer los archivos con .md
const fileMd = (pathReceived) => {
  const fileMd = path.extname(pathReceived);
  return fileMd === ".md";
};
// Leer el contenido de un archivo
const readFiles = (pathReceived) => {
  fs.readFile(pathReceived, "utf-8", (error, contenido) => {
    if (error) {
      return error;
    } else {
      if (fileMd(pathReceived)) {
        let links = [];
        const fileParse = md.render(contenido);
        const regExp = /(<a [^>]*(href="([^>^\"]*)")[^>]*>)([^<]+)(<\/a>)/gi;
        let result;
        while ((result = regExp.exec(fileParse)) !== null) {
          const obj = {
            href: result[(0, 3)],
            text: result[(0, 4)],
            file: pathReceived,
          };
          links.push(obj);
        }
        console.log(links)
        return links;
      }
    }
  });
};

//Funcion mdLinks
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if (path) {
      // Si existe y es absoluta.
      if (isPathValid(pathAbsolute(path))) {
        if (statDir(pathAbsolute(path))) {
          resolve(readDir(pathAbsolute(path)));
        }
        if (statFile(pathAbsolute(path))) {
          console.log('esta dentro de mdlinks', readFiles(pathAbsolute(path)));
          resolve(readFiles(pathAbsolute(path)));
        }
      } else {
        //  Si no existe la ruta se rechaza la promesa.
        reject(`El archivo no es valido`);
      }
    } else {
      //  Si no existe la ruta se rechaza la promesa.
      reject(`El archivo no existe`);
    }
  });
};

module.exports = { mdLinks };
