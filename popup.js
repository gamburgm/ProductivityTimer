const callback = (time) => {
	updateTime(time);
	let endTime = new Date(Date.now() + time);
	let interval;
	let timeRemaining = time;
	let activeFunction;

	let $buttonimg = $('#animation');
	let playShape  = "M0,0 L0,0 0,200 75,150 75,50 0,0 M75,150 L75,150 150,100 150,100 75,50 75,150"
	let pauseShape = "M0,0 L0,0 0,200 50,200 50,0 0,0 M75,0 L75,0 75,200 125,200 125,0 75,0"
	let resetShape = "M0,100 L0,100 100,0 100,100 100,200 0,100 M100,100 L100,100 200,0 200,100 200,200 100,100"

	const play = () => {
		endTime = new Date(Date.now() + timeRemaining);
		interval = setInterval(() => { 
			let time = endTime.getTime() - new Date().getTime();
			if (time <= 0) {
				return end();
			}
			updateTime(time);
		} , 100);
		$buttonimg.attr({ "from": playShape, "to": pauseShape }).get(0).beginElement();
		activeFunction = pause;
	}

	const pause = () => {
		timeRemaining = endTime.getTime() - Date.now();
		clearInterval(interval);
		$buttonimg.attr({ "from": pauseShape, "to": playShape }).get(0).beginElement();
		activeFunction = play;
	}

	const end = () => {
		alert("Time's up!");
		$buttonimg.attr({ "from": pauseShape, "to": playShape }).get(0).beginElement();
		clearInterval(interval);
		activeFunction = reset;
		$buttonimg.attr({ "from": pauseShape, "to": resetShape }).get(0).beginElement();
	}

	const reset = () => {
		endTime = new Date(Date.now() + time);
		timeRemaining = time;
		activeFunction = play;
		$buttonimg.attr({ "from": resetShape, "to": playShape }).get(0).beginElement();
	}

	pause();
	updateTime(timeRemaining);

	return () => activeFunction();
};

function updateTime(time) {
	let seconds = Math.floor((time / 1000) % 60);
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let hours   = Math.floor((time / (1000 * 60 * 60)) % 24);

	document.getElementById('timer-hours').innerHTML = ('0' + hours).slice(-2) + ':';
	document.getElementById('timer-minutes').innerHTML = ('0' + minutes).slice(-2) + ':';
	document.getElementById('timer-seconds').innerHTML = ('0' + seconds).slice(-2);
}

$('#help').click(callback(1000));
