function setupMenu() {
	document.getElementById('attributes').onchange = function() {
		pickedObject.name = nameAttr.value;
		pickedObject.position = new THREE.Vector3(-1 * posAttrX.value, posAttrY.value, posAttrZ.value);
		render();
	}
}

function addPrimitive(opts) {
	if (opts.type == 'sphere') {
		var radius = opts.radius || 1,
		segments = 16,
		rings = 16;
		var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
		sphere.name = opts.name || 'Sphere' + ++numSpheres;
		if (opts.position) {
			sphere.position = new THREE.Vector3(opts.position.x, opts.position.y, opts.position.z);
		}
		else {
			sphere.position = new THREE.Vector3(-2, -2, 25);
		}
		scene.add(sphere);
	}
	else if (opts.type == 'plane') {

	}
	render();
}
