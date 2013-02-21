var socket = io.connect();
socket.on('startRender', function (data) {
	initRenderedImage(data);
});
socket.on('renderProgress', function (data) {
	updateRenderedImage(data);
});
socket.on('renderComplete', function(data) {
	finishRenderedImage(data);
})
