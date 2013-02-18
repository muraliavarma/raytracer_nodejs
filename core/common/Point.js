function Point(a, b, c) {
	this.x = a;
	this.y = b;
	this.z = c;
}

Point.prototype.distanceToSquared = function(pt) {
	return (this.x - pt.x) * (this.x - pt.x) + (this.y - pt.y) * (this.y - pt.y) + (this.z - pt.z) * (this.z - pt.z);
};

Point.prototype.distanceTo = function(pt) {
	return Math.sqrt(this.distanceToSquared(pt));
};