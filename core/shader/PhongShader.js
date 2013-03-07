var Color = require('../image/Color');
var Vector = require('../common/Vector');

function PhongShader(material) {
	if (!material) {
		this.diffuse = 1;
		this.specular = 0;
		this.color = new Color(100, 100, 100);
		return;
	}
	this.diffuse = material.diffuse || 1;
	this.specular = material.specular || 0;
	this.color = new Color(material.color.r, material.color.g, material.color.b);
}

PhongShader.prototype.getColor = function(lights, point, normal) {
	//assumes fully diffuse for the time being with intensity = 1
	var res = new Color(0, 0, 0);
	for (var i = 0; i < lights.length; i++) {
		var light = lights[i];
		if (light.type == 'point') {
			var lightVector = new Vector(light.position.x - point.x, light.position.y - point.y, light.position.z - point.z).normalize();
			var dot = normal.dot(lightVector);
			if (dot > 0) {
				res.add(this.color.clone().multiply(light.color).multiply(dot));
			}
		}
	}
	return res.getRGB();
}

module.exports = PhongShader;