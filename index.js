// export default () => {
//   // ...
// }; Esto lo usaremos para exportar y poder realizar test

//Comprobar la extension del archivo y ver si es .md
// import fs from 'fs';
const { comprobarPath, extensionArchivo, rutaAbsoluta, tipoRuta, obtenerLinks, validarLink } = require('./functions.js');


const mdLinks = (archivo) => {
    return new Promise((resolve, reject) => {
        try {

            let examplePath = archivo

            if (!tipoRuta(examplePath)) {
                examplePath = rutaAbsoluta(examplePath)

            }

            const isRealFile = comprobarPath(examplePath)
            if (!isRealFile) {
                return reject(`El archivo no existe`)
            }

            const isMarkdownFile = extensionArchivo(examplePath)
            if (isMarkdownFile !== `md`) {
                return reject(`El archivo no es un archivo markdown`)
            }
            //AQUÍ VAN LAS FUNCIONES

            // obtenerLinks(examplePath).then(arreglodelinks => validarLinks(arreglodelinks).then(resolve)).catch(error => reject("porque obtenerlinks fallo"))


            obtenerLinks(examplePath)
                .then(linkRespuesta => {
                    // console.log(linkRespuesta, 'linkres')

                    const arrayPromesa = validarLink(linkRespuesta)

                    Promise.all(arrayPromesa)
                        .then(rest => {
                            rest
                            console.log(rest, 'prueba')
                            resolve(examplePath)
                        })
                        .catch()


                })




            // const infoLinks = obtenerLinks(examplePath)
            // {return resolve(route)}

            //si llegué aki, el archivo es un markdown
            //TODO: hacer muuuchas cosas
            //si está todo ok uso el resolve() me paso al then y al catch
        } catch (error) {
            // console.log(error)
            reject(error)
        }
    })

}

mdLinks(`Links\\ejemplo-1.md`).then((exito) => {
    // D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md
    console.log(exito);




}).catch((error) => {
    console.log(error)

})


// fs.readdir('./', (error, files) => {
//     if (error) {
//         throw error;
//     }
//     console.log(files)
// });

module.exports = { mdLinks };

// return new Promise((resolve, reject) => {
//     let examplePath = archivo
//     if (!tipoRuta(examplePath)) {
//         examplePath = rutaAbsoluta(examplePath)
//     }

//     comprobarPath(examplePath)
//         // if (!comprobarPath(archivo)) {
//         //     reject('La ruta del archivo no existe')
//         //         //Comprobar que la ruta del archivo existe
//         //         //Comprobar que el archivo sea MD, sino avisar que no lo es
//         //         //YA FUNCIONA
//         // }
//         // if (tipoRuta(archivo) != true) {
//         //     resolve(rutaAbsoluta(archivo))
//         // }
//         // if (extensionArchivo(archivo) != 'md') {
//         //     reject('Esto no es un archivo md')
//         //         //YA FUNCIONA
//         // }


// })