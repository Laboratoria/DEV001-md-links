const {
  convertToAbsolute,
   fileMd,
   readFile,
   getLinks
} = require('./src/api');
const fs = require('fs');

const mdLinks = (filePath, options = {validate : false}) => new Promise((resolve, reject) => {
  const shouldValidate = options.validate;
  //se convierte de relativa a absluta
const absolutePath = convertToAbsolute(filePath);
// check pathExist
const pathExist = fs.existsSync(absolutePath);
if(!pathExist){
  return reject(new Error('La ruta no existe ' + absolutePath))
}
// check MDfile
const isMdFile = fileMd(absolutePath);
if(!isMdFile){
  return reject(new Error('El archivo no es Markdown'))
}
getLinks(absolutePath)
.then((links) =>{
 if(!shouldValidate) {
  return resolve(links);
 } 
 //1.Debo recorrer los un array de links con map para generar una promesa por cada links 
 //para verificar si el linkes valido o no.

 //2.esperar que todas las promesas se resulevan para que finalmente pueda resolver
 //la promesa de MDlinks y agregar los valores de los links 'NOR FOUND' o 'OK'
})
.catch((error) =>{
  reject(error)
})
})
    
mdLinks('./filesExamples/with-links.md')
.then((respuesta) => console.log(respuesta))
.catch((error) => console.error(error));




/*

const path = require('path');

const mdLinks = (filePath, option) => {
  return new Promise((resolve, reject) => {
    //se resuelve la ruta como absoluta
    const fileName = path.resolve(filePath);
    //identifica si la ruta existe.


    const fileExist = fs.existsSync(fileName);
    if (fileExist) {
      resolve([]);
      //chequear y convertir  a una ruta absoluta.
      //probar si es md o no.
      // si es un directorio extraer los archivos md y devolverlo en un arreglo.
    } else {
      // si no existe la ruta se rechaza la promesa.
      reject('la ruta no existe');
    }
  });
};


module.exports = {
  mdLinks,


}
*/


