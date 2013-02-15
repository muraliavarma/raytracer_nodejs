function setupScene() {
	var ctx = document.getElementById('scene').getContext('2d');
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(50, 25, 150, 100);
	ctx.strokeStyle = 'blue';
	// ctx.beginPath();
	ctx.moveTo(10, 10);
	ctx.lineTo(150, 100);
	// ctx.endPath();
	ctx.stroke();
}