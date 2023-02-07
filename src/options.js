const axios = require('axios');


const linksArrayExamp = [
    {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\with-links.md'
    },

    {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\with-links.md'
    },

    {
        href: 'https://v8.dev/',
        text: 'V8',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\with-links.md'
    }
];

const promisesArrayExamp = [
    {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\with-links.md',
        status: 200,
        message: 'OK'
    },

    {

        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\with-links.md',
        status: 200,
        message: 'ok'
    },

    {
        href: 'https://noexistearchivo.nolinksmd',
        text: 'no existe archivo',
        file: 'C:\Users\Januhary Gonzalez\OneDrive\Desktop\MD-Links\DEV001-md-links\filesExamples\no-links.md',
        status: 'FAIL',
        message: 'NOT FOUND'
    }
]

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
 console.log(getStatus());



    module.exports = {
getStatus
    }