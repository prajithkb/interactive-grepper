#!/usr/bin/env node
var parseArgs = require('minimist')

const run = async () => {
    const args = parseArgs(process.argv.slice(2), {
        string: 'splitBy',
        string: 'take',
        alias:  {
            s: 'splitBy',
            t: 'take'
        },
        default: { splitBy: ' ', take: '0' }
    });
    const selector = {
        splitBy: args.splitBy,
        indexToTake: parseInt(args.take)
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
        const result = input.split(selector.splitBy).find((v, index) => {
            if (index == selector.indexToTake){
                return v;
            }
        })
        if( result ){
            process.stdout.write(`${result}\n`)
        } 
    })
};

run();