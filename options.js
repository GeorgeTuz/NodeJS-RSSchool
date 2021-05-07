const { program } = require('commander');
program.version('0.0.1');

program
    .option('-s, --shift <number>', 'integer value')
    .option('-a, --action <string>', 'action encode/decode')
    .option('-i, --input <file>', 'input file')
    .option('-o, --output <file>', 'output file');

program.parse(process.argv);
const options = program.opts();

if (options.shift === undefined) {
    console.log('option shift is required')
} else if (typeof options.shift !== 'number') {
    console.log('option shift should be integer number')
} else if (options.action === undefined) {
    console.log('option action is required')
} else if (!(options.action === 'encode' || options.action === 'decode')) {
    console.log('option action should be "encode" or "decode"')
} else {
    console.log('run app')
}


// if (options.action) console.log(`${options.action}`);
// if (options.input) console.log(`${options.input}`);
// if (options.output) console.log(`${options.output}`);