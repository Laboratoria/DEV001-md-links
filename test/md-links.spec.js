

/*
const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  
  //it('debería devolver una promesa', () => {
  // expect(mdLinks()).toBe(typeof Promise);
  // });

  it('Debe rechazar cuando el path no existe', (done) => {
    mdLinks('/januhary/cursos/noexiste.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
      done();
    })
  });

  it('deberia devolver un arreglo vacio si el archivo no tiene links md', (done) => {
    mdLinks('filesExamples/no-links.md').then((resultado) => {
    expect(resultado).toStrictEqual([]);
      done();
    })
  })
  
  it('deberia devolver un arreglo con un link md', (done) => {
    mdLinks('filesExamples/with-links.md').then((resultado) => {
    expect(resultado.length).toBe(1);
      done();
    })
  })
});
