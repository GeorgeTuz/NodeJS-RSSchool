const fs = require("fs");
const { program } = require('commander');
const readline = require('readline');
const { caesar } = require('./caesar');
program.version('0.0.1');

program
    .option('-s, --shift <number>', 'integer value')
    .option('-a, --action <string>', 'action encode/decode')
    .option('-i, --input <file>', 'input file')
    .option('-o, --output <file>', 'output file');

program.parse(process.argv);
const index = program.opts();

if (index.shift === undefined) {
    console.log('option shift is required');
} else if (isNaN(index.shift)) {
    console.log('option shift should be integer number');
} else if (index.action === undefined) {
    console.log('option action is required');
} else if (!(index.action === 'encode' || index.action === 'decode')) {
    console.log('option action should be "encode" or "decode"');
} else if (index.input === undefined) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function(line){
        if (index.output === undefined) {
            console.log(caesar(line, index.shift, index.action));
        } else {
            let readableStream = fs.createReadStream(index.output, "utf8");
            readableStream.on("data", function(str){
                let writeableStream = fs.createWriteStream(index.output);
                writeableStream.write(str + caesar(line, index.shift, index.action));
            });
        }
    });
} else {
    let readableStream = fs.createReadStream(index.input, "utf8");
    readableStream.on("data", function(chunk){
        if (index.output === undefined) {
            console.log(caesar(chunk, index.shift, index.action));
        } else {
            let readableStream = fs.createReadStream(index.output, "utf8");
            readableStream.on("data", function(str){
                let writeableStream = fs.createWriteStream(index.output);
                writeableStream.write(str + caesar(chunk, index.shift, index.action));
            });
        }
    });
}