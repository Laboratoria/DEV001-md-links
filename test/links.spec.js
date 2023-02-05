const { 
  pathconvertToAbs,
  saveFilesInArray,
  filterTheMdLinks,
  isFile,
  } = require('../library/paths');

  const { 
    readFileAndSearchLinks, filterLinks,
    } = require('../library/links');

/* test de absolute y relative*/

const resultArrayOfOneLink =  [
  `${process.cwd()}\\test\\prueba\\nuevo.md`,
]

const resultArrayOfLinks =  [
  `${process.cwd()}\\test\\prueba\\archivoparaTest.js`,
  `${process.cwd()}\\test\\prueba\\nuevo.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\pruebadentro.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\tercerDirectorio\\archivoEnTercerDirectorio.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\testvacio.js`,
  `${process.cwd()}\\test\\prueba\\text.md`,
]

const resultArrayOfMd =  [
  `${process.cwd()}\\test\\prueba\\nuevo.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\pruebadentro.md`,
  `${process.cwd()}\\test\\prueba\\prueba2\\tercerDirectorio\\archivoEnTercerDirectorio.md`,
  `${process.cwd()}\\test\\prueba\\text.md`,
]

const rutaAbsoluta = `${process.cwd()}\\test\\prueba\\nuevo.md`;
const RouteForTestFilterMd= `${process.cwd()}\\test\\prueba`;
const rutaRelativa = 'test/prueba/nuevo.md';


/* Test de funcion convierte ruta relativa a absoluta */
describe('pathconvertToAbs es una funcion que convierte una ruta a absoluta', () => {
  it('pathconvertToAbs es una funcion', () => {
    expect(typeof pathconvertToAbs).toBe('function');
  });

  it('devuelve ruta relativa convertida a absoluta', () => {
      expect(pathconvertToAbs(rutaRelativa)).toEqual(rutaAbsoluta)
  });
});


/* Test de funcion que comprueba sea archivo */
describe('isFile es una funcion que verifica si el link recibido es de un file, retorna boolean', () => {
  it('isFile es una funcion', () => {
    expect(typeof isFile).toBe('function');
  });
  it('isFile retorna true al recibir un archivo', () => {
    expect(isFile(rutaAbsoluta)).toBe(true);
  });
});

/* Test de funcion que obtiene array de links de archivos*/
describe('saveFilesInArray es una funcion que revisa si el path que se le pasa es un file o un directorio, en caso de ser file lo sube a un array, en los directorios los recorre y encuentra los archivos subiendolos al mismo array', () => {
  it('saveFilesInArray es una funcion', () => {
    expect(typeof saveFilesInArray).toBe('function');
  });
  it('saveFilesInArray deberia retornar un array con un link si se le paso un file', () => {
    expect(saveFilesInArray(`${process.cwd()}\\test\\prueba\\nuevo.md`)).toEqual(resultArrayOfOneLink);
  });
  it('saveFilesInArray deberia retornar un array con links si se le paso directorio', () => {
    expect(saveFilesInArray(`${process.cwd()}\\test\\prueba`)).toEqual(resultArrayOfLinks);
  });
});

/* Test de funcion que obtiene array de archivos .md*/
describe('filterTheMdLinks recibe un path y filtra los links hasta devolver un array de links a archivos md encontrados', () => {
  it('filterTheMdLinks es una funcion', () => {
    expect(typeof saveFilesInArray).toBe('function');
  });
  it('filterTheMdLinks deberia retornar un array con links a archivos md', () => {
    expect(saveFilesInArray(`${process.cwd()}\\test\\prueba\\nuevo.md`)).toEqual(resultArrayOfOneLink);
  });
  it('filterTheMdLinks deberia retornar un array con links a archivos .md', () => {
    expect(filterTheMdLinks(RouteForTestFilterMd)).toEqual(resultArrayOfMd);
  });
});

// aqui empezamos test de link 

/* Test de funcion que obtiene array de archivos .md*/
describe('readFileAndSearchLinks recibe un array de archivos md, los lee y retorna una promesa con los links', () => {
  it('readFileAndSearchLinks retorna una promesa', () => {
    expect(readFileAndSearchLinks(resultArrayOfMd)).toBeInstanceOf(Promise);
  });
  it('readFileAndSearchLinks deberia retornar un array de objetos con links', () => {
    const routeMdFile= [`${process.cwd()}\\test\\prueba\\nuevo.md`,]
    const resultArrOfLinks = [{
      href: 'https://youtu.be/1rqSAC7UKt4',
      text: 'tu castigo',
      file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/")
    }]

   return readFileAndSearchLinks(routeMdFile).then((response) => {
    expect(response).toEqual(resultArrOfLinks)
})
  });
  it('readFileAndSearchLinks deberia retornar promesa rechazada con un file no válido', () => {
    const wrongRouteMdFile= [`muevo.md`,]
    return readFileAndSearchLinks(wrongRouteMdFile).catch((e) => {
      expect(e).toBeInstanceOf(Error)})
  });
});