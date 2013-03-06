var Color = require('../image/Color');

function PhongShader(material) {
	this.diffuse = material.diffuse || 1;
	this.specular = material.specular || 0;
	this.color = new Color(material.color.r, material.color.g, material.color.b);
}

PhongShader.prototype.getColor = function(point, normal) {
	
}

module.exports = PhongShader;