chrome.runtime.onInstalled.addListener(() => {
	let script = document.createElement('script');
	script.src = 'jquery-3.4.1.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	initializeTimer(5*60*1000);
});

function initializeTimer(time) {
	let initialTime = time;
	let endTime = new Date(Date.now() + time);
	let timeRemaining = time;
	let paused = true;

	const currentTime = () => {
		return (paused ? timeRemaining : endTime - Date.now());
	}

	chrome.runtime.onMessage.addListener(
		(request, sender, sendResponse) => {
			if (request.message === "pause" && !paused) {
				paused = true;
				timeRemaining = endTime - Date.now();
			} else if (request.message === "play" && paused) {
				paused = false;
				endTime = Date.now() + timeRemaining;
			} else if (request.message === "display") {
				sendResponse(currentTime());
			} else if (request.message === "reset") {
				paused = true;
				timeRemaining = initialTime;
			}
		}
	);
}
