const callback = (time) => {
	let end = new Date(Date.now() + time);
	let interval = setInterval(() => updateTime(end), 1000);
	let timeRemaining = time;
	let activeFunction;

	let $buttonimg = $('#animation');
	let playShape  = "M0,0 L0,0 0,200 75,150 75,50 0,0 M75,150 L75,150 150,100 150,100 75,50 75,150"
	// let playShape  = "M0,0 L0,0 0,200 150,100 0,0 0,0 M0,0 L0,0 0,0 0,0 0,0 0,0";
	let pauseShape = "M0,0 L0,0 0,200 50,200 50,0 0,0 M75,0 L75,0 75,200 125,200 125,0 75,0"

	const play = () => {
		end = new Date(Date.now() + timeRemaining);
		interval = setInterval(() => updateTime(end), 100);
		$buttonimg.attr({ "from": playShape, "to": pauseShape }).get(0).beginElement();
		activeFunction = pause;
	}

	const pause = () => {
		timeRemaining = end.getTime() - Date.now();
		clearInterval(interval);
		$buttonimg.attr({ "from": pauseShape, "to": playShape }).get(0).beginElement();
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

$('#help').click(callback(10*1000));
