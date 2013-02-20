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
			type: 'rectangle',
			center: {
				x: 0, y: -10, z: 20
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
				x: 5, y: -5, z: 35
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
				x: 0, y: -8, z: 20
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
			imageWidth: 300,
			imageHeight: 400
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