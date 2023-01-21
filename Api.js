const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const md = new markdownIt();
const fetch = require("node-fetch");
const { resolve } = require("path");


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
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (error) {
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
// const filterLinks = (data) =>{
//   const links = [];
//     const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
//     const fileParse = md.render(data);
//     let result;
//       while ((result = regExp.exec(fileParse)) !== null) {
//       const obj = {
//         href: result[(0, 3)],
//         text: result[(0, 4)],
//         file: pathReceived,
//         };
//         links.push(obj);
//       }
//     return links;
// };
// Leer el contenido de un archivo
const readFiles = (pathReceived) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathReceived, "utf-8", (error, data)=>{
    if(error){
      reject(error)
    } else {
    resolve(data);
    }
    })
  });
  };
  const getLinks = (data) => {
    const links = [];
    const fileParse = md.render(data);
    const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
    const regExpLink = /\(((?:\/|https?:\/\/).*)\)/g;
    const regExpText = /\[(.*)\]/g;
    let result;
      while ((result = regExp.exec(fileParse)) !== null) {
      result.forEach((link)=>{
        const obj = {
          href: link.match(regExpLink).join().slice(1,-1),
          text: link.match(regExpText).join().slice(1,-1),
          file: pathReceived,
          };
          links.push(obj);
      });
      console.log('getlinks', links)
      }
      return links;
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
          text: link.text
          // .slice(0, 50),
        };
        console.log(statusData)
        return statusData;
      })
      .catch((error) => {
        const statusDataErr = {
          href: link.href,
          file: link.file,
          status: `Fail ${error.message}`,
          message: "No status",
          text: link.text
          // .slice(0, 50),
        };
        return statusDataErr;
      });
  }); console.log('todas promise',arrLinksStatus)
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
  getLinks,
  validateLinks
};
