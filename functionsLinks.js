const fs = require("fs");

// leer el archivo si es una extensión md
const readFile = (pathMd) => {
  const links = [];
  return new Promise((resolve, reject) => {
    fs.readFile(pathMd, "utf-8", function (error, data) {
      if (error) {
        reject("Ocurrio un Error");
      } else {
        const regex = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
        let match = regex.exec(data);
        while (match !== null) {
          links.push({
            href: match[2],
            text: match[1],
            file: pathMd,
          });
          match = regex.exec(data);
        }
        console.log("cada link en el archivo md", links);
        resolve(links);
      }
    });
  });
};

// función que itera el array de archivos
const readAllFilesMds = (arrayFilesMd) => {
  const arrLinks = arrayFilesMd.map((file) => readFile(file));
  return Promise.all(arrLinks).then((res) => res.flat());
};

module.exports = {
  readFile,
  readAllFilesMds
}