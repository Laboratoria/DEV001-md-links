// const {mdLinks} = require('./index.js')

// const path= process.argv[1];
// const options= process.argv;

// console.log(path)
// console.log(options)

// const cli = (path, options) => { 
//     // si es --validate ver los links con su ok o fail
//     if(options === { validate: true }){
//         console.log('entre a --validate')
//         return mdLinks(path, options) .then((path) => {
//             console.log(path)
//           }).catch((error) => {
//             console.log(error)
//           })
//         }
    
//     // si es --stats muestra estadisticas de los links ejem Total: 3Unique: 3
//     else if(options === --stats){
//         return   console.log('entre a --stats')
//     };

//     // si es --stats y validate ejem Total: 3 Unique: 3 Broken: 1

//     else if (options === --stats){
//         return   console.log('entre a --stats')
//     }

// }

// cli('./prueba', { validate: true })
// .then((path) => {
//   console.log(path)
// }).catch((error) => {
//   console.log(error)
// })