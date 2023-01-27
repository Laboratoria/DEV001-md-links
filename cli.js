#!/usr/bin/env node

// const { chalk } = require('chalk');
const { mdLinks } = require('./index.js');

// console.log(chalk.blue('hello world'));
const args = process.argv;
const path = process.argv[2];
const config = process.argv.slice(2);
const stats = config.includes('--stats');
const isValidate = config.includes('--validate');
// console.log(args);
// console.log(path);
// console.log(config);

if (path === undefined) {
  console.log('Fail, enter a path');
} else {
  mdLinks(path, { validate: isValidate }).then(() => {

  }).catch((error) => { console.log(error); });
}
