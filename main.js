var express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, path = require('path')
	, renderer = require('./core/renderer/Renderer');

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

server.listen(8080);

app.get('/', function (req, res) {
	res.sendfile(path.resolve('public', 'index.html'));
});

io.sockets.on('connection', function (socket) {
	socket.on('doRender', function (data) {
		socket.emit('startRender', {
			width: data.camera.imageWidth,
			height: data.camera.imageHeight
		});
		renderer.render(data, socket);
	});
});