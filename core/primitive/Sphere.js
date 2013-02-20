var Vector = require("../common/Vector");

function Sphere(x, y, z, r) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
}

Sphere.prototype.getIntersection = function(ray) {
	var a = ray.direction.dot(ray.direction);
	var oc = new Vector(ray.origin.x - this.x, ray.origin.y - this.y, ray.origin.z - this.z);
	var b = 2 * (oc.dot(ray.direction));
	var c = oc.dot(oc) - this.r * this.r;
	var detSq = b * b - 4 * a * c;
	if (detSq < 0) {
		return null;
	}
	var det = Math.sqrt(detSq);
	var t0 = (-b - det) / (2 * a);
	var t1 = (-b + det) / (2 * a);
	return ray.pointAtDistance(t0);	//this is the closer of the two intersection points. the other will be useful for refraction maybe?
}

Sphere.prototype.getNormal = function(point) {
	return new Vector(point.x - this.x, point.y - this.y, point.z - this.z);
}

module.exports = Sphere;