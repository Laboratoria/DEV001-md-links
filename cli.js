#!/usr/bin/env nodo
const { mdLinks } = require('./index.js');
const colors = require('colors');


const options = process.argv.slice(2);
const userPath = process.argv[2];
const validate = options.includes('--validate' && '--v');
const stats = options.includes('--stats' && '--s' );
const help = options.includes('--help' && '--h' );

if(options.length === 1) {
    mdLinks(userPath, { validate:false } )
    .then((promise)=>{
            console.log(`Bienvenid@ a Md-Links` .bgMagenta)
            console.log(promise.flat())
    })
    .catch((error) => {
        console.log(error .underline .red .inverse);  
    });
}else {
    if(validate && stats){
        mdLinks(userPath, { validate: true})
    .then((promise)=>{
            console.log(promise)
    })
    .catch((error) => {
        console.log(error .underline.red .inverse);  
    });
    }
}

