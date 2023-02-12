const axios = require("axios");
const fs = require("fs");

const readMd = (inputPath) => fs.readFileSync(inputPath, 'utf-8');

// sacar los links del contenido con las propiedades href text file
const getmdLinks = (inputPath) => {

  const links = [];
  const file = readMd(inputPath);
  // guarda el formato como es un formato de una url markdown
  const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
  //comparar caracteres, verificar si es marckdown
  //esta haciendo una busqueda por el documento 
  let match = regex.exec(file);
  //si es que no esta vacio ejecuta lo siguiente
  while (match !== null) {
    //agregar con push estaagregando dentro del arregl oque se llama links
    links.push({
      href: match[2],
      text: match[1],
      file: inputPath,
    });
    // se vuelve a ejecutar
    match = regex.exec(file);
  };
  return links;
};

const validateLinks = (links) => {
  // si opcion validate es true se valida con status ok
  // funcion landa
  const arrayPromise = links.map(link => {
    return axios.get(link.href).then(linkResponse => {
      return { ...link, status: linkResponse.status, ok: linkResponse.statusText };
    }).catch(err => {
      return { ...link, status: 404, ok: 'fail' };
    })
  });

  //  para resolver la promesa devolver un arreglo de links
  return (Promise.all(arrayPromise).then(result => {return result})) ;
}


module.exports = {
  getmdLinks, readMd, validateLinks
};