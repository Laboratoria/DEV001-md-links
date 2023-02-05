#!/usr/bin/env node

const { mdLinks } = require("./mdLinks");
const { statLinks, statAndValidate } = require("./library/stats");
const { welcomeOfMd } = require("./library/intro");
const { colorOfText } = require("./library/paths");
const {log} =console

const opt = process.argv
const route = process.argv[2]
const validate = opt.includes('--validate')
const stat = opt.includes('--stats')
const help = opt.includes('--help')


const userCli = (route) =>{
if(!route){
  return welcomeOfMd()
}
if(help){
  return welcomeOfMd()
}
if(!route){
  new Error(log(colorOfText('MISSING PATH, ENTER THE PATH', 'red')))
}
else if(stat && validate){
  return mdLinks(route, {validate:true})
  .then((arrayOfLinks) => {
    if(arrayOfLinks.length <= 0){
     new Error(log(colorOfText('THIS FILE HAS NO LINKS TO SHOW, TRY ANOTHER PATH', 'red')));
    }
    const statsValidate = statAndValidate(arrayOfLinks)
    log(colorOfText(` LINKS:

  Total: ${statsValidate.Total},
  Unique: ${statsValidate.Unique},
  Broken: ${statsValidate.Broken}
    `, 'magenta'))
      })
      .catch((err) => log(err))
}
else if(validate){
  return mdLinks(route, {validate:true})
  .then((arrayOfLinks) => {
    if(arrayOfLinks.length <= 0){
      new Error(log(colorOfText('THIS FILE HAS NO LINKS TO SHOW, TRY ANOTHER PATH', 'red')));
    }
      arrayOfLinks.forEach((link) =>{
log(colorOfText(`
Route: ${link.file}\nLink:${link.href}\nText:${link.text}\nStatus:${link.status}\nIsOk?${link.isOk} `, 'blue'))
      })
      })
      .catch((err) => log(err))
}
else if(stat){
  return mdLinks(route, {validate:false})
  .then((arrayOfLinks) => {
    if(arrayOfLinks.length <= 0){
      new Error(log(colorOfText('THIS FILE HAS NO LINKS TO SHOW, TRY ANOTHER PATH', 'red')));
    }
    const stats = statLinks(arrayOfLinks)
    log(colorOfText(` LINKS:

  Total: ${stats.Total}
  Unique: ${stats.Unique}
    `, 'magenta'))
      })
      .catch((err) => log(err))
}
  if(!validate){
   return mdLinks(route, {validate:false})
  .then((arrayOfLinks) => {
    if(arrayOfLinks.length <= 0){
      new Error(log(colorOfText('THIS FILE HAS NO LINKS TO SHOW, TRY ANOTHER PATH', 'red')));
    }
      arrayOfLinks.forEach((link) =>{
log(colorOfText(`
Route: ${link.file}\nLink:${link.href}\nText:${link.text}`, 'blue'))
      })
      })
      .catch((err) => log(err))
  }

}

userCli(route)