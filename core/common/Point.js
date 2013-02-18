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

Point.prototype.dot = function(v2) {
	return this.x * v2.x + this.y * v2.y + this.z * v2.z;
};

Point.prototype.add = function(vector) {
	return new Point(this.x + vector.x, this.y + vector.y, this.z + vector.z);
};

module.exports = Point;