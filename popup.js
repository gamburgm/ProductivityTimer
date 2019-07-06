const callback = (time) => {
	let end = new Date(Date.now() + time);
	let interval = setInterval(() => updateTime(end), 1000);
	let timeRemaining = time;
	let activeFunction;

	const play = () => {
		end = new Date(Date.now() + timeRemaining);
		interval = setInterval(() => updateTime(end), 100);
		activeFunction = pause;
	}

	const pause = () => {
		timeRemaining = end.getTime() - Date.now();
		clearInterval(interval);
		activeFunction = play;
	}

	pause();

	return () => activeFunction();
};

function updateTime(endTime) {
	let time = endTime.getTime() - new Date().getTime();
	
	if (time <= 0) {
		document.getElementById('timer').innerHTML = "You did it!";
		return;
	}

	let seconds = Math.floor((time / 1000) % 60);
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let hours   = Math.floor((time / (1000 * 60 * 60)) % 24);

	document.getElementById('timer-hours').innerHTML = ('0' + hours).slice(-2) + ':';
	document.getElementById('timer-minutes').innerHTML = ('0' + minutes).slice(-2) + ':';
	document.getElementById('timer-seconds').innerHTML = ('0' + seconds).slice(-2);
}

$('#help').click(callback(5*1000));
