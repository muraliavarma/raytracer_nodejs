function addPrimitive(type) {
	if (type == 'sphere') {
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