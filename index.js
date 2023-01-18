const { 
  pathExist,
  getAbsolutePath,
  isFileMd,
  readFile,
  searchFilesMd
} = require('./path.js')

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // identificar si la ruta existe
  if (!pathExist(path)) {
    // si no existe la ruta, rechaza la promesa
    return reject('La ruta no existe');
  } else {
    // chequear o convertir a ruta absoluta
    const pathAbsolute = getAbsolutePath(path)
    console.log(pathAbsolute);
    // chequear si la ruta es un archivo md
    if (!isFileMd(pathAbsolute)) {
      searchFilesMd(pathAbsolute)
    } else {
      //leer los archivos md
      readFile(pathAbsolute)
      console.log(searchFilesMd, 'llegamos hasta aquí')
    }
    // identificar si es un archivo o un directorio
    // si es un directorio, leer el directorio
    // si contiene archivos md, agregar a un arreglo
    // si no contiene archivos md, rechazar la promesa
  }
});

module.exports = {
  mdLinks,
};
