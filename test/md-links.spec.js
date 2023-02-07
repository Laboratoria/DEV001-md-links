const { tipoRuta, rutaAbsoluta, extensionArchivo } = require('../functions.js');
const { mdLinks } = require('../index.js');
// import mdLinks from '../index.js';



describe('mdLinks', () => {

    it('should...', () => {
        console.log('FIX ME!');
    });

    it('Si el archivo no es .md dará un error', () => mdLinks('./prueba/ejemplo.html', { validate: false }).catch((error) => {
        expect(error('El archivo no es un archivo markdown'));
    }));

    // it('Cuando la ruta es absoluta, la función rutaAbsoluta no realiza ningún cambio', () => {
    //     rutaAbsoluta('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md');
    //     expect(rutaAbsoluta('D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md')).toEqual(
    //         'D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\Links\\ejemplo-1.md'
    //     );
    // });


    // it('debería dar error cuando el path no existe', () => {
    //     mdLinks('D:\\LABORATORIA\\ARCHIVOFALSO.PNG').catch((error) => {
    //         expect(error).toBe('el archivo no existe')
    //     })
    // })



});

describe('funciones individuales', () => {

    it('tipoRuta, debe indicar true si se le entrega una ruta absoluta', () => {
        tipoRuta('D:/LABORATORIA/MD-Links/DEV001-md-links/Links/ejemplo-1.md');
        expect(tipoRuta('D:/LABORATORIA/MD-Links/DEV001-md-links/Links/ejemplo-1.md')).toEqual(true);
    });

    it('tipoRuta, debe indicar false si se le entrega una ruta relativa', () => {
        tipoRuta('prueba/ejemplo.md');
        expect(tipoRuta('prueba/ejemplo.md')).toEqual(false);
    });

    it('Cuando la ruta es relativa, la función rutaAbsoluta la cambia a absoluta', () => {
        rutaAbsoluta('DEV001-md-links\\Links\\ejemplo-1.md');
        expect(rutaAbsoluta('DEV001-md-links\\Links\\ejemplo-1.md')).toEqual(
            'D:\\LABORATORIA\\MD-Links\\DEV001-md-links\\DEV001-md-links\\Links\\ejemplo-1.md',
        );
    });


    it('extensionArchivo devuelve la extensión del archivo después del "."', () => {
        extensionArchivo('./prueba/ejemplo.md');
        expect(extensionArchivo('./prueba/ejemplo.md')).toEqual('md');
    });


});