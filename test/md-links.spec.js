const { mdLinks } = require('../index.js');
// import mdLinks from '../index.js';



describe('mdLinks', () => {

    it('should...', () => {
        console.log('FIX ME!');
    });
    it('debería dar error cuando el path no existe', () => {
        return mdLinks('D:\\LABORATORIA\\ARCHIVOFALSO.PNG').catch((error) => {
            expect(error).toBe('el archivo no existe')
        })
    })
});