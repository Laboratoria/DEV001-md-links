/* eslint-disable no-undef */
const { 
  getLinks,
  pathExist,
  getAbsolutePath,
  isFileMd,
  isDirectory,
  searchFilesMd
 } = require('../functions.js')
const { mdLinks } = require('../index.js');
const tryPathAbsolute = `${process.cwd()}`;
const tryPathTest = [`${tryPathAbsolute}\\test\\pruebaTest.md`];
const fetch = require('node-fetch');
jest.mock('node-fetch');

describe('mdLinks', () => {
  it('Debería devolver una promesa', () => {
    mdLinks('./test/pruebaTest.md', true).then(() => {
      expect(mdLinks('./test/pruebaTest.md', true)).toBe(typeof Promise);
    });
  });
  it('Debería rechazar la promesa si el path no existe', () => {
    mdLinks('./estepathnoexiste.md').catch((error) => {
    expect(error).toBe('Esta ruta no existe: ./estepathnoexiste.md');
  })});
  it('Debería retornar true si el path existe', () => {
    mdLinks(`${tryPathAbsolute}\\test`);
    expect(pathExist(`${tryPathAbsolute}\\test`)).toEqual(true);
  });
  it('Debería devolver una promesa', async () => {
    mdLinks('./test/pruebaTest.md', true).then(async () => {
      const arrayLinksValidated = [
        {
          href: 'https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/',
          text: 'Diferencia entre createElement e innerHTML',
          file: `${tryPathAbsolute}\\test\\pruebaTest.md`,
          status: 200,
          OK: 'OK'
        },
        {
          href: 'https://www.todojs.com/tipos-datos-javascript-es6/',
          text: 'Diferencia entre datos atómicos y estructurados',
          file: `${tryPathAbsolute}\\test\\pruebaTest.md`,
          status: 200,
          OK: 'OK'
        }
      ];
      fetch.mockImplementationOnce(() => 
      Promise.resolve({
        status: 200,
        OK: 'OK'
      })
      );
      return await validateLinks(arrayLinksValidated).then((res) => {
        expect(res).toEqual([
          {
            href: 'https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/',
            text: 'Diferencia entre createElement e innerHTML',
            file: `${tryPathAbsolute}\\test\\pruebaTest.md`,
            status: 200,
            OK: 'OK'
          },
          {
            href: 'https://www.todojs.com/tipos-datos-javascript-es6/',
            text: 'Diferencia entre datos atómicos y estructurados',
            file: `${tryPathAbsolute}\\test\\pruebaTest.md`,
            status: 200,
            OK: 'OK'
          }
        ]);
      });
      expect(mdLinks('./test/pruebaTest.md', true)).toEqual();
    });
  });
  it('Debería rechazar la promesa si el path no es ni un directorio ni un archivo md', () => {
    mdLinks('./thumb.png').catch((error) => {
    expect(error).toBe(`Esta ruta no es una carpeta ni un archivo md: ${tryPathAbsolute}\\thumb.png`);
  })});
  it('Debería rechazar la promesa si el directorio no contiene archivos md', () => {
    mdLinks('./images').catch((error) => {
    expect(error).toBe(`Esta ruta no contiene archivos md: ${tryPathAbsolute}\\images`);
  })});
  it('Debería rechazar la promesa si el archivo md no contiene links', () => {
    mdLinks('./CarpetaDePrueba/Prueba/README-ghibli-data-lovers.md').catch((error) => {
    expect(error).toBe(`No se encontraron links en el archivo con ruta: ${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-ghibli-data-lovers.md`);
  })});
});

/* --------------------------------------------- testeo de functions -----------------------------------------------------*/
describe('should...', () => {
  it('Debería retornar una ruta absoluta si la ruta ingresada es relativa', () => {
    mdLinks('./test');
    expect(getAbsolutePath('./test')).toEqual(`${tryPathAbsolute}\\test`);
  });
});
describe('isFileMd', () => {
  it('Debería retornar true si el path pertenece a un archivo md', () => {
    isFileMd(`${tryPathAbsolute}\\README.md`);
    expect(isFileMd(`${tryPathAbsolute}\\README.md`)).toEqual(true);
  });
});
describe('isDirectory', () => {
  it('Debería retornar true si el path pertenece a una carpeta/directorio', () => {
    isDirectory(`${tryPathAbsolute}\\test`);
    expect(isDirectory(`${tryPathAbsolute}\\test`)).toEqual(true);
  });
});
describe('searchFilesMd', () => {
  it('Debería retornar un array con los archivos md encontrados dentro de la carpeta de forma recursiva', () => {
    const arrayFiles = [
      `${tryPathAbsolute}\\test\\carpetaParaTest\\pruebaDeRecursividad\\pruebaRecursiva.md`,
      `${tryPathAbsolute}\\test\\pruebaTest.md`
    ];
    searchFilesMd(`${tryPathAbsolute}\\test`);
    expect(searchFilesMd(`${tryPathAbsolute}\\test`)).toEqual(arrayFiles);
  });
});
describe('getLinks', () => {
  it('Debería retornar un array con los links encontrados', () => {
    const linksForTest = [
      {
        href: 'https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/',
        text: 'Diferencia entre createElement e innerHTML',
        file: `${tryPathAbsolute}\\test\\pruebaTest.md`
      },
      {
        href: 'https://www.todojs.com/tipos-datos-javascript-es6/',
        text: 'Diferencia entre datos atómicos y estructurados',
        file: `${tryPathAbsolute}\\test\\pruebaTest.md`
      }
    ];
    return getLinks([tryPathTest]).then((res) => {
      expect(res).toEqual(linksForTest);
    });
  });
  it('Debería rechazar la promesa si ocurre algun error', () => {
    return getLinks('./CarpetaDePrueba/Prueba/README-ghibli-data-lovers.md').catch((error) => {
    expect(error).toBe(error);
  })});
});
