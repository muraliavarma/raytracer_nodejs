var Point = require('../common/Point');
var Vector = require('../common/Vector');
var Ray = require('../common/Ray');

var Plane = require('../primitive/Plane');
var Rectangle = require('../primitive/Rectangle');
var Sphere = require('../primitive/Sphere');

var PointLight = require('../light/PointLight');

var PhongShader = require('../shader/PhongShader');

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

	//primitives
	this.primitives = [];
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
		else if (primitive.type == "sphere") {
			shape = new Sphere(primitive.center.x, primitive.center.y, primitive.center.z, primitive.radius);
		}
		if (!primitive.material || !primitive.material.shader) {
			shape.material = new PhongShader(null);
		}
		else if (primitive.material.shader == 'phong') {
			shape.material = new PhongShader(primitive.material);
		}
		this.primitives.push(shape);
	}

	//lights
	this.lights = [];
	for (i = 0; i < data.lights.length; i++) {
		var light = data.lights[i];
		if (light.type == 'point') {
			this.lights.push(new PointLight(light));
		}
	}
}

Scene.prototype.getClosestIntersection = function(ray) {
	var closestIntersection = {
		primitive: null,
		distSq: 1000000,
		point: null
	};

	for (var i = 0; i < this.primitives.length; i++) {
		var primitive = this.primitives[i];
		var intersectionPoint = primitive.getIntersection(ray);
		if (intersectionPoint) {
			var distSq = intersectionPoint.distanceToSquared(ray.origin);
			if (distSq < closestIntersection.distSq) {
				closestIntersection.primitive = primitive;
				closestIntersection.distSq = distSq;
				closestIntersection.point = intersectionPoint;
			}
		}
	}
	return closestIntersection;
}

module.exports = Scene;