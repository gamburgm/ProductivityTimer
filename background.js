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
		endTime = Date.now() + timeRemaining;
		paused = false;
		timer = setInterval(() => {
			if (endTime - Date.now() <= 0) {
				alert("Time's up!");
				pause();
				timeRemaining = 0;
			}
		}, 100);
	}

	const pause = () => {
		clearInterval(timer);
		paused = true;
		timeRemaining = endTime - Date.now();
	}

	chrome.runtime.onConnect.addListener(function(port) {
		if (port.name === "timer") {
			port.onMessage.addListener(function(msg) {
				if (msg.message === "play" && paused) {
					play();
				} else if (msg.message === "pause" && !paused) {
					pause();
				} else if (msg.message === "reset") {
					paused = true;
					timeRemaining = initialTime;
				} else if (msg.message === "display") {
					port.postMessage({ message: "updateTime", contents: currentTime() });
				} else if (msg.message === "status") {
					port.postMessage({ message: "updateStatus", currStatus: paused, contents: currentTime() });
				}
			});
		}
	});
}
