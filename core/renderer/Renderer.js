var simpleRenderer = require('./SimpleRenderer');

exports.render = function(data, socket) {
	//conditionally choose which renderer to use based on some parameter
	simpleRenderer.render(data, socket);
	socket.emit('renderComplete');
}