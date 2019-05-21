var fs = require('fs');
var StatMode = require('stat-mode');


fs.readFile('./index.html', 'utf-8', function(err, data) {
    console.log('Data before saving!'.blue);
    console.log(data);

    var http = require('http');

    var server = http.createServer();

    server.on('request', function (request, response) {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        if (request.method === 'GET' && request.url === '/hello') {
            response.write(data);
                response.end();
        } else {
                response.statusCode = 404;
                response.write('<h1>404: Zła ścieżka!</h1>');
                response.end();
        }
    });

    server.listen(8080);

    fs.appendFile('./index.html', 'And tha is how they look after the record!', function(err) {
        if (err) throw err;
        console.log('Saved!'.blue);
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            console.log('Data after saving'.blue)
            console.log(data);
        });
    });
});