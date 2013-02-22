var imageWidth = 300;
var imageHeight = 400;
var scene;
var camera;
var renderer;

function setupScene() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, imageWidth/imageHeight, 1, 1000);
	camera.lookAt(new THREE.Vector3(0, 0, 1));
	renderer = new THREE.CanvasRenderer();
	var sceneDiv = document.getElementById('sceneDiv');
	renderer.setSize(imageWidth, imageHeight);
	sceneDiv.appendChild(renderer.domElement);

	var geometry = new THREE.CubeGeometry(10,0.1,8);
	var material = new THREE.MeshBasicMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(geometry, material);
	plane.position = new THREE.Vector3(0, -5, 20);
	scene.add(plane);

	var radius = 1,
	segments = 16,
	rings = 16;

	var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
	sphere.position = new THREE.Vector3(-2, -2, 25);
	scene.add(sphere);

	camera.position.z = -10;
	sceneDiv.onclick = function() {
		render();
	}
	function render() {

		// plane.rotation.x += 0.1;
		// plane.rotation.y += 0.1;

		renderer.render(scene, camera);
	}
	render();

}

function doRender() {
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
			height: 10,
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
			zoom: 1,
			imageWidth: imageWidth,
			imageHeight: imageHeight
		}
	};
	socket.emit('doRender', sceneData);
}

function initRenderedImage(data) {
	// var res = document.getElementById('rendered');
	// res.width = res.style.width = data.width;
	// res.height = res.style.height = data.height;
	// renderedCtx = res.getContext('2d');
}

function updateRenderedImage(data) {
	// setPixel(data.x, data.y, data.r, data.g, data.b, 255);
	document.getElementById("progress").innerHTML = data.percent + "%";
}

// function setPixel(x, y, r, g, b, a) {
// 	renderedCtx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 255 + ')';
// 	renderedCtx.fillRect(x, y, 1, 1);
// }

function finishRenderedImage(data) {
	if (!data) {
		return;
	}
	rendered.style.height = data.height;
	rendered.style.width = data.width;
	rendered.src = "images/" + data.fileName + ".png";
}