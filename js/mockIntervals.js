var interval = function (name, mins, secs, pauseMins, pauseSecs, repetitions) {
	this.name = name;
	this.mins = mins;
	this.secs = secs;
	this.pauseMins = pauseMins;
	this.pauseSecs = pauseSecs;
	this.repetitions = repetitions;
}

function fetchInterval(callback) {
	setTimeout(function() {
		callback([
			new interval("int 1", "33", "33", "22", "22", "2"),
			new interval("int 2", "11", "11", "01", "01", "1")]);
	}, 0);
}

module.exports = {
	interval: interval,
	fetchInterval: fetchInterval
};