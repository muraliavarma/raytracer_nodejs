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
	numPlanes = 0;

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
	camera.lookAt(new THREE.Vector3(0, 0, 1));
	camera.position = new THREE.Vector3(0, 0,-10);
	
	renderer = new THREE.CanvasRenderer();
	var sceneDiv = document.getElementById('sceneDiv');
	renderer.setSize(imageWidth, imageHeight);
	sceneDiv.appendChild(renderer.domElement);

	var geometry = new THREE.CubeGeometry(8,0.1,20);
	var material = new THREE.MeshPhongMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(geometry, material);
	plane.name = 'Plane001';
	plane.position = new THREE.Vector3(0, -5, 20);
	scene.add(plane);

	addPrimitive({
		type: 'sphere',
		position: {x: 0, y: 0, z: 25}
	});

	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position = new THREE.Vector3(0, 0, 20);
	pointLight.intensity = 1;
	scene.add(pointLight);

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
	var sceneData2 = parseScene();
	var sceneData = {
		primitives: [{
			type: 'rectangle',
			center: {
				x: 0, y: -5, z: 20
			},
			normal: {
				x: 0, y: 1, z: 0
			},
			up: {
				x: 0, y: 0, z: 1
			},
			width: 8,
			height: 20,
			material: {
				type: 'diffuse',
				color: {
					r: 255, g: 255, b: 255
				}
			}
		},{
			type: 'sphere',
			center: {
				x: 2, y: -2, z: 25
			},
			radius: 1,
			material: {
				type: 'diffuse',
				color: {
					r: 255, g: 0, b: 255
				}
			}
		}],
		lights: [{
			type: 'point',
			position: {
				x: 0, y: 0, z: 20
			},
			color: {
				r: 100, g: 100, b: 100
			}
		}],
		camera: {
			position: {
				x: 0, y: 0, z: -10
			},
			look: {
				x: 0, y: 0, z: 1
			},
			up: {
				x: 0, y: 1, z: 0
			},
			fov: fov,
			near: near,
			far: far,
			imageWidth: imageWidth,
			imageHeight: imageHeight
		}
	};
	socket.emit('doRender', sceneData);
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
		posAttrX.value = -1 * pickedObject.position.x;
		posAttrY.value = pickedObject.position.y;
		posAttrZ.value = pickedObject.position.z;
	}
}