const fs = require("fs");
const path = require("path");
const chalk = require('chalk')

/*funcion para dar color*/
const colorOfText = (message, color) => chalk.keyword(color)(message);

/* funcion para checar si es absoluta o relativa */

/* funcion para convertir ruta relativa a absoluta */
const pathconvertToAbs = (route) => {
    const pathAbs = path.resolve(route);
    return pathAbs;
};


/* funcion para checar si es archivo */
const isFile = (routeAbsolute) => fs.statSync(routeAbsolute).isFile();

/**
  * @function saveFilesInArray
  * @param routeAbsolute
  * @returns array de rutas guardadas de todos los archivos que se encuentran
  */
const saveFilesInArray = (routeAbsolute) => {
  let arrayOfFilesMd = [];
  if (
    isFile(routeAbsolute))
    {
    arrayOfFilesMd.push(routeAbsolute);
  } else {
    const files = fs.readdirSync(routeAbsolute)
    files.forEach((file) => {
      const childDirectory = path.join(routeAbsolute, file);
        arrayOfFilesMd = [...arrayOfFilesMd, ...(saveFilesInArray(childDirectory))];
      
    });
  }
  return arrayOfFilesMd;
};

/**
  * @function filterTheMdLinks
  * @param routeAbsolute
  * @returns filtra los archivos que son md usando .extname y retorna un array de las rutas de estos archivos
  */
const filterTheMdLinks = (routeAbsolute) => {
  return saveFilesInArray(routeAbsolute).filter((file => path.extname(file) === '.md'));
};


module.exports = { colorOfText, pathconvertToAbs, saveFilesInArray, filterTheMdLinks, isFile  };
