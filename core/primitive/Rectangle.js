var Plane = require("./Plane");
var Vector = require("../common/Vector");

function Rectangle(point, normal, up, width, height) {
	Plane.apply(this, Array.prototype.slice.call(arguments));
	this.up = up.normalize();
	this.width = width;
	this.height = height;
	this.right = up.cross(normal).normalize();
}

Rectangle.prototype.intersection = function(ray) {
	var intersectionPoint = Plane.prototype.intersection.call(this, ray);
	var diff = new Vector(intersectionPoint.x - this.point.x, intersectionPoint.y - this.point.y, intersectionPoint.z - this.point.z);
	if (2 * Math.abs(diff.dot(this.up)) < this.height && 2 * Math.abs(diff.dot(this.right)) < this.width) {
		return intersectionPoint;
	}
	return null;
}

module.exports = Rectangle;