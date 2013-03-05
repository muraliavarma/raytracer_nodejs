function setupMenu() {
	document.getElementById('attributes').onchange = function() {
		pickedObject.name = nameAttr.value;
		pickedObject.position = new THREE.Vector3(-1 * posAttrX.value, posAttrY.value, posAttrZ.value);
		pickedObject.rotation = new THREE.Vector3(-1 * rotAttrX.value * Math.PI/180, rotAttrY.value * Math.PI/180, rotAttrZ.value * Math.PI/180);
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

		var geometry = new THREE.CubeGeometry(8,0.1,20);
		var plane = new THREE.Mesh(geometry, material);
		plane.name = opts.name || 'Plane' + ++numPlanes;
		if (opts.position) {
			plane.position = new THREE.Vector3(opts.position.x, opts.position.y, opts.position.z);
		}
		else {
			plane.position = new THREE.Vector3(0, -5, 20);
		}
		scene.add(plane);

	}
	render();
}
