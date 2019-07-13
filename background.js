chrome.runtime.onInstalled.addListener(() => {
	let script = document.createElement('script');
	script.src = 'jquery-3.4.1.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	initializeTimer(5*1000);
});

function initializeTimer(time) {
	let timer;
	let initialTime = time;
	let endTime = new Date(Date.now() + time);
	let timeRemaining = time;
	let paused = true;

	const currentTime = () => {
		return (paused ? timeRemaining : endTime - Date.now());
	}

	const play = () => {
		timer = setInterval(() => {
			if (endTime - Date.now() <= 0) {
				alert("Time's up!");
				clearInterval(timer);
				pause();
			}
		}, 100);
		paused = false;
		endTime = Date.now() + timeRemaining;
	}

	const pause = () => {
		clearInterval(timer);
		paused = true;
		timeRemaining = endTime - Date.now();
	}

	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			if (request.message === "pause" && !paused) {
				pause();
			} else if (request.message === "play" && paused) {
				play();
			} else if (request.message === "display") {
				sendResponse(currentTime());
			} else if (request.message === "reset") {
				paused = true;
				timeRemaining = initialTime;
			} else if (request.message === "status") {
				sendResponse(paused);
			}
		}
	);
}
