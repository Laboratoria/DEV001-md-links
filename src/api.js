const path = require('path');
const fs = require('fs');

/* se valida si es una ruta existente
const verificateFileExist = (filePath) => {
   return (fs.existsSync(filePath));
};
*/

//se valida si la ruta es relativa o absoluta.
//se resuelve la Ruta como absoluta (se convierte ruta relativa a absoluta)
const convertToAbsolute = (filePath) => {
   if (path.isAbsolute(filePath)) {
      return filePath;
   }else{
      const absolutePath= (path.join(process.cwd(), filePath));
      return absolutePath;
   }
   };
   
//validar si es un archivo md
const fileMd = (filePath) => {
   return (path.extname(filePath) === ".md");
};

//Leer archivo (comprobar si tiene links)

const readFile = (filePath, utf_8) => {
   return (fs.readFileSync);

};


module.exports = {
   convertToAbsolute,
   fileMd,
   readFile,
}





