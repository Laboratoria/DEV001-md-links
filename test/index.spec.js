const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
    it('Debe ser una función', () => {
      expect(typeof mdLinks).toBe('function');
    })
    it('Deberia devolver una promesa', () => {
      return mdLinks('C://Users//Laboratoria//erika//Md-links//DEV001-md-links//archivoPrueba').then(() => {
        expect(mdLinks()).toBe(typeof Promise);
      }).catch(()=>{})});
    });
    it('Debe resolver cuando el path existe', () => {
      const path = 'C://Users//Laboratoria//erika//Md-links//DEV001-md-links//archivoPrueba';
      return mdLinks(path).then((route) => {
      expect(route).resolves(path)}).catch(() => {});
    });
    it('Debe rechazar cuando el path no existe', () => {
      const path = 'Noexiste';
      return mdLinks(path).catch((error) => { 
      expect(error).toBe('El archivo no existe');
    });
    });
