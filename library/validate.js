const fetch = require('node-fetch')

/**
 * @function  validateLinks
 * @param {toma un array de objetos y valida que funcionen}
 * @returns {un array de objetos con links validados con fetch, status: Código de respuesta HTTP y ok: Mensaje fail en caso de fallo u ok en caso de éxito.}
 */
const validateLinks = (arrOfLinks) => {
    const arrOfValidateLinks = arrOfLinks.map((link) => {
        return fetch(link.href).then((response) =>{
            return {
                href: link.href,
                text: link.text,
                file: link.file,
                status: response.status,
                isOk: response.status < 400 ? 'true':'false',
            }
        })
        .catch((err) => err)
  })
  return Promise.all(arrOfValidateLinks);
    };





  module.exports = {validateLinks}
