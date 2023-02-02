const path = require('path');
const fs = require('fs');

const comprobarPath = (archivo) => {

    return fs.statSync(archivo.replace(/\\/g, "/"))
}

const extensionArchivo = (archivo) => {
    return archivo.split('.').pop()

}

const tipoRuta = (archivo) => {
    return path.isAbsolute(archivo)
}

const rutaAbsoluta = (archivo) => {
    return path.join(__dirname, archivo)
}

const lectorDatos = (archivo) => {
    console.log(fs.readFileSync(archivo, 'utf-8'));
}

// readingFiles es lectorDatos
const obtenerLinks = (archivo) => {
    return new Promise((resolve, reject) => {
        const links = [];
        lectorDatos(archivo).then((file) => {
                const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
                let match = regex.exec(file);
                while (match !== null) {
                    links.push({
                        href: match[2],
                        text: match[1],
                        file: archivo,
                    });
                    match = regex.exec(file);
                }
                resolve(links);
                console.log(links);
            })
            .catch((error) => reject(error));
    });
}

module.exports = {
    comprobarPath,
    extensionArchivo,
    tipoRuta,
    rutaAbsoluta,


};

obtenerLinks('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md')
    // comprobarPath('D:\\archivofalso')
    // extensionArchivo('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\thumb.png')
    // tipoRuta('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\README.md')
    // rutaAbsoluta(`DEV001-md-links\\README.md`)
    // lectorDatos('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\README.md')

// export const lectorDatos = (archivo) => {
//     fs.readFile(archivo, 'utf8', (error, datos))
//     if (error) { throw error };
//     console.log("El contenido es: ", datos);

// };

//Desintalar babel