const axios = require('axios');


const getStatus = (links) => Promise.all(links.map((link) => axios.get(link.href)
    .then((respuesta) => {
       console.log(respuesta.status);
        return { ...link, status: respuesta.status, ok: respuesta.statusText };
    })
    .catch((error) => ({ ...link, status:'FAIL' , message: 'NOT FOUND' }))));



module.exports = { getStatus }