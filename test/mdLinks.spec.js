const { mdLinks } = require("../mdLinks");
const fetch = require("node-fetch");
jest.mock("node-fetch");

const validate = true;
const rutaRelativa = "test/prueba/nuevo.md";
const rutaAbsoluta = `${process.cwd()}\\test\\prueba\\nuevo.md`;

/* Test de funcion que obtiene array de archivos .md*/
describe("mdLinks", () => {
  it("mdLinks retorna una promesa", () => {
    expect(mdLinks(rutaRelativa, validate)).toBeInstanceOf(Promise);
  });
  it("si validate es false debe retornar un array con objetos de cada link", async () => {
    const arrResponse = [
        {
            href: 'https://youtu.be/1rqSAC7UKt4',
          text: 'tu castigo',
          file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/")
        }
    ]
    await mdLinks(rutaRelativa, {validate:false}).then(response => expect(response).toStrictEqual(arrResponse))
  });

  it("si validate es true debe retornar un array con objetos de cada link con links validados mediante fetch", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
      }));

    const arrResponseValidate = [
        {
            href: 'https://youtu.be/1rqSAC7UKt4',
          text: 'tu castigo',
          file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
          status: 200,
          isOk: 'true'
        }
    ]
    await mdLinks(rutaAbsoluta, {validate:true}).then(response => expect(response).toStrictEqual(arrResponseValidate))
  });

  it("si la ruta marcada no tiene archivos .md rechaza la promesa", async () => {
    const rutaSinMd = 'library';
    await mdLinks(rutaSinMd, {validate:false}).catch(err => expect(err).toBe('THERE ARE NO ".MD" FILES, TRY ENTERING ANOTHER PATH MARKDOWN'))
  });

  it("si la ruta marcada NO EXISTE, se rechaza la promesa", async () => {
    const rutaSinMd = 'estoNoExiste';
    await mdLinks(rutaSinMd, {validate:false}).catch(err => expect(err).toBe('THE ROUTE DOES NOT EXIST, TRY WITH ANOTHER PATH'))
  });

});
