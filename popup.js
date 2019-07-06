function createTimer(time) {
	let end     = new Date(Date.now() + time);

	setInterval(() => updateTime(end), 1000);
}

function updateTime(endTime) {
	let time = endTime.getTime() - new Date().getTime();

	let seconds = Math.floor((time / 1000) % 60);
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let hours   = Math.floor((time / (1000 * 60 * 60)) % 24);

	document.getElementById('timer-hours').innerHTML = ('0' + hours).slice(-2) + ':';
	document.getElementById('timer-minutes').innerHTML = ('0' + minutes).slice(-2) + ':';
	document.getElementById('timer-seconds').innerHTML = ('0' + seconds).slice(-2);
}

document.getElementsByTagName('button')[0].addEventListener('click', function() {
	alert("timer clicked, no result");
});

$(document).ready(() => {
	createTimer(5*60*1000);
});
