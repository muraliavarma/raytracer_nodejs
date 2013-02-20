var Plane = require("./Plane");
var Vector = require("../common/Vector");

function Rectangle(point, normal, up, width, height) {
	Plane.apply(this, Array.prototype.slice.call(arguments));
	this.up = up.normalize();
	this.width = width;
	this.height = height;
	this.right = up.cross(normal).normalize();
}

Rectangle.prototype.getIntersection = function(ray) {
	var intersectionPoint = Plane.prototype.getIntersection.call(this, ray);
	if (!intersectionPoint) {
		return null;
	}
	var diff = new Vector(intersectionPoint.x - this.point.x, intersectionPoint.y - this.point.y, intersectionPoint.z - this.point.z);
	if (2 * Math.abs(diff.dot(this.up)) < this.height && 2 * Math.abs(diff.dot(this.right)) < this.width) {
		return intersectionPoint;
	}
	return null;
}

Rectangle.prototype.getNormal = function(point) {
	return this.normal;
}

module.exports = Rectangle;