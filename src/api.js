//leer archivo e imprimir el contenido en la terminal
const fs = require('fs');
//manejo de rutas sistema 
//const path = require('path');

fs.readdir('./', (error, files)) => {
   if (error){
    throw error;
   }else {
    console.log(files);
   }



//const readFile = fs