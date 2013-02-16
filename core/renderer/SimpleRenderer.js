exports.render = function(data, socket) {
	for (var w = 0; w < data.width; w++) {
		for (var h = 0; h < data.height; h++) {
			socket.emit('renderData', {
				x: w,
				y: h,
				r: parseInt(Math.random() * 255),
				g: parseInt(Math.random() * 255),
				b: parseInt(Math.random() * 255)
			});
		}
	}
}