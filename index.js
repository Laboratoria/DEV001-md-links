/* eslint-disable prefer-const */
/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');

// identificar si la ruta existe
const doesPathExist = (inputPath) => fs.existsSync(inputPath);

// identificar si la ruta es absoluta
const isPathAbsolute = (inputPath) => path.isAbsolute(inputPath);
// console.log(isPathAbsolute('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.md'));

// convertir la ruta relativa a absoluta
const turnIntoAbsolute = (inputPath) => (isPathAbsolute(inputPath) ? inputPath : path.resolve(inputPath));
// console.log(turnIntoAbsolute('prueba/prueba.md'));

// identificar si la ruta absoluta es un directorio
const isItDirectory = (inputPath) => fs.statSync(inputPath).isDirectory();
// console.log(isItDirectory('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si el directorio tiene archivos dentro
const itHasFiles = (inputPath) => fs.readdirSync(inputPath);
// (error)) => {
// if (error) {
//   throw error('There is no files in this directory');
// }

// identificar si la ruta absoluta es un archivo
const isItFile = (inputPath) => fs.statSync(inputPath).isFile();
// console.log(isItFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba'));

// identificar si el archivo es .md
const isItMarkdown = (inputPath) => path.extname(inputPath) === '.md';
// console.log(isItMarkdown('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.txt'));

// leer el archivo md
const readFile = (inputPath) => fs.readFileSync(inputPath, 'utf8');
// console.log(readFile('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/EXTRA.md'));

let mdArray = [];

// const mdFiles = (inputPath) => {
//   if (isItFile(inputPath) && isItMarkdown(inputPath)) {
//     // extraer links en un array
//     const absolutePath = turnIntoAbsolute(inputPath);
//     absolutePath('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.md');
//     mdArray.push(absolutePath);
//     console.log(mdArray);
//     // console.log(absolutePath('/Users/carolinavelasquez/Desktop/Laboratoria/DEV001-md-links/prueba/prueba.md'));
//   }
//     // extraer archivos .md
//     // extraer links en un array
//   }

/* ------------------------------- FUNCIÓN MDLINKS -------------------------------*/
const mdLinks = (inputPath, options) => new Promise((resolve, reject) => {
  // identificar si la ruta existe
  // si no existe la ruta, se rechaza la promesa
  if (!doesPathExist(inputPath)) {
    reject(new Error('The path DOES NOT exist'));
  }

  // si es un archivo y es md, extrae los links
  if (isItFile(inputPath) && isItMarkdown(inputPath)) {
    const absolutePath = turnIntoAbsolute(inputPath);
    readFile(absolutePath);
    //     const absolutePath = turnIntoAbsolute(inputPath);
    mdArray.push(absolutePath);
    console.log(mdArray);
  } else if (isItDirectory(inputPath) && itHasFiles(inputPath)) {
    // si es un directorio y tiene archivos, extrae todos los archivos md y crea un arreglo de mds

  }

  // si encuentra archivos md, crear un arreglo de mds
  // si el arreglo es vacío, rechazamos la promesa diciendo que no hay archivos md
});

module.exports = {
  mdLinks,
};
