var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path');

app.configure(function() {
	// app.use('/js', express.static(__dirname + '/public/js'));
	app.use(express.static(__dirname + '/public'));
});

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(path.resolve('public', 'index.html'));
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'jaajaaajaaa :D' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});