const { mdLinks } = require('../index.js');
const { fetch } =  require('../__mock__/fetch.js');



describe('mdLinks', () => {
    it('Debe ser una función', () => {
      expect(typeof mdLinks).toBe('function');
    })
    it('Deberia devolver una promesa', () => {
      return mdLinks('C:/Users/Laboratoria/erika/Md-links/DEV001-md-links/archivoPrueba/').then((route) => {
        expect(mdLinks(route)).toBe(typeof Promise);
      }).catch(()=>{})});
    it('Debe resolver cuando el path existe', () => {
      const path = 'C:/Users/Laboratoria/erika/Md-links/DEV001-md-links/archivoPrueba/';
      return mdLinks(path).then((route) => {
      expect(route).resolves(path)}).catch(() => {});
    });
    it('Debe rechazar cuando el path recibido no existe', () => {
      const path = 'Noexiste';
      return mdLinks(path).catch((error) => { 
      expect(error).toBe('El archivo no existe, si necesitas ayuda use el comando --help o --h');
    });
   });
   it('Debe rechazar cuando no se introduce un path', () => {
    const path = '';
    return mdLinks(path).catch((error) => { 
    expect(error).toBe('Ingrese la ruta del archivo o directorio');
  });
 });
//  it('{ validate: false } : Debe retornar href, text, file', () => {
//   const path = './archivoPrueba/segundoArchivoP/';
//       const fetch = [
//         {
//           href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
//           text: 'recurso',
//           file: 'C:/Users/Laboratoria/erika/Md-links/DEV001-md-links/archivoPrueba/segundoArchivoP/prueba2.md',
//         }
//       ]
//       expect(mdLinks(path, { validate: false })).resolves.toBe(fetch);
//   });


  });