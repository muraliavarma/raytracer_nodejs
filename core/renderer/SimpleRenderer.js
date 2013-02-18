var Point = require('../common/Point');
var Ray = require('../common/Ray');
var Vector = require('../common/Vector');
var Plane = require('../primitive/Plane');

exports.render = function(data, socket) {
	var cameraPos = new Point(data.camera.position);
	var cameraLook = new Vector(data.camera.look).normalize();
	var cameraUp = new Vector(data.camera.up).normalize();
	var cameraRight = cameraUp.cross(cameraLook).normalize();

	var aspectRatio = 1.0 * data.camera.imageWidth / data.camera.imageHeight;
	var cameraPlaneCenter = cameraPos.add(cameraLook.normalize().multiply(data.camera.zoom));
	var cameraPlane = new Plane(cameraPlaneCenter, cameraLook.multiply(-1));
	var primitive = new Plane(new Point(0, 0, 10), new Vector(0, -1, 1));
	for (var w = 0; w < data.camera.imageWidth; w++) {
		var x = aspectRatio * ((w / data.camera.imageWidth) - 0.5);
		for (var h = 0; h < data.camera.imageHeight; h++) {
			var y = (h / data.camera.imageHeight) - 0.5;
			var cameraPlaneIntersectionPoint = cameraPlaneCenter.add(cameraRight.multiply(x)).add(cameraUp.multiply(y));
			var ray = new Ray(cameraPos, cameraPos.vectorTo(cameraPlaneIntersectionPoint));
			var intersectionPoint = primitive.intersection(ray);
			// console.log (intersectionPoint.distanceToSquared(cameraPos));
			socket.emit('renderData', {
				x: w,
				y: h,
				r: intersectionPoint.distanceToSquared(cameraPos) | 0,
				g: 0,
				b: 0
			});
		}
	}
}