function setupScene() {
	var ctx = document.getElementById('scene').getContext('2d');
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(50, 25, 150, 100);
	ctx.strokeStyle = 'blue';
	ctx.moveTo(10, 10);
	ctx.lineTo(150, 100);
	ctx.stroke();
}

function doRender() {
	var sceneData = {
		primitives: [{
			type: 'sphere',
			center: {
				x: 10, y: 10, z: 10
			},
			radius: 5,
			material: {
				type: 'diffuse',
				color: {
					r: 255, g: 0, b: 0
				}
			}
		}],
		lights: [{
			type: 'point',
			position: {
				x: 20, y: 20, z: 0
			},
			color: {
				r: 100, g: 100, b: 100
			}
		}],
		camera: {
			position: {
				x: 0, y: 0, z: 0
			},
			look: {
				x: 0, y: 0, z: 1
			},
			up: {
				x: 0, y: 1, z: 0
			},
			aspectRatio: 4/3
		}
	};
	socket.emit('doRender', {
		scene: sceneData,
		width: 300,
		height: 400
	});
}

function initRenderedImage(data) {
	var res = document.getElementById('rendered');
	res.width = res.style.width = data.width;
	res.height = res.style.height = data.height;
	renderedCtx = res.getContext('2d');
}

function updateRenderedImage(data) {
	setPixel(data.x, data.y, data.r, data.g, data.b, 255);
}

function setPixel(x, y, r, g, b, a) {
	renderedCtx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 255 + ')';
	renderedCtx.fillRect(x, y, 1, 1);
}

function finishRenderedImage() {
	//do something once the image is rendered
}