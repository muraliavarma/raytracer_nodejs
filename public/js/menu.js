function setupMenu() {
	document.getElementById('attributes').onchange = function() {
		pickedObject.name = nameAttr.value;
		pickedObject.position = new THREE.Vector3(posAttrX.value, posAttrY.value, posAttrZ.value);
		render();
	}
}

function addPrimitive(opts) {
	if (opts.type == 'sphere') {
		var radius = 1,
		segments = 16,
		rings = 16;
		var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
		sphere.position = new THREE.Vector3(0, 0, 25);
		scene.add(sphere);
		render();
	}
}
