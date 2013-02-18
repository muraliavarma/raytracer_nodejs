var Point = require('../common/Point');
var Ray = require('../common/Ray');
var Vector = require('../common/Vector');
var Plane = require('../primitive/Plane');

exports.render = function(data, socket) {
	var ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
	var plane = new Plane(new Point(0, 100, 10), new Vector(0, 1, -1));
	console.log(plane.intersection(ray));
	for (var w = 0; w < data.width; w++) {
		for (var h = 0; h < data.height; h++) {
			// socket.emit('renderData', {
			// 	x: w,
			// 	y: h,
			// 	r: parseInt(Math.random() * 255),
			// 	g: parseInt(Math.random() * 255),
			// 	b: parseInt(Math.random() * 255)
			// });
		}
	}
}