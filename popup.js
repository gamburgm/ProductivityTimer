let endDate = new Date("July 4, 2019 12:00:00").getTime();
let timer = setInterval(function() {
	let now = new Date().getTime();
	let time = endDate - now;
	
	if (time >= 0) {
		let days = Math.floor(time / (1000 * 60 * 60 * 24));
		let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((time % (1000 * 60)) / 1000);

		document.getElementById("timer-days").innerHTML = days + "<span class='label'>DAY(S)</span>";
		document.getElementById("timer-hours").innerHTML = ("0" + hours).slice(-2) + "<span class='label'>HOUR(S)</span>";
		document.getElementById("timer-minutes").innerHTML = ("0" + minutes).slice(-2) + "<span class='label'>MINUTE(S)</span>";
		document.getElementById("timer-seconds").innerHTML = ("0" + seconds).slice(-2) + "<span class='label'>SECOND(S)</span>";
	}
	else {
		document.getElementById("timer").innerHTML = "The countdown is over!";
	}
}, 1000);
