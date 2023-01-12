const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
    it('Debe ser una función', () => {
      expect(typeof mdLinks).toBe('function');
    })
    it('Deberia devolver una promesa', () => {
      return mdLinks().then(() => {
        expect(mdLinks()).toBe(typeof Promise);
      }).catch(()=>{});
    });
    it('Debe resolver cuando el path existe', () => {
      const path = './README.md';
      return mdLinks(path).then((route) => {
      expect(route).resolves(path)}).catch(() => {});
    });
    it('Debe rechazar cuando el path no existe', () => {
      return mdLinks().catch((error) => { 
      expect(error).toBe('El archivo no existe');
    })
  }); 
});