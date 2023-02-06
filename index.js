const {
  pathExist,
  getAbsolutePath,
  isFileMd,
  isDirectory,
  searchFilesMd,
  getLinks,
  validateLinks,
} = require('./functions.js');

const mdLinks = (path, options) =>
  new Promise((resolve, reject) => {
    // variable que contendrá el arreglo de archivos md
    let files;
    let links;
    let arrValidateLinks;
    // identificar si la ruta existe
    if (!pathExist(path)) {
      // si no existe la ruta, rechaza la promesa
      return reject(`Esta ruta no existe: ${path}`);
    } else {
      // chequear o convertir a ruta absoluta
      const pathAbsolute = getAbsolutePath(path);
      // chequear la ruta. Si este no es un directorio ni un md rechaza la promesa
      if (!isDirectory(pathAbsolute) && !isFileMd(pathAbsolute)) {
        return reject(
          `Esta ruta no es una carpeta ni un archivo md: ${pathAbsolute}`
        );
      } else {
        //función que lee el path buscando archivos md. Devuelve un array
        files = searchFilesMd(pathAbsolute);
        // si no contiene archivos md, rechazar la promesa
        if (files.length === 0) {
          return reject(`Esta ruta no contiene archivos md: ${pathAbsolute}`);
        } else {
          Promise.all([getLinks(files)]).then((res) => {
            links = res.flat();
            if (links.length === 0) {
              return reject(
                `No se encontraron links en el archivo con ruta: ${pathAbsolute}`
              );
            } else {
              if (options === false) {
                return resolve(links);
              } else if (options === true) {
                Promise.all([validateLinks(links)]).then((res) => {
                  arrValidateLinks = res.flat();
                  resolve(arrValidateLinks);
                });
              }
            }
          });
        }
      }
    }
  });

module.exports = {
  mdLinks,
};
