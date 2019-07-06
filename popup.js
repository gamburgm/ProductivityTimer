let endDate = new Date();
endDate.setMinutes(endDate.getMinutes() + 5);
let running = false;

let timer = setInterval(function() {
	let time = endDate.getTime() - new Date().getTime();
	
	if (time >= 0 && running) {
		updateTime(time);
	}
}, 100);

function createTimer(

function updateTime(time) {
	let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((time % (1000 * 60)) / 1000);

	document.getElementById('timer-hours').innerHTML = ('0' + hours).slice(-2) + ':';
	document.getElementById('timer-minutes').innerHTML = ('0' + minutes).slice(-2) + ':';
	document.getElementById('timer-seconds').innerHTML = ('0' + seconds).slice(-2);
}

document.getElementsByTagName('button')[0].addEventListener('click', function() {
	running = !running;
});

$(document).ready(() => {
	createTimer(new Date(new Date().getTime + 5*60*1000));
});
