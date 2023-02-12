const { transformPathAbsolute,
  mdLinks } = require('../index.js');
const { getmdLinks,
  validateLinks } = require('../getmdlink.js');

describe('mdLinks', () => {

  it('deberia devolver una promesa', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('deberia rechazar la promesa', () => {
    return mdLinks('/laboratoria/noexisteestepack.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    });
  });
  it('deberia rechazar la promesa', () => {
    return mdLinks('C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/cli.js').catch((error) => {
      expect(error).toBe('.js');
    });
  });
  it('deberia resolver la promesa cuando validate es false', () => {
    const resultadoEsperado = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      }
    ]
    return mdLinks('C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md', { validate: false }).then((result) => {
      expect(result).toStrictEqual(resultadoEsperado);
    });
  });
  it('deberia resolver la promesa cuando validate es true', () => {
    const resultadoEsperado = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'

      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'
      }
    ]
    return mdLinks('C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md', { validate: true }).then((result) => {
      expect(result).toStrictEqual(resultadoEsperado);
    });
  });
});

describe('transformPathAbsolute', () => {
  it('debería ser una función', () => {
    expect(typeof transformPathAbsolute).toBe('function');
  });
  it('deberia convertir la ruta relativa a ruta absoluta', () => {
    const resultadoEsperado = 'C:\\Users\\Usuario\\Desktop\\Laboratoria\\DEV001-md-links\\index.js';
    const resultadoObtenido = transformPathAbsolute('./index.js');
    expect(resultadoObtenido).toBe(resultadoEsperado);
  });
});

describe('getmdLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof getmdLinks).toBe('function');
  });

  it('extra los links dentro de un documento md.', () => {
    const resultadoEsperado = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
      }
    ]
    const resultadoObtenido = getmdLinks('C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md')
    expect(resultadoObtenido).toStrictEqual(resultadoEsperado)
  });
})

describe('validateLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('extra los links dentro de un documento md.', () => {
    const resultadoEsperado = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'

      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md',
        status: 200,
        ok: 'OK'
      }
    ]
    const resultadoObtenido = validateLinks(
      [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
        },
        {
          href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          text: 'md-links',
          file: 'C:/Users/Usuario/Desktop/Laboratoria/DEV001-md-links/testReadme.md'
        }
      ]  
    ) 
    expect(resultadoObtenido).toStrictEqual(resultadoEsperado)
  });
})
