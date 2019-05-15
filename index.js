var EventEmitter = require("events").EventEmitter;
var OSinfo = require('./modules/OSinfo');

var fs = require('fs');
var colors = require('colors');
var StatMode = require('stat-mode');

fs.readFile('./index.js', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile('./index2.js', 'utf-8', (data, err) => {
  if (err) throw err;
  console.log('The file has been saved!'.green);
});

fs.stat('./cat.jpg', function(err, stats) {
    var statMode = new StatMode(stats);
    console.log(stats);
});

fs.readFile('./text.txt', 'utf-8', function(err, data) {
    console.log('Data before saving!'.blue);
    console.log(data);
    fs.appendFile('./text.txt', 'And tha is how they look after the record!', function(err) {
        if (err) throw err;
        console.log('Saved!'.blue);
        fs.readFile('./text.txt', 'utf-8', function(err, data) {
            console.log('Data after saving'.blue)
            console.log(data);
        });
    });
});


var emitter = new EventEmitter();
emitter.on("beforeCommand", function (instruction) {
    console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("afterCommand", function () {
    console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if(input !== null) {
    	var instruction = input.trim();
    	emitter.emit('beforeCommand', instruction);
        switch(instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            case '/getOSinfo':
    			OSinfo.print();
    			break;
            default:
                process.stderr.write('Wrong instruction!\n');
                process.stdout.write('\r\nNode Version: ' + process.versions.node + '\r\nYour language: ' + process.env.LANG);
        };
        emitter.emit('afterCommand');
    }
});

