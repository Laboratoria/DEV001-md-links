const { getmdLinks, validateLinks } = require('./getmdlink.js');

const fs = require("fs");
const path = require("path");

const mdLinks = (inputPath, options) => {
  return new Promise((resolve, reject) => {
    //comprueba si una ruta existe o no

    if (fs.existsSync(inputPath)) {
      transformPathAbsolute(inputPath);
      let extension = path.extname(inputPath);
      //Devuelve la extensión de la ruta. 
      if ((extension === '.md')) {
        //reject("la  ruta es .md")

        // leer el archivo md utf-8 formatos
        fs.readFile(inputPath, 'utf-8', (err, data) => {
          if (err) {
            console.log('error: ', err);
          } else {
            //const links = getmdLinks(inputPath);
            const links = getmdLinks(inputPath);
            if (options.validate === true) {
              //console.log(resolve (validateLinks(links)));
              resolve(validateLinks(links));
            } else {
              resolve(links);
            }
          }
        });
      } else {
        reject(path.extname(inputPath))
      }
    } else {
      //si la ruta no existe se rechaza la promesa
      reject('la ruta no existe');
    }
  });
};

const transformPathAbsolute = (inputPath) => {
  //permite obtener la ruta absoluta 
  const relativePath = path.resolve(inputPath);
  //Devuelve el nombre de directorio de una ruta.
  const path1 = path.dirname(relativePath);
  //Devuelve la última parte de una ruta. 
  const path2 = path.basename(relativePath);
  //Junta todos los argumentos y normaliza la ruta resultante.
  const newPathAbsolte = path.join(path1, path2);
  return newPathAbsolte
};

module.exports = {
  mdLinks, transformPathAbsolute
};
