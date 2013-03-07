function Color(r, g, b, a) {
	this.r = r / 255.0;
	this.g = g / 255.0;
	this.b = b / 255.0;
	this.a = a ? a/255.0 : 1.0;
}

Color.prototype.getRGB = function() {
	return {r: 255 * this.r | 0, g: this.g * 255 | 0, b: this.b * 255 | 0};
}

Color.prototype.multiply = function(color) {
	if (color.r && color.g && color.b) {
		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;
	}
	else {
		this.r *= color;
		this.g *= color;
		this.b *= color;
	}
	this.clamp();
	return this;
}

Color.prototype.add = function(color) {
	this.r += color.r;
	this.g += color.g;
	this.b += color.b;
	this.clamp();
	return this;
}

Color.prototype.clamp = function() {
	this.r = Math.min(1.0, this.r);
	this.g = Math.min(1.0, this.g);
	this.b = Math.min(1.0, this.b);
}

Color.prototype.getHex = function() {
	return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;
}

Color.prototype.getHexString = function() {
	return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );
}

Color.prototype.clone = function() {
	return new Color(this.r * 255, this.g * 255, this.b * 255, this.a * 255);
}

module.exports = Color;