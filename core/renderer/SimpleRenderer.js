var Point = require('../common/Point');
var Ray = require('../common/Ray');
var Vector = require('../common/Vector');

var Plane = require('../primitive/Plane');
var Rectangle = require('../primitive/Rectangle');
var Sphere = require('../primitive/Sphere');

var Scene = require('../common/Scene');

var Color = require('../image/Color');
var PNG = require("pngjs").PNG;
var fs = require('fs');

exports.render = function(data, socket) {

	//populate all camera, lights and primitive information into scene object
	var scene = new Scene(data);

	var png = new PNG({
		height: data.camera.imageHeight,
		width: data.camera.imageWidth
	});
	var fileName = "image_" + (new Date()).getTime();

	for (var w = 0; w < scene.camera.imageWidth; w++) {
		var x = scene.camera.cameraHDist * (((png.width - w) / scene.camera.imageWidth) - 0.5);
		for (var h = 0; h < data.camera.imageHeight; h++) {
			var idx = (png.width * (png.height - h) + w) << 2;
			png.data[idx] = 0;
			png.data[idx+1] = 0;
			png.data[idx+2] = 0;
			png.data[idx+3] = 255;

			var y = scene.camera.cameraVDist * ((h / scene.camera.imageHeight) - 0.5);
			var cameraPlaneIntersectionPoint = scene.camera.cameraPlaneCenter.add(scene.camera.cameraRight.multiply(x)).add(scene.camera.cameraUp.multiply(y));
			var ray = new Ray(scene.camera.cameraPos, scene.camera.cameraPos.vectorTo(cameraPlaneIntersectionPoint));

			var closestIntersection = scene.getClosestIntersection(ray);
			if (!closestIntersection || !closestIntersection.primitive) {
				continue;
			}

			var primitive = closestIntersection.primitive;

			var color = primitive.material.getColor(scene.lights, closestIntersection.point, primitive.getNormal(closestIntersection.point));
			//_getColor(data.lights, primitive.material, closestIntersection.point, primitive.getNormal(closestIntersection.point));
			png.data[idx] = color.r;
			png.data[idx+1] = color.g;
			png.data[idx+2] = color.b;
			png.data[idx+3] = 255;
		}

		var percent = (100.0 * w/scene.camera.imageWidth) | 0;
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
			height: data.camera.imageHeight,
			width: data.camera.imageWidth,
			fileName: fileName
		});
    });
}