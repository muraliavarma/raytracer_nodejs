var imageWidth = 300;
var imageHeight = 400;
var scene;
var camera;
var renderer;
var fov;
var near;
var far;

function setupScene() {
	scene = new THREE.Scene();
	fov = 75;
	near = 1;
	far = 1000;
	
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
	plane.position = new THREE.Vector3(0, -5, 20);
	scene.add(plane);

	var radius = 1,
	segments = 16,
	rings = 16;

	var sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
	sphere.position = new THREE.Vector3(-2, -2, 25);
	scene.add(sphere);

	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position = new THREE.Vector3(0, 0, 20);
	pointLight.intensity = 1;
	scene.add(pointLight);

	sceneDiv.onclick = function() {
		render();
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