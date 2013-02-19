var Point = require('../common/Point');
var Ray = require('../common/Ray');
var Vector = require('../common/Vector');
var Plane = require('../primitive/Plane');
var Rectangle = require('../primitive/Rectangle');
var PNG = require("pngjs").PNG;
var fs = require('fs');

exports.render = function(data, socket) {
	console.log(PNG);
	var cameraPos = new Point(data.camera.position);
	var cameraLook = new Vector(data.camera.look).normalize();
	var cameraUp = new Vector(data.camera.up).normalize();
	var cameraRight = cameraUp.cross(cameraLook).normalize();

	var aspectRatio = 1.0 * data.camera.imageWidth / data.camera.imageHeight;
	var cameraPlaneCenter = cameraPos.add(cameraLook.normalize().multiply(data.camera.zoom));
	var cameraPlane = new Plane(cameraPlaneCenter, cameraLook.multiply(-1));
	var png = new PNG({
		height: data.camera.imageHeight,
		width: data.camera.imageWidth
	});
	var fileName = "image_" + (new Date()).getTime();
	for (var w = 0; w < data.camera.imageWidth; w++) {
		var x = aspectRatio * ((w / data.camera.imageWidth) - 0.5);
		for (var h = 0; h < data.camera.imageHeight; h++) {
			var idx = (png.width * h + w) << 2;
			var y = (h / data.camera.imageHeight) - 0.5;
			var cameraPlaneIntersectionPoint = cameraPlaneCenter.add(cameraRight.multiply(x)).add(cameraUp.multiply(y));
			var ray = new Ray(cameraPos, cameraPos.vectorTo(cameraPlaneIntersectionPoint));
			for (var i = 0; i < data.primitives.length; i++) {
				var primitive = data.primitives[i];
				var obj;
				if (primitive.type == "rectangle") {
					obj = new Rectangle(
							new Point(primitive.center.x, primitive.center.y, primitive.center.z),
							new Vector(primitive.normal.x, primitive.normal.y, primitive.normal.z),
							new Vector(primitive.up.x, primitive.up.y, primitive.up.z),
							primitive.width,
							primitive.height
						);
				}
				else {
					continue;
				}
				var intersectionPoint = obj.intersection(ray);
				if (!intersectionPoint) {
					png.data[idx] = 0;
					png.data[idx+1] = 0;
					png.data[idx+2] = 0;
					png.data[idx+3] = 255;
				}
				else {
					png.data[idx] = 255;
					png.data[idx+1] = intersectionPoint.distanceToSquared(cameraPos) | 0;
					png.data[idx+2] = 255;
					png.data[idx+3] = 255;
				}
			}
		}
		var percent = (100.0 * w/data.camera.imageWidth) | 0;
		socket.emit('renderProgress', {
			percent: percent
		});
	}
	socket.emit('renderProgress', {
		percent: 100
	});

    var req = png.pack().pipe(fs.createWriteStream('public/images/' + fileName + '.png'));
    req.on('close', function() {
		socket.emit('renderComplete', {
			height: data.camera.imageWidth,
			width: data.camera.imageHeight,
			fileName: fileName
		});
    });

}