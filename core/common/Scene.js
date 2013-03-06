var Point = require('../common/Point');
var Vector = require('../common/Vector');
var Plane = require('../primitive/Plane');

function Scene(data) {
	//camera
	this.camera = {};
	this.camera.cameraPos = new Point(data.camera.position);
	this.camera.cameraLook = new Vector(data.camera.look).normalize();
	this.camera.cameraUp = new Vector(data.camera.up).normalize();
	this.camera.cameraRight = this.camera.cameraUp.cross(this.camera.cameraLook).normalize();
	this.camera.aspectRatio = 1.0 * data.camera.imageWidth / data.camera.imageHeight;
	this.camera.cameraPlaneCenter = this.camera.cameraPos.add(this.camera.cameraLook.normalize().multiply(data.camera.near));
	this.camera.cameraPlane = new Plane(this.camera.cameraPlaneCenter, this.camera.cameraLook);
	this.camera.cameraVDist = 2 * Math.tan(data.camera.fov * Math.PI / 360) * data.camera.near;
	this.camera.cameraHDist = this.camera.cameraVDist * this.camera.aspectRatio;
	this.camera.imageWidth = data.camera.imageWidth;
	this.camera.imageHeight = data.camera.imageHeight;

}

module.exports = Scene;