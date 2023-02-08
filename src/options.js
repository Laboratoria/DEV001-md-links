const axios = require('axios');


const getStatus = (linksArray) => {
    //se crea arreglo que contendrá las promesas
    const promisesArr = [];
    // se recorre con map el array de links
    promisesArr = linksArray.map((link) => axios.get(link.href))
    .then((response)=>{
        if(response.ok){
            return {
                ...link,
                status: response.status,
                message: 'ok'
            }
        }
    })
    .catch(() =>{
        return{
            ...link,
            status: 'NO FAIL',
            message: 'NOT FOUND'
        }
    })
    return Promise.all(promisesArr);
}
 getStatus(linksArray)
 .then((resolve) => 
 console.log(resolve));



    module.exports = {
getStatus
    }