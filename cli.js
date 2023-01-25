#!/usr/bin/env nodo
const { mdLinks } = require('./index.js');
const { colors } = require('colors');
const { totalLinks, uniqueLinks, brokenLinks } = require('./cliFunct.js');


const options = process.argv.slice(2);
const userPath = process.argv[2];
const validate = options.includes('--validate' && '--v');
const stats = options.includes('--stats' && '--s' );

if(options.length === 1) {
    mdLinks(userPath, { validate:false } )
    .then((promise)=>{
            console.log(`Bienvenid@ a Md-Links` .bgMagenta)
            console.log(promise.flat())
    })
    .catch((error) => {
        console.log(error .red .inverse);  
    });
}else {
    if(validate && stats){
    mdLinks(userPath, { validate: true})
    .then((promise)=>{
            console.log(`Bienvenid@ a Md-Links` .bgMagenta)
            console.log(totalLinks(promise) .cyan)
            console.log(uniqueLinks(promise) .magenta)
            console.log(brokenLinks(promise) .red)
    })
    .catch((error) => {
        console.log(error .red .inverse);
    });
    }else if (validate) {
        mdLinks(userPath, {validate:true})
        .then((resp) => {
            console.log(`Bienvenid@ a Md-Links` .bgMagenta)
            console.log(resp)  
        }).catch((error)=>console.log(error .red ))
    }else if (stats) {
        mdLinks(userPath, {validate:true})
        .then((resp) => {
            console.log(`Bienvenid@ a Md-Links` .bgMagenta)
            console.log(totalLinks(resp))
            console.log(uniqueLinks(resp))
        }).catch((error)=>console.log(error .red .inverse))
        
    }
}

