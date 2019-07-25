const callback = () => {
	let interval;
	let activeFunction;

	let port;
	let $buttonimg = $('#animation');
	let playShape  = "M0,0 L0,0 0,200 75,150 75,50 0,0 M75,150 L75,150 150,100 150,100 75,50 75,150"
	let pauseShape = "M0,0 L0,0 0,200 50,200 50,0 0,0 M75,0 L75,0 75,200 125,200 125,0 75,0"
	let resetShape = "M0,100 L0,100 100,0 100,100 100,200 0,100 M100,100 L100,100 200,0 200,100 200,200 100,100"


	const play = () => {
		port.postMessage({ message: "play" });
		interval = setInterval(() => { 
			port.postMessage({ message: "display" });
		} , 100);
		$buttonimg.attr({ "from": playShape, "to": pauseShape }).get(0).beginElement();
		activeFunction = pause;
	}

	const pause = () => {
		clearInterval(interval);
		port.postMessage({ message: "pause" });
		$buttonimg.attr({ "from": pauseShape, "to": playShape }).get(0).beginElement();
		activeFunction = play;
	}

	const end = () => {
		updateTime(0);
		// why is this line necessary?
		clearInterval(interval);
		activeFunction = reset;
		$buttonimg.attr({ "from": pauseShape, "to": resetShape }).get(0).beginElement();
	}

	const reset = () => {
		port.postMessage({ message: "reset" });
		port.postMessage({ message: "display" });
		activeFunction = play;
		$buttonimg.attr({ "from": resetShape, "to": playShape }).get(0).beginElement();
	}

	port = chrome.runtime.connect({ name: "timer" });
	port.onMessage.addListener(function(msg) {
		if (msg.message === "updateTime") {
			let time = msg.contents;
			if (time <= 0) { return end() }
			updateTime(time);
		} else if (msg.message === "updateStatus") {
			if (msg.contents <= 0) return end();
			msg.currStatus ? pause() : play();
		}
	});

	port.postMessage({ "message" : "display" });
	port.postMessage({ "message" : "status" });

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

chrome.browserAction.setPopup({ popup: 'form.html' }); 
// $('#help').click(callback());
