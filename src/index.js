const {
  convertToAbsolute,
  fileMd,
  readFile,
  getLinks
} = require('./api');
const { getStatus } = require('./options');
const fs = require('fs');



const mdLinks = (filePath, options = { validate: false }) => new Promise((resolve, reject) => {
  const shouldValidate = options.validate;
  //se convierte de relativa a absluta
  const absolutePath = convertToAbsolute(filePath);
  // check pathExist
  const pathExist = fs.existsSync(absolutePath);
  if (!pathExist) {
    return reject(new Error('La ruta no existe ' + absolutePath))
  }
  // check MDfile
  const isMdFile = fileMd(absolutePath);
  if (!isMdFile) {
    return reject(new Error('El archivo no es Markdown'))
  }
  getLinks(absolutePath)
    .then((links) => {
      if (!shouldValidate) {
        return resolve(links)
      }

      getStatus(links).then((respuesta) => {
        return resolve(respuesta)
      })
    })
    .catch((error) => {
      reject(error)
    })
})

module.exports = {
  mdLinks,
}








