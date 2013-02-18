function Ray(o, d) {
	this.origin = o;
	this.direction = d.normalize();
}

Ray.prototype.pointAtDistance = function(dist) {
	return this.origin.add(this.direction.multiply(dist));
};

module.exports = Ray;