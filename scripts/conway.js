const canvas = document.getElementById('canvas');
console.log(canvas);

const ctx = canvas.getContext('2d');

let resolution = document.getElementById('resolutionSlider').value;
let population = document.getElementById('populationSlider').value;
let state = 0;
let grid;

function generateArray() {
	let grid = new Array(resolution);
	for (let i = 0; i < resolution; ++i) {
		grid[i] = new Array(resolution);
		for (let j = 0; j < resolution; ++j)
			grid[i][j] = (Math.random() * 100 < population) ? 1 : 0;
	}
	return grid;
}

function draw(grid) {
	ctx.lineWidth = .5;
	ctx.strokeStyle = 'gray';
	const [sizeX, sizeY] = [canvas.width / resolution, canvas.height / resolution];
	for (let y = 0; y < resolution; ++y) {
		for (let x = 0; x < resolution; ++x) {
			ctx.beginPath();
			ctx.fillStyle = grid && grid[y][x] ? 'black' : 'white';
			ctx.rect(sizeX * x, sizeY * y, sizeX, sizeY);
			ctx.fill();
			ctx.stroke();
		}
	}
}

function advance(grid) {
	newGrid = generateArray();
	for (let y = 0; y < newGrid.length; ++y) {
		for (let x = 0; x < newGrid[y].length; ++x) {
			neighbors = countNeighbors(x, y);
			newGrid[y][x] = (neighbors == 3 || (neighbors == 2 && grid[y][x])) ? 1 : 0
		}
	}
	return newGrid;
}

function countNeighbors(x, y) {
	let sum = 0;
	for (let dy = -1; dy <= 1; ++dy) {
		if (!grid[y+dy]) continue;
		for (let dx = -1; dx <= 1; ++dx)
			if (grid[y+dy][x+dx]) ++sum;
	}
	return sum - grid[y][x];
}

function update(state) {
	if (grid && state === 1)
		grid = advance(grid);
	draw(grid);
}

window.setInterval(() => update(state), 100);
