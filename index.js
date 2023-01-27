/* eslint-disable no-loop-func */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// identificar si la ruta existe
const doesPathExist = (inputPath) => fs.existsSync(inputPath);

// identificar si la ruta es absoluta
const isPathAbsolute = (inputPath) => path.isAbsolute(inputPath);
// console.log(isPathAbsolute('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.md'));

// convertir la ruta relativa a absoluta
const turnIntoAbsolute = (inputPath) => (isPathAbsolute(inputPath) ? inputPath : path.resolve(inputPath));
// console.log(turnIntoAbsolute('prueba/prueba.md'));

// identificar si la ruta absoluta es un directorio
// const isItDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();
// console.log(isItDirectory('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si la ruta absoluta es un archivo
const isItFile = (inputPath) => fs.statSync(inputPath).isFile();
// console.log(isItFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si el archivo es .md
const isItMarkdown = (inputPath) => path.extname(inputPath) === '.md';
// console.log(isItMarkdown('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.txt'));

// leer el archivo md
const readFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');
// const leer = console.log(readFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'));

const findLinks = (content, inputPath) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  let arrayLinks = [...content.matchAll(regExp)]; // spread operator
  // console.log(arrayLinks)
  let arrayObjects = [];
  // console.log(arrayObjects)
  for (let i = 0; i < arrayLinks.length; i++) {
    arrayObjects.push({
      href: arrayLinks[i][2],
      text: arrayLinks[i][1],
      file: inputPath,
    });
  }
  return arrayObjects;
};

// console.log(findLinks(readFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'), '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'));
// console.log(prueba);
const linkValidation = (arr) => {
  let arrayPromises = [];

  for (let i = 0; i < arr.length; i++) {
    const object = arr[i];
    console.log(object);
    let links = axios.get(object.href)
      .then((res) => ({
        href: res.config.url,
        text: object.text,
        file: object.file,
        status: res.status,
        message: 'ok',
      }))
      .catch((error) => {
        if ('response' in error) {
          return {
            href: error.response.url,
            text: object.text,
            file: object.file,
            status: error.response.status,
            message: 'fail',
          };
        }
      });
    console.log(arrayPromises.push(links));
  }
  return console.log(arrayPromises);
};
// console.log(linkValidation(findLinks(readFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'), '/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md')));

/* ------------------------------- FUNCIÓN MDLINKS -------------------------------*/
const mdLinks = (inputPath, options = { validate: false }) => new Promise((resolve, reject) => {
  if (doesPathExist(inputPath)) { // identificar si la ruta existe
    console.log('The path exists');
    if (!isPathAbsolute(inputPath)) {
      console.log('The path is RELATIVE');
      const absolutePath = turnIntoAbsolute(inputPath);
      console.log(`The relative path was turned into absolute ${absolutePath}`);
      if (isItFile(inputPath)) {
        console.log('It is a file');
        if (isItMarkdown(inputPath)) { // si es un archivo y es md, extrae los links
          console.log('It is a markdown file');
          let content = readFile(inputPath);
          if (content !== '') {
            const arrayLinks = findLinks(content, inputPath); // si encuentra archivos md, crear un arreglo de mds
            // console.log(arrayLinks);
            if (options.validate === false) {
              resolve(arrayLinks);
            } else {
              let arrayPromise = linkValidation(arrayLinks);
              // console.log(arrayPromise);
              console.log(Promise.all(arrayPromise).then((resultado) => {
                resolve(resultado);
              }));
            }
          } else {
            reject(new Error('There IS NOT links in this file')); // si el arreglo es vacío, rechazamos la promesa diciendo que no hay archivos md
          }
        } else {
          reject(new Error('It IS NOT an .md file'));
        }
      } else {
        reject(new Error('It IS NOT a file'));
      }
    }
  } else {
    reject(new Error('The path DOES NOT exist')); // si no existe la ruta, se rechaza la promesa
  }

  // si es un directorio(?) y tiene archivos, extrae todos los archivos md y crea un arreglo de mds
});

module.exports = {
  doesPathExist,
  isPathAbsolute,
  turnIntoAbsolute,
  isItFile,
  isItMarkdown,
  readFile,
  findLinks,
  mdLinks,
};

// if (content !== '' && findLinks(content, inputPath).length !== 0)
