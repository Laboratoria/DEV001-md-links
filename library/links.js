// const fs = require("fs");
const { marked } = require("marked");
const fs = require('node:fs/promises');
const {log} = console;
//usamos  promesas de node en vez de crearla 

/**
  * @function {lee los archivos md y retorna un array de objetos}
  * @param {un array de objetos con href, ruta y texto}
  * @returns {un array de objetos de los links encontrados en cada archivo}
  */
const readFileAndSearchLinks = (arrOfMd) => {
//usamos map que ya va a devolvernos un nuevo array de nuestras promesas (de readFile)
  const promesas = arrOfMd.map(file => fs.readFile(file, { encoding: 'utf8' })
    .then((data) =>{
      // usamos then para a la data que nos esta devolviendo (es de cada archivo leido) se le aplica la funcion de filter links
      return filterLinks(data,file);
    })
    .catch((e) =>{
      log(e)
     return e
    }));

    return Promise.all(promesas)
    .then((links) =>{
      return links.flat()
    })
}

/**
  * @function {funcion que extrae los links usando marked}
  * @param {it renders the markdown in html format}
  * @returns {un array por cada archivo con objetos(links) con su href, text y ruta}
  */
// const filterLinksMarked = (data, file) => {
//   let arrLinks = [];
//   const route = file.replace(/\\/g, "/");

//   const renderer = new marked.Renderer();
//   renderer.link = (href, _, text) => {
//     const obj = {
//         href,
//         text: text.slice(0,50),
//         file: route,
//     }
//       arrLinks.push(obj);
//   };
//   marked(data, {renderer})
//  return arrLinks
// }


/* funcion de filtrado con reg exp */
 const filterLinks = (data, file) => {
  let arrLinks = [];
  const regExp = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  let findLinks = Array.from(data.matchAll(regExp));
  findLinks.forEach((el) =>{
    if (findLinks !== "") {
      let links = el
      const objLinks = {
        href: links[2],
        text: links[1],
        file: file.replace(/\\/g, "/"),
      };
      arrLinks.push(objLinks)
    }
  })
    
  return arrLinks
};


    

module.exports = { readFileAndSearchLinks, filterLinks};
