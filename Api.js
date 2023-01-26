const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const colors = require('colors');


//Devuelve true si el path es absoluto sino false.
const pathRelative = (pathReceived) => {
  return path.isAbsolute(pathReceived);
};
//Convertir el path en Absoluto
const pathAbsolute = (pathReceived) => {
  return path.resolve(pathReceived);
};

// Verificar que el path si existe
const isPathValid = (path) => {
    if (fs.existsSync(path)) {
      return true;
    }else {
    return false;
  }
};
//Función que une 2 rutas
const joinPaths = (pathReceived, pathReceived2) =>
  path.join(pathReceived, pathReceived2);

// // Leer si existe un directorio
const readDir = (pathReceived) => {
  return fs.readdirSync(pathReceived);
};
// Extraer los archivos con .md
const fileMd = (pathReceived) => {
  const fileMd = path.extname(pathReceived);
  return fileMd === ".md";
};
// Transforma el path relativo en absoluto y reemplaza '/'
const pathDefinitive = (pathReceived) => {
  if (!pathRelative(pathReceived)) {
    return (pathReceived = pathAbsolute(pathReceived).replace(/\\/g, "/"));
  } else {
    return (pathReceived = pathReceived.replace(/\\/g, "/"));
  }
};
//
const readFiles = (pathReceived) => {
 return new Promise((resolve, reject) => {
  fs.readFile(pathReceived, "utf-8", (error, contenido) => {
    if (error) {
      reject(error);
    } else {
      if (fileMd(pathReceived)) {
        let links = [];
        const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
        let match = regex.exec(contenido);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: pathReceived,
        });
        match = regex.exec(contenido);
      }
      resolve(links);
    }
    }
  })
 })
}

const pathFileMd = (pathReceived) => {
  const statsObj = fs.statSync(pathReceived);
  let allFilesMd = [];
  if (statsObj.isFile() && fileMd(pathReceived)) {
    allFilesMd.push(pathDefinitive(pathReceived));
  } else if (statsObj.isDirectory()) {
    const arrayPaths = readDir(pathDefinitive(pathReceived));
    arrayPaths.forEach((pathX) => {
      const pathsDir = joinPaths(pathReceived, pathX);
      const savePaths = pathFileMd(pathsDir);
      allFilesMd = allFilesMd.concat(savePaths);
    });
  }
  return allFilesMd;
};


//Validar links
const validateLinks = (arrLinks) => {
  const arrLinksStatus = arrLinks.map((link) => {
   return fetch(link.href)
      .then((resultLink) => {
        const statusData = {
          href: link.href,
          file: link.file,
          status: resultLink.status,
          message:
            resultLink.status > 199 && resultLink.status < 400 ? "OK" : "Fail",
          text: link.text,
        };
        return statusData;
      }).catch((error) => {
        const statusDataErr = {
          href: link.href,
          file: link.file,
          status: `Fail ${error.message}`,
          message: "No status",
          text: link.text
        };
        return statusDataErr;
      });
    }); 
    return Promise.all(arrLinksStatus);
};

module.exports = {
  isPathValid,
  pathRelative,
  pathAbsolute,
  pathFileMd,
  readFiles,
  pathDefinitive,
  readDir,
  validateLinks
};
