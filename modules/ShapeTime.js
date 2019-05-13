var os = require('os');

function formatTime(n) {
	var time = 0;
	if (n < 60) {
		return (time%60) + 's';
	} if (n >= 60) {
		return Math.floor((time%3600)/60) + 'min'
	} if (n >= 3600) {
		return Math.floor(time/3600) + 'h'
	}
}

exports.print = formatTime;