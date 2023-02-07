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
   } else {
      const absolutePath = (path.join(process.cwd(), filePath));
      return absolutePath;
   }
};

//validar si es un archivo md
const fileMd = (filePath) => {
   return (path.extname(filePath) === ".md");
};

//Leer archivo (comprobar si tiene links)
const readFile = (filePath) => new Promise((resolve, reject) => {
   fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
         reject(error);
      } else {
         resolve(data);
      }
   });
});

//obtener links
const getLinks = (filePath) => new Promise((resolve, reject) => {
   const newLinksMd = [];
   readFile(filePath).then((data) => {
      const regularExpression = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
      const match = regularExpression.exec(data);
      //si el archivo contiene Links debe retornar un array de links
      while (match = ! null) {
         newLinksMd.push({
            href: match[1],
            text: match[2],
            file: filePath,
         });
         match = regularExpression.exec(data);
      }
      resolve(newLinksMd);
   })
      .catch((error) => reject(error));
});


module.exports = {
   convertToAbsolute,
   fileMd,
   readFile,
   getLinks,
}




