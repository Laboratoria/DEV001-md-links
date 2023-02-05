const paths = require("path");
const fs = require("fs");

const {
  pathconvertToAbs,
  filterTheMdLinks,
} = require("./library/paths");

const { readFileAndSearchLinks } = require("./library/links");

const { validateLinks } = require("./library/validate");

let pathI = `${process.cwd()}\\test\\prueba`;

const mdLinks = (path, option) =>
  new Promise((resolve, reject) => {
    const pathAbsolute = paths.isAbsolute(path)? path: pathconvertToAbs(path);
    if (fs.existsSync(path)) {
      const filterArray = filterTheMdLinks(pathAbsolute);
      if (filterArray.length === 0) {
        reject('THERE ARE NO ".MD" FILES, TRY ENTERING ANOTHER PATH MARKDOWN');
      }
      readFileAndSearchLinks(filterArray).then((response) =>{
      if(option.validate === true){
      validateLinks(response).then((arrOfLinks) =>{
          resolve(arrOfLinks)
      })
    }
    if(option.validate === false){
      resolve(response)
    }
      })

    }
    else{
      reject('THE ROUTE DOES NOT EXIST, TRY WITH ANOTHER PATH')
    }


  });


/**npm install node-fetch@v2
npm install node-fetch@v2
const fetch = require('node-fetch');
 */

module.exports = { mdLinks };
