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
const searchMD = (route) => {
  let allFiles = []
  if (!theDirectory(route)) {
    const fileMD = archiveMD(route) === '.md' ? route : 'No es un archivo md'
    return allFiles.push(fileMD);
  }
  const files = fs.readdirSync(route);
  files.forEach((file) => {
    const directoryMD = MdFile(file) === '.md' ? file : '';
    return allFiles.push(directoryMD);
  })
  return allFiles.filter(file => MdFile(file) === '.md').map((archivo) => {
    return route.concat('/', archivo);
  })
}

//leer cada link
const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (error, text) => {
      if (error) {
        reject('Hay un problema para leer tu archivo, verifica que sea valido');
      }
      resolve(getLinks(text))
    });
  });
};

const expression = /(https?:\/\/)[a-zA-z0-9-_.]+\/?[a-zA-z0-9-_./]+/g;
const getLinks = (text) => text.match(expression);

//validar el url true
const verifyUrl = (links, absoPath) => {
  const arrayObjLink = links.map((link) => {
    //console.log(link)
    // console.log(axios.get(link))
    return axios.get(link)
      .then((resp) => {
        // console.log(arrayObjLink)
        return {
          href: link,
          text: 'cuando yo pueda de que va el link',
          file: absoPath,
          status: resp.status,
          ok: resp.statusText,
        }
      })
      .catch(() => {
        return {
          href: link,
          text: 'cuando yo pueda de que va el link',
          file: absoPath,
          status: 404,
          ok: 'FAIL',

        }
      })
  })
  return Promise.all(arrayObjLink).then((result) => result);
}

//verificar el url falso 
const verifyUrlFalse = (links, absoPath) => {
  const arrayObjLink = links.map((link) => {
    return {
      href: link,
      text: 'cuando yo pueda de que va el link',
      file: absoPath,
    }
  })
  return arrayObjLink
}

// const verifyUrl = (url, route) => {
//   // console.log(url)
//   return new Promise((resolve) => {
//     axios.get(url)
//       .then((resp) => {
//         resolve({
//           href: url,
//           //text: url,
//           file: route,
//           status: resp.status,
//           message: resp.statusText,
//         })
//       })

//       .catch((error) => {
//         console.log(error)
//         // handle error
//         resolve((`ERROR, url defectuoso ${url} no existe, o esta mal escrito`));
//       })

//   })
// }

//verifyUrl("http://google.comxyz").then(data => console.log(data))
//verifyUrl("https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg").then(data => console.log(data))

module.exports = {
  findPath,
  pathAbsolute,
  searchMD,
  readFile,
  verifyUrl,
  verifyUrlFalse,
};