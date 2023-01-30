const path = require('path');
const fs = require('fs');

/* se valida si es una ruta existente
const verificateFileExist = (filePath) => {
   return (fs.existsSync(filePath));
};
*/

//se valida si la ruta es relativa o absoluta.

const checkPath = (filePath) => {
   return (path.isAbsolute(filePath));
};
/*
//se resuelve la Ruta como absoluta (se convierte ruta relativa a absoluta)
const fileAbsolute = (filePath) => {
   const pathAbsolut =  path.resolve(filePath);
  
};

//validar si es un archivo md
const fileMd = (filePath) => {
   return (path.extname(filePath) === ".md");
};

//Leer archivo (comprobar si tiene links)

const readFile = (filePath, utf-8) => {
   return (fs.readFileSync)

})

*/


module.exports = {
checkPath,
//fileAbsolute,
//fileMd,
//readFile,
}





