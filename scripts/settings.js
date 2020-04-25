document.getElementById('btnGenerate').onclick = () => {
	toggleState(0);
	grid = generateArray();
}

document.getElementById('btnToggle').onclick = () => {
	if (grid) toggleState(1 - state);
}

document.getElementById('btnStep').onclick = () => {
	toggleState(0);
	update(1);
}

document.getElementById('resolutionSlider').onchange = function() {
	toggleState(0);
	resolution = this.value;
	grid = generateArray();
}

document.getElementById('populationSlider').onchange = function() {
	toggleState(0);
	population = this.value;
	grid = generateArray();
}


function toggleState(newval) {
	state = newval;
	document.getElementById('btnToggle').innerHTML = state ? 'Pause' : 'Play';
}
