function Plane(point, normal) {
	this.point = point;
	this.normal = normal;
}

Plane.prototype.intersection = function(ray) {
	if (ray.direction.dot(this.normal) == 0) {
		return null;
	}
	var t = (this.point.dot(this.normal) - ray.origin.dot(this.normal)) / (ray.direction.dot(this.normal));
	return ray.pointAtDistance(t);
}

module.exports = Plane;