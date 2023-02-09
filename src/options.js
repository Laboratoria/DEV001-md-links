const axios = require('axios');


const getStatus = (links) => Promise.all(links.map((link) => axios.get(link.href)
    .then((respuesta) => {
       // console.log(respuesta.status);
        return { ...link, status: respuesta.status, ok: respuesta.statusTxt };
    })
    .catch((error) => ({ ...link, status: error.status, message: 'NOT FOUND' }))));



module.exports = { getStatus }