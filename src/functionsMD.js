const fs = require('fs');
const path = require('node:path');
const axios = require('axios');

//si la ruta existe
const findPath = (route) => fs.existsSync(route);
// si la ruta es un directorio
const theDirectory = (route) => fs.statSync(route).isDirectory();
// si es un archivo md
const archiveMD = (route) => path.extname(route);
//si es una carpeta
const MdFile = (file) => path.extname(file);

//convertir el path en absoluto
const pathAbsolute = (route) => {
  if (!path.isAbsolute(route)) {
    return path.resolve(route);
  }
  return route;
}

// burcar los archivos md
function searchMD(route) {
  let allFiles = []

  if (!theDirectory(route)) {
    archiveMD(route) === '.md' ? route : 'no existe la ruta'
    // console.log('29 MD', route)
    allFiles.push(route);
    return allFiles.flatMap((file) => {
      // console.log('RESULT', file)
      return file
    })

  }
  const files = fs.readdirSync(route);
  files.forEach((file) => {
    const directoryMD = MdFile(file) === '.md' ? file : '';
    // console.log('39 MD', directoryMD)
    return allFiles.push(directoryMD);

  });

  //console.log('44 MD', allFiles)
  return allFiles.filter(file => MdFile(file) === '.md').flatMap((archivo) => {
    //console.log('45 MD', archivo)
    return route.concat('/', archivo);
  })
}

//leer cada link
const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (error, text) => {
     // console.log('55 MD', getLinks(text))

      if (error) {
        reject('Hay un problema para leer tu archivo, verifica que sea valido');
      }
      
      resolve(text)
    });
  });
};


const getLinks = (text) => {
  return new Promise((resolve, reject) => {
    const links = [];
    readFile(text).then((data) => {
      const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
      let match = regex.exec(data);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: text,
        });
        match = regex.exec(data);
      }
      resolve(links);
      //console.log(links);
    })
      .catch((error) => reject(error));
  });
}
//validar el url true
const verifyUrl = (links) => {
  //console.log(link)
 const arrlinks = links.map((link) => {

    // console.log(axios.get(link.href))
    return axios.get(link.href)
      .then((resp) => {
        //console.log('102 MD',resp)
        return{ ...link,
           status: resp.status,
           ok: resp.statusText
        }
      })
      .catch(() => {
        return { ...link,
          status: 'FAIL',
          ok: 404
       }
      })
  })
  return Promise.all(arrlinks);
}
module.exports = {
  findPath,
  pathAbsolute,
  searchMD,
  verifyUrl,
  readFile,
  getLinks
};