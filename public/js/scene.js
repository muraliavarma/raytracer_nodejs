var imageWidth = 300;
var imageHeight = 400;
var scene;
var camera;
var renderer;
var fov;
var near;
var far;
var mouse, pickedObject;
var projector;

var numSpheres = 0,
	numPlanes = 0,
	numLights = 0;

function setupScene() {
	scene = new THREE.Scene();
	fov = 75;
	near = 1;
	far = 1000;

	mouse = {
		x: 0,
		y: 0
	};
	
	camera = new THREE.PerspectiveCamera(fov, imageWidth/imageHeight, near, far);
	camera.name = 'camera001';
	camera.lookAt(new THREE.Vector3(0, 0, -1));
	camera.position = new THREE.Vector3(0, 0, 10);
	
	renderer = new THREE.CanvasRenderer();
	var sceneDiv = document.getElementById('sceneDiv');
	renderer.setSize(imageWidth, imageHeight);
	sceneDiv.appendChild(renderer.domElement);

	addPrimitive({
		type: 'plane',
		position: {x: 0, y: -5, z: -20},
		material: {
			shader: 'phong',
			color: {
				r: 0, g: 0, b: 255
			},
			diffuse: 1,
			specular: 0
		}
	});

	addPrimitive({
		type: 'sphere',
		position: {x: 0, y: 0, z: -25},
		radius: 1,	//since radius is an attribute specific to spheres, there should be a provision for conditional attribute display 
		material: {
			shader: 'phong',
			color: {
				r: 255, g: 0, b: 255
			},
			diffuse: 1,
			specular: 0
		}
	});

	addLight({
		type: 'point',
		position: {x: 0, y: 0, z: -20},
		intensity: 1
	})

	projector = new THREE.Projector();
	document.addEventListener('mousemove', onCanvasMouseMove, false);

	sceneDiv.onclick = function() {
		pick();
		render();
		showAttributes();
	}
	render();

}

function render() {
	renderer.render(scene, camera);
}

function doRender() {
	socket.emit('doRender', parseScene());
}

function initRenderedImage(data) {

}

function updateRenderedImage(data) {
	document.getElementById("progress").innerHTML = data.percent + "%";
}

function finishRenderedImage(data) {
	if (!data) {
		return;
	}
	rendered.style.height = data.height;
	rendered.style.width = data.width;
	rendered.src = "images/" + data.fileName + ".png";
}

function parseScene() {
	var cameraLookAt = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation, camera.eulerOrder);
	var ret = {
		primitives: [],
		lights: [],
		camera: {
			position: {
				x: camera.position.x,
				y: camera.position.y,
				z: camera.position.z
			},
			look: {
				x: cameraLookAt.x,
				y: cameraLookAt.y,
				z: cameraLookAt.z
			},
			up: {
				x: camera.up.x,
				y: camera.up.y,
				z: camera.up.z
			},
			fov: fov,
			near: near,
			far: far,
			imageWidth: imageWidth,
			imageHeight: imageHeight
		}
	};

	for (var i = 0; i < scene.children.length; i++) {
		var child = scene.children[i];
		if (child.name.toLowerCase().indexOf('light') >= 0) {
			//then this child is a light
			var light = {};
			if (child.name.toLowerCase().indexOf('point') >= 0) {
				light.type = 'point';
				light.position = {
					x: child.position.x,
					y: child.position.y,
					z: child.position.z
				};
				light.color = {
					r: child.color.r * 255,
					g: child.color.g * 255,
					b: child.color.b * 255
				};

				//TODO intensity

			}
			ret.lights.push(light);
		}
		else {
			//then this child is a 3D object (as of now unless there are more types of objects in the scene)
			var primitive = {};
			primitive.center = {
				x: child.position.x,
				y: child.position.y,
				z: child.position.z
			};
			if (child.name.toLowerCase().indexOf('sphere') >= 0) {
				primitive.type = 'sphere';
				primitive.radius = child.geometry.radius;
			}
			else if (child.name.toLowerCase().indexOf('plane') >= 0) {
				primitive.type = 'rectangle';
				primitive.width = child.geometry.width;
				primitive.height = child.geometry.depth;

				var matrix = new THREE.Matrix4();
				matrix.rotateX(child.rotation.x).rotateY(child.rotation.y).rotateZ(child.rotation.z);
				var normalVector = new THREE.Vector3(0, 1, 0).applyMatrix4(matrix);
				var upVector = new THREE.Vector3(0, 0, 1).applyMatrix4(matrix);

				primitive.normal = {
					x: normalVector.x,
					y: normalVector.y,
					z: normalVector.z
				};
				primitive.up = {
					x: upVector.x,
					y: upVector.y,
					z: upVector.z
				};
			}
			primitive.material = child.material2;
			primitive.material.color = {
				r: child.material.color.r,
				g: child.material.color.g,
				b: child.material.color.b
			};
			ret.primitives.push(primitive);
		}
	}
	return ret;
}

function pick() {
	if (mouse.x > 1) {
		return;
	}
	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	projector.unprojectVector(vector, camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	var intersects = raycaster.intersectObjects(scene.children);

	if (intersects.length > 0) {
		if (pickedObject != intersects[0].object) {

			if (pickedObject){
				pickedObject.material.emissive.setHex(pickedObject.currentHex);
			}
			pickedObject = intersects[0].object;
			pickedObject.currentHex = pickedObject.material.emissive.getHex();
			pickedObject.material.emissive.setHex(0xff0000);
		}
	}
	else {
		if (pickedObject){
			pickedObject.material.emissive.setHex(pickedObject.currentHex);
		}
		pickedObject = null;
	}
}

function onCanvasMouseMove(event) {
	var rect = sceneDiv.getElementsByTagName('canvas')[0].getBoundingClientRect();	//TODO checking for nulls, and in many other places in the code
	event.preventDefault();
	mouse.x = (event.clientX - rect.left);
	mouse.y = (event.clientY - rect.top);
	if (mouse.x > imageWidth || mouse.y > imageHeight) {
		mouse.x = imageWidth + 1;
		mouse.y = imageHeight + 1;
	}
	mouse.x = (mouse.x/imageWidth) * 2 - 1;
	mouse.y = - (mouse.y/imageHeight) * 2 + 1;
}

function showAttributes() {
	var attributes = document.getElementById("attributes");
	if (!pickedObject) {
		attributes.style.display = "none";
	}
	else {
		attributes.style.display = "block";
		nameAttr.value = pickedObject.name;

		posAttrX.value = pickedObject.position.x;
		posAttrY.value = pickedObject.position.y;
		posAttrZ.value = pickedObject.position.z;

		rotAttrX.value = pickedObject.rotation.x * 180/Math.PI;
		rotAttrY.value = pickedObject.rotation.y * 180/Math.PI;
		rotAttrZ.value = pickedObject.rotation.z * 180/Math.PI;
	}
}
