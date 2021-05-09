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
    process.stdout.write('option shift is required');
} else if (isNaN(index.shift)) {
    process.stdout.write('option shift should be integer number');
} else if (index.action === undefined) {
    process.stdout.write('option action is required');
} else if (!(index.action === 'encode' || index.action === 'decode')) {
    process.stdout.write('option action should be "encode" or "decode"');
} else if (index.input === undefined) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function(line){
        if (index.output === undefined) {
            process.stdout.write(caesar(line, index.shift, index.action) + '\n');
        } else {
            let writeableStream = fs.createWriteStream(index.output, {flags: 'a'});
            writeableStream.write(caesar(line, index.shift, index.action));
        }
    });
} else {
    let readableStream = fs.createReadStream(index.input, "utf8");
    readableStream.on("data", function(chunk){
        if (index.output === undefined) {
            process.stdout.write(caesar(chunk, index.shift, index.action) + '\n');
        } else {
            let writeableStream = fs.createWriteStream(index.output, {flags: 'a'});
            writeableStream.write(caesar(chunk, index.shift, index.action));
        }
    });
}