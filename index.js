const { 
  pathExist,
  getAbsolutePath,
  isFileMd,
  isDirectory,
  searchFilesMd,
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
    // chequear si la ruta. Si este no es un directorio ni un md rechaza la promesa
    if (!isDirectory(pathAbsolute) && !isFileMd(pathAbsolute)) {
      return reject ('La ruta no es un archivo md');
    } else {
      //función que lee el directorio buscando archivos md. Devuelve un array
      searchFilesMd(pathAbsolute);
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
