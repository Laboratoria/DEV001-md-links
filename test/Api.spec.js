const Api = require('../Api.js');

//isPathAbsolute
describe('pathRelative', () => {
  it('Debe ser una función', () => {
    expect(typeof(Api.pathRelative)).toBe('function');
  });
  it('Deberia retornar true si es un path absoluto', () => {
    expect(Api.pathRelative('C:\\Users\\Laboratoria\\erika\\Md-links\\DEV001-md-links\\archivoPrueba\\prueba.md')).toBe(true);
  });
  it('Deberia retornar false si no es un path absoluto', () => {
    expect(Api.pathRelative('.\\prueba.md')).toBe(false);
  });
});

//Existe el path
describe('isPathValid', () => {
  it('Debe ser una función', () => {
    expect(typeof(Api.isPathValid)).toBe('function');
  });

  it('Deberia retornar true si el path existe', () => {
    expect(Api.isPathValid(__dirname)).toBeTruthy();
  });

  it('Deberia retornar false si el path no existe', () => {
    expect(Api.isPathValid(`${__dirname}ss`)).toBeFalsy();
  });
});

//Path Definitivo
describe('pathDefinitive: función que convierte el path relativo en path absoluto', () => {
    it('Deberia ser una función', () => {
      expect(typeof(Api.pathDefinitive)).toBe('function');
    });
    it('Deberia convertir un path relativo en absoluto', () => {
      expect(Api.pathDefinitive('./archivoPrueba')).toBe('C:/Users/Laboratoria/erika/Md-links/DEV001-md-links/archivoPrueba');
    });
    
  });

//Función que lee archivos
describe('readFiles', () => {
    it('Debe ser una función', () => {
      expect(typeof(Api.readFiles)).toBe('function');
    });
    it('Deberia devolver una promesa', () => {
        return Api.readFiles('C://Users//Laboratoria//erika//Md-links//DEV001-md-links//archivoPrueba').then(() => {
          expect(Api.readFiles).toBe(typeof Promise);
        }).catch(()=>{})});
  });

//Extensión Md
// describe('fileMd', () => {
//     it('Deberia ser una función', () => {
//       expect(typeof(Api.fileMd('./archivoPrueba/'))).toBe('function');
//     });
//     it('Debe retornar true si la función encuentra un archivo .md', () => {
//       expect(Api.fileMd('./archivoPrueba/prueba.md')).toBe(true);
//     });
//     it('Debe retornar false si la función no encuentra un archivo .md', () => {
//       expect(Api.fileMd('./archivoPrueba/index.js')).toBe(false);
//     });
//   });