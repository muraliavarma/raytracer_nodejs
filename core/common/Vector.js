function Vector(a, b, c) {
	this.x = a;
	this.y = b;
	this.z = c;
}

Vector.prototype.dot = function(v2) {
	return this.x * v2.x + this.y * v2.y + this.z * v2.z;
};

Vector.prototype.cross = function(v2) {
	var a = this.y * v2.z - this.z * v2.y;
	var b = this.z * v2.x - this.x * v2.z;
	var c = this.x * v2.y - this.y * v2.x;

	return new Vector(a, b, c);
};

Vector.prototype.lengthSquared = function() {
	return this.x * this.x + this.y * this.y + this.z * this.z;
}

Vector.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
}

Vector.prototype.multiply = function(s) {
	return new Vector(1.0 * s * this.x, 1.0 * s * this.y, 1.0 * s * this.z);
}

Vector.prototype.normalize = function() {
	var len = this.length();
	if (len == 0) {
		return new Vector(0, 0, 0);
	}
	return this.multiply(1/len));
}