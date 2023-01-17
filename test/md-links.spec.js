const mdLinks = require('../index.js');



describe('mdLinks', () => {

  it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
   it('Deberia rechazar cuando el path no existe', () => {
    return mdLinks('/mayito/documento/noexiste.md').catch((error) => {
      expect(error).toBe('la ruta no existe')
    })
    }); 
  });



