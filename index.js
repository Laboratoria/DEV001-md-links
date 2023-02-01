const {
  pathExists, turnPathAbsolute, isExtensionMd, getLinks,
} = require('./functions');

// funcion mdLinks con Angie
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (pathExists(path)) {
    const pathAbsolute = turnPathAbsolute(path);
    if (isExtensionMd(pathAbsolute)) {
      getLinks(pathAbsolute).then((arrayLinks) => {
        if (arrayLinks.length !== 0) {
          resolve(arrayLinks);
        } else {
          reject(new Error('Path does not have links'));
        }
      });
    } else {
      reject(new Error('Path is not an extension file .md'));
    }
  } else {
    reject(new Error('Path does not exist'));
  }
});
// console.log(mdLinks('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplodos.md'));
// función inicial de mdLinks
// const mdLinks = (path, options) => new Promise((resolve, reject) => {
//   // La ruta existe?
//   if (!pathExists(path)) {
//     // Si no existe la ruta se rechaza
//     reject(new Error('La ruta no existe'));
//   } if (!pathIsAbsolute(path)) {
//     const pathAbsolute = turnPathAbsolute(path);
//     if (!isExtensionMd(pathAbsolute)) {
//       reject(new Error('No es un archivo .md'));
//     } else {
//       resolve(getLinks(pathAbsolute));
//     }
//   }
// });

// intento de arreglar funcion mdlinks
// const mdLinks = (path, options = {}) => new Promise((resolve, reject) => {
//   // La ruta existe?

//   if (pathExists(path)) {
//     const pathAbsolute = turnPathAbsolute(path);
//     const onlyMd = isExtensionMd(pathAbsolute);
//     if (isExtensionMd(pathAbsolute)) {
//       resolve((getLinks(pathAbsolute)));
//     }
//     }
//     else {
//       reject(new Error('No tiene links'));
//     } else {
//     reject(new Error('No es un archivo .md'));
//   }
//   reject(new Error('La ruta no existe'));
// });

// console.log(pathExists('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(pathExists('C:/noexiste'));
// console.log(pathIsAbsolute('./functions'));
// console.log(turnPathAbsolute('./functions'));
// console.log(
// isExtensionMd('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.html'));
// console.log(readFiles('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(createArray('C:/Users/adria/Desktop/Laboratoria/DEV001-md-links/prueba/ejemplo.md'));
// console.log(mdLinks('./prueba/ejemplo.md'))
//   .then((res) => console.log('este es de aqui', res));

module.exports = {
  mdLinks,
};
