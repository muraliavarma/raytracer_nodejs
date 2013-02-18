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