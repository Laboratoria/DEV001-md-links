/* eslint-disable no-undef */
const { 
  getLinks,
  pathExist,
  getAbsolutePath,
  isFileMd,
  isDirectory,
  searchFilesMd,
  validateLinks
 } = require('../functions.js')
 const tryPathAbsolute = `${process.cwd()}`;
 const tryPathTest = [`${tryPathAbsolute}\\test\\pruebaTest.md`];
 const fetch = require('node-fetch');
 jest.mock('node-fetch');
 /* --------------------------------------------- testeo de functions -----------------------------------------------------*/

describe('pathExist', () => {
  it('Debería retornar true si el path existe', () => {
    pathExist(`${tryPathAbsolute}\\thumb.png`);
    expect(pathExist(`${tryPathAbsolute}\\thumb.png`)).toEqual(true);
  });
});
describe('getAbsolutePath', () => {
  it('Debería retornar la ruta absoluta al recibir una ruta relativa', () => {
    getAbsolutePath('./thumb.png');
    expect(getAbsolutePath('./thumb.png')).toEqual(`${tryPathAbsolute}\\thumb.png`);
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
describe('validateLinks', () => {
  it('Debería retornar un array de objetos con las propiedades de los links validados', async () => {
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
    await validateLinks(arrayLinksValidated).then((res) => {
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
  });
  it('Debería retornar un array de objetos con las propiedades de los links validados', async () => {
    const arrayLinksValidatedFail = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: `${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-mdlinks-para-prueba.md`,
        status: 404,
        OK: 'Fail'
      }
    ];
    fetch.mockImplementationOnce(() => 
    Promise.resolve({
      status: 404,
      OK: 'Fail'
    })
    );
    await validateLinks(arrayLinksValidatedFail).then((res) => {
      expect(res).toEqual([
        {
          href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
          text: 'Funciones — bloques de código reutilizables - MDN',
          file: `${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-mdlinks-para-prueba.md`,
          status: 404,
          OK: 'Fail'
        }
      ]);
    });
  });
  it('Debería retornar un array de objetos con las propiedades de los links validados', async () => {
    const arrayLinksValidatedFailCatch = [
      {
        href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
        text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
        file: `${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-mdlinks-para-prueba.md`,
        OK: 'Fail',
        status: 'fetch failed',
        message: 'Error: getaddrinfo ENOTFOUND community.laboratoria.la'
      }
    ];
    fetch.mockImplementationOnce(() => 
    Promise.resolve({
      OK: 'Fail',
      status: 'fetch failed',
      message: 'Error: getaddrinfo ENOTFOUND community.laboratoria.la'
    })
    );
    await validateLinks(arrayLinksValidatedFailCatch).catch(() => {
      expect(arrayLinksValidatedFailCatch).toEqual([
        {
          href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
          text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
          file: `${tryPathAbsolute}\\CarpetaDePrueba\\Prueba\\README-mdlinks-para-prueba.md`,
          OK: 'Fail',
          status: 'fetch failed',
          message: 'Error: getaddrinfo ENOTFOUND community.laboratoria.la'
        }
      ]);
    });
  });
});