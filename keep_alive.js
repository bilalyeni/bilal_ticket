var http = require('http');

http.createServer(function (req, res) {
    res.write("Mauro Icardi");
    res.end();
}).listen(8080);
