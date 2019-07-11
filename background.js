chrome.runtime.onInstalled.addListener(() => {
	let script = document.createElement('script');
	script.src = 'jquery-3.4.1.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	initializeTimer(5*1000);
});

function initializeTimer(time) {
	
}

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		alert(request.message);
	}
);

/*
Plan: create a bunch of listeners that just sit and listen for requests.
1) play request: setInterval
2) pause request: clearInterval
The popup will just send messages asking for updates on what the time looks like. 
the background page can then provide that. 
Exactly how the logic is going to line up isn't super clear yet, but there's a way
to get this done.
*/
