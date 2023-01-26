#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const  colors = require('colors');
const emoji = require('node-emoji');
const { Welcome, Error } = require('./message.js');
const { totalLinks, uniqueLinks, brokenLinks } = require('./cliFunct.js');


const options = process.argv.slice(2);
const userPath = process.argv[2];
const validate = options.includes('--validate') || options.includes('--v');
const stats = options.includes('--stats') || options.includes('--s');

if(options.length === 1) {
    mdLinks(userPath, { validate:false } )
    .then((promise)=>{
        Welcome();
        console.log(promise.flat())
    })
    .catch((error) => {
        Error(error);
    });
}else {
    if(validate && stats){
    mdLinks(userPath, { validate: true})
    .then((promise)=>{
            Welcome();
            console.log(totalLinks(promise) .cyan)
            console.log(uniqueLinks(promise) .magenta)
            console.log(brokenLinks(promise) .red)
    })
    .catch((error) => {
        Error(error);
    });
    }else if (validate) {
        mdLinks(userPath, {validate:true})
        .then((resp) => {
            Welcome();
            console.log(resp.flat())  
        }).catch((error)=>{
            Error(error);
        })
    }else if (stats) {
        mdLinks(userPath, {validate:true})
        .then((resp) => {
            Welcome();
            console.log(totalLinks(resp) .cyan)
            console.log(uniqueLinks(resp) .magenta)
        }).catch((error)=> { 
            Error(error);
        })
    };
}

