const { validateLinks } = require("../library/validate");
const { statLinks, statAndValidate } = require("../library/stats");
const fetch = require("node-fetch");
jest.mock("node-fetch");

const arrayLinkOk = [
  {
    href: "https://youtu.be/1rqSAC7UKt4",
    text: "tu castigo",
    file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
  },
];

const arrayLinkStatusFail = [
  {
    href: "https://youtu.be/1rqSAC7UKt4nono",
    text: "tu castigo",
    file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
  },
];

const arrayLinkValidadoStats = [
  {
    href: "https://youtu.be/1rqSAC7UKt4nono",
    text: "tu castigo",
    file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
    status: "200",
    isOk: "true",
  },
];

describe("validateLinks recibe un array de archivos md, los lee y retorna una promesa con los links", () => {
  it("validateLinks deberia retornar un array con un objeto del link validado con status ok", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
      })
    );
    await validateLinks(arrayLinkOk).then((res) => {
      expect(res).toEqual([
        {
          href: "https://youtu.be/1rqSAC7UKt4",
          text: "tu castigo",
          file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
          status: 200,
          isOk: "true",
        },
      ]);
    });
  });
  it("validateLinks deberia retornar un array con un objeto del link, este tendrá un status fail /link roto", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
      })
    );
    await validateLinks(arrayLinkStatusFail).then((res) => {
      expect(res).toEqual([
        {
          href: "https://youtu.be/1rqSAC7UKt4nono",
          text: "tu castigo",
          file: `${process.cwd()}/test/prueba/nuevo.md`.replace(/\\/g, "/"),
          status: 400,
          isOk: "false",
        },
      ]);
    });
  });
  
});

/* aqui probamos stats y validatestats */

describe("statLinks recibe un array links validados y retorna total de links y links únicos", () => {
  it("statLinks deberia retornar el total de links y cuantos hay unicos", () => {
expect(statLinks(arrayLinkValidadoStats)).toEqual({
  Total: 1,
    Unique: 1,
})
  });
});

describe("statAndValidate recibe un array links validados y retorna total de links, links únicos y total de links broken", () => {
  it("statAndValidate deberia retornar el total de links, cuantos hay unicos y cuantos rotos", () => {
expect(statAndValidate(arrayLinkValidadoStats)).toEqual({
  Total: 1,
    Unique: 1,
    Broken: 0
})
  });
});