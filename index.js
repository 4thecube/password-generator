#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const savePassword = require('./utils/savePassword')
const createPassword = require('./utils/createPassword')
const log = console.log;

program.version('1.0.0').description('----------------------------\nConsole Password Generator\n----------------------------');

program
    .option('-l, --length <number>', 'length of password', '8')
    .option('-s, --save', 'save password to passwords.txt')
    .option('-nn, --no-numbers', 'remove numbers')
    .option('-ns, --no-symbols', 'remove symbols')
    .parse();

const {length, save, numbers, symbols} = program.opts();

const generatedPassword = createPassword(length, numbers, symbols);

if(save) {
    savePassword(generatedPassword)
}

clipboardy.writeSync(generatedPassword);

try {
    log(chalk.green("-------------------------------------------"))
    log(chalk.bgYellow('Password has been successfuly generated\n'))
    log(chalk.bold.yellowBright('              ' + generatedPassword + '              \n'))
    log(chalk.bgGreen('Copied!') + chalk.yellow(' Password copied to clipboard'))
    log(chalk.green("-------------------------------------------"))
} catch (error) {
    log(chalk.bgRed('Ooops...something went wrong, try again or use flag -h for help'))
}