const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
function setCanvasDimensions() {
	ctx.clearRect(
		canvas.width / 2,
		canvas.height / 2,
		canvas.width,
		canvas.height
	);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.translate(canvas.width / 2, canvas.height / 2);
}

const colours = ["#FA647D", "#64FAE1", "#7C8483", "#FA647D", "#64FAE1"];
const maxLevel = 5;
const branches = 2;
const sides = Math.floor(Math.random() * 10 + 9);
const spread = Math.random() * 48 + 0.51;
const angle = Math.PI * 2 * spread;
const alpha = 0.3;

function drawLine(level, alpha) {
	if (level > maxLevel) return;
	ctx.strokeStyle = colours[level];
	ctx.globalAlpha = alpha;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(400, 0);
	ctx.stroke();

	for (let i = 1; i < branches + 1; i++) {
		ctx.save();
		ctx.translate((300 * i) / (branches + 1), 0);
		ctx.scale(0.7, 0.7);
		ctx.save();

		ctx.rotate(angle);
		drawLine(level + 1, alpha + level / 10);
		ctx.restore();
		ctx.save();

		ctx.rotate(-angle);
		drawLine(level + 1);
		ctx.restore();

		ctx.restore();
	}
}
function init() {
	for (let i = 0; i < sides; i++) {
		drawLine(1, alpha);
		ctx.rotate((Math.PI * 2) / sides);
	}
}

setCanvasDimensions();
init();

window.addEventListener("resize", () => {
	setCanvasDimensions();
	init();
});