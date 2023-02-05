const figlet = require('figlet');
const { colorOfText } = require("./paths");
const { log } = console;
const chalk = require('chalk');


const welcomeLogo = () => {
    log(chalk.magenta(figlet.textSync('\nMD-LINKS', { font: 'Doom', horizontalLayout: 'full' })));
    log(`❤️ \ ❤️ \ 😍 \::::: ¡¡¡¡ WELCOME TO MD-LINKS !!!! ::::::\ 😍 \❤️ \ ❤️\n`);
   }

const welcomeOfMd = () => {
    welcomeLogo();
    log(chalk.magentaBright.bold('\n ::::::::::::::::::::::::::::::::::::::::::::::::\n'));
    log(chalk.bgBlackBright('Here you will find instructions for using md-Links: \n'));
    log(colorOfText('1. Enter the command md-links followed by the path to the file or directory you want\n (it can be a relative path like: directory/example.md ), a list will appear with each link found. \n', 'blue'));
    log(colorOfText('2. To find out how many links there are and how many are unique, add the --stats option after the path to the file or directory. \n', 'magenta'));
    log(colorOfText('3. To find out how many valid links exist, enter after the path to the file or directory the option: --validate. \n', 'blue'));
    log(colorOfText('4. If you want to know the statistics of the links and how many are broken, add after \n the path to the file or directory the two options, one followed by the other "--stats and --validate".\n', 'magenta'));
    log(colorOfText('5. If you have any questions and need to know the commands again, write "md-Links --help"', 'blue'));
  };
  


module.exports = { welcomeOfMd}