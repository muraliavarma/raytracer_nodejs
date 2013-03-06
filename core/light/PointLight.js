var Color = require('../image/Color');
var Point = require('../common/Point');

function PointLight(data) {
	this.color = new Color(data.color.r, data.color.g, data.color.b);
	this.position = new Point(data.position.x, data.position.y, data.position.z);
	this.intensity = data.intensity || 1;
}

module.exports = PointLight;