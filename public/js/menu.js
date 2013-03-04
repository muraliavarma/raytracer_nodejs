function setupMenu() {
	document.getElementById('attributes').onchange = function() {
		pickedObject.name = nameAttr.value;
		pickedObject.position = new THREE.Vector3(-1 * posAttrX.value, posAttrY.value, posAttrZ.value);
		render();
	}
}

function addPrimitive(opts) {
	var material;
	if (opts.material && opts.material.shader == 'phong') {
		material = new THREE.MeshPhongMaterial({color: opts.material.color});
	}
	else {
		material = new THREE.MeshPhongMaterial({color: 0xaaaaaa});
	}

	if (opts.type == 'sphere') {
		var radius = opts.radius || 1,
			segments = 16,
			rings = 16;
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), material);
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
