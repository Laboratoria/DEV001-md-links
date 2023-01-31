const fs = require('fs');
const path = require('path');

// Verificar SI existe ruta o NO
const pathExists = (route) => fs.existsSync(route);
// Verifica si la ruta es ABSOLUTA
const pathIsAbsolute = (absoluteRoute) => path.isAbsolute(absoluteRoute);
// Convierte una ruta RELATIVA a ABSOLUTA
const turnPathAbsolute = (route) => (pathIsAbsolute(route) ? route : path.resolve(route));
// Busca si la extension de la ruta es MD
const isExtensionMd = (route) => path.extname(route) === '.md';
// Lee el archivo, Esta promesa del readFiles se ejecuta en cli
const readFiles = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

// Función para extraer los links
const getLinks = (route) => new Promise((resolve, reject) => {
  const links = [];
  readFiles(route)
    .then((data) => {
      const urlLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
      let match = urlLinks.exec(data);
      while (match !== null) {
        links.push({
          href: match[2],
          text: match[1],
          file: route,
        });
        match = urlLinks.exec(data);
      }
      (resolve(links));
    })
    .catch((error) => reject(error));
});
// getLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.html')
// .then((res) => console.log('este es de aqui', res));

// Función para validar links
const validatedLinks = (links) => Promise.all(
  links.map((link) => fetch(link.href)
    .then((result) => {
      const file = {
        href: link.href,
        text: link.text,
        file: link.file,
        status: result.status,
        message: result.ok ? 'ok' : 'fail',
      };
      return file;
    })
    .catch((error) => {
      const fileError = {
        href: link.href,
        text: link.text,
        file: link.file,
        status: `Fail ${error.message}`,
        message: 'No status',
      };
      return fileError;
    })),
);
// Practica de función para guardar los links en un array
const createArray = (route) => {
  const mdArray = [];
  if (isExtensionMd(route)) {
    mdArray.push(route);
  }
  return mdArray;
};

module.exports = {
  pathExists,
  pathIsAbsolute,
  turnPathAbsolute,
  isExtensionMd,
  readFiles,
  createArray,
  getLinks,
};

// /\[.*\]\(.*\)/g

// const readFiles = (route) => fs.readFileSync(route, 'utf-8');

// const isExtensionMd = (route) => path.extname(route) === '.md';
// const getLinks = (route) => {
//   const urlLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g;
//   if (isExtensionMd(route)) {
//     return readFiles(route).match(urlLinks);
//   }
//   return [];
// };
