#!/usr/bin/env node
var parseArgs = require('minimist')

const run = async () => {
    const args = parseArgs(process.argv.slice(2), {
        string: 'splitBy',
        string: 'take',
        boolean: 'verbose',
        alias:  {
            s: 'splitBy',
            t: 'take',
            v: 'verbose'
        },
        default: { splitBy: ' ', take: '0', verbose: false }
    });
    const selector = {
        splitBy: args.splitBy,
        indexToTake: parseInt(args.take),
        verbose: args.verbose 
    }
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
        crlfDelay: 500
    });

    rl.on('line', function(input){
        const tokens = input.split(selector.splitBy);
        const result = tokens.find((v, index) => {
            if (index == selector.indexToTake){
                return v;
            }
        })
        if(selector.verbose) {
            console.log(tokens.map((v, i) => `[index: ${i}| value: ${v}]`).join());
        }
        if( result ){
            process.stdout.write(`${result}\n`)
        } 
    })
};

run();