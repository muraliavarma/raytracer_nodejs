function setupMenu() {

}

function addPrimitive(opts) {
	var material;
	if (opts.material && opts.material.shader == 'phong') {
		material = new THREE.MeshPhongMaterial({
			color: new THREE.Color().setRGB(
				opts.material.color.r, opts.material.color.g, opts.material.color.b
			)
		});
	}
	else {
		material = new THREE.MeshPhongMaterial({
			color: new THREE.Color().setRGB(200, 200, 200)
		});
	}

	var material2 = opts.material || {shader: 'phong', color: {r: 255, g: 0, b: 255}, diffuse: 1, specular: 0};

	if (opts.type == 'sphere') {
		var radius = 1,
			segments = 16,
			rings = 16;
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), material);
		sphere.scale.multiplyScalar(opts.radius || 1);
		sphere.name = opts.name || 'Sphere' + ++numSpheres;
		if (opts.position) {
			sphere.position = new THREE.Vector3(opts.position.x, opts.position.y, opts.position.z);
		}
		else {
			sphere.position = new THREE.Vector3(-2, -2, -25);
		}
		sphere.material2 = material2;
		scene.add(sphere);
	}
	else if (opts.type == 'plane') {

		var geometry = new THREE.CubeGeometry(1, 0.1, 1);
		var plane = new THREE.Mesh(geometry, material);
		plane.name = opts.name || 'Plane' + ++numPlanes;
		if (opts.position) {
			plane.position = new THREE.Vector3(opts.position.x, opts.position.y, opts.position.z);
		}
		else {
			plane.position = new THREE.Vector3(0, -5, -20);
		}
		plane.scale.x = 10;
		plane.scale.z = 10;
		plane.material2 = material2;
		scene.add(plane);

	}
	render();
}

function addLight(opts) {
	if (opts.type == 'point') {
		var pointLight = new THREE.PointLight(opts.color || 0xFFFFFF);
		pointLight.position = new THREE.Vector3(opts.position.x, opts.position.y, opts.position.z);
		pointLight.intensity = opts.intensity || 1;
		pointLight.name = opts.name || 'PointLight' + ++numLights;
		scene.add(pointLight);
	}
}