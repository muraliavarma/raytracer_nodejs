var socket = io.connect('http://localhost:8080');
socket.on('startRender', function (data) {
	initRenderedImage(data);
});
socket.on('renderData', function (data) {
	updateRenderedImage(data);
});
socket.on('renderComplete', function() {
	finishRenderedImage();
})
