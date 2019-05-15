var os = require('os');
var ShapeTime = require('./ShapeTime');
var colors = require('colors');

function getOSinfo() {
    var type = os.type();
    if(type === 'Darwin') {
        type = 'OSX';
    } else if(type === 'Windows_NT') {
        type = 'Windows';
    }
    var release = os.release();
    var cpu = os.cpus()[0].model;
    var uptime = os.uptime();
    var userInfo = os.userInfo();
    console.log('System:'.gray, type);
    console.log('Release:'.red, release);
    console.log('CPU model:'.blue, cpu);
    console.log('Uptime: ~'.green, ShapeTime.print(uptime)); 
    console.log('User name:'.yellow, userInfo.username);
    console.log('Home dir:'.grey, userInfo.homedir);
}

exports.print = getOSinfo;    