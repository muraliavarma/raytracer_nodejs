var Point = require('../common/Point');
var Ray = require('../common/Ray');
var Vector = require('../common/Vector');
var Plane = require('../primitive/Plane');
var Rectangle = require('../primitive/Rectangle');
var Color = require('../image/Color');
var PNG = require("pngjs").PNG;
var fs = require('fs');

exports.render = function(data, socket) {
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
				var shape;
				if (primitive.type == "rectangle") {
					shape = new Rectangle(
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
				var intersectionPoint = shape.getIntersection(ray);
				if (!intersectionPoint) {
					png.data[idx] = 0;
					png.data[idx+1] = 0;
					png.data[idx+2] = 0;
					png.data[idx+3] = 255;
				}
				else {
					var color = _getColor(data.lights, primitive.material, intersectionPoint, shape.getNormal(intersectionPoint));
					png.data[idx] = color.r;
					png.data[idx+1] = color.g;
					png.data[idx+2] = color.b;
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

function _getColor(lights, material, point, normal) {
	var color = new Color(material.color.r, material.color.g, material.color.b);
	console.log(color.getColor());
	for (var i = 0; i < lights.length; i++) {
		var light = lights[i];
		var lightColor = new Color(light.color.r, light.color.g, light.color.b);
		if (light.type == 'point') {
			var lightVector = new Vector(light.position.x - point.x, light.position.y - point.y, light.position.z - point.z).normalize();
			var dot = normal.dot(lightVector);
			if (dot > 0) {
				color.add(color.multiply(lightColor).multiply(dot));
			}
		}
	}
	return color.getColor();
}
