var storage = require("FuseJS/Storage")
var observable = require("FuseJS/Observable")

function interval(name, mins, secs, pauseMins, pauseSecs, repetitions) {
	var self = this;
	var name = name;
	var mins = mins;
	var secs = secs;
	var pauseMins = pauseMins;
	var pauseSecs = pauseSecs;
	var repetitions = repetitions;
}

var intervalList = observable();
var intervalName = observable();
var intervalMins = observable();
var intervalSecs = observable();
var intervalPauseMins = observable();
var intervalPauseSecs = observable();
var intervalReps = observable();
var intervalContent = observable();

function writeIntervalList() {
	var maketheString = intervalListToString("");

	console.log("The string to write: " + maketheString);

	var success = storage.writeSync("test.txt", maketheString);
	if(success) {
		console.log("Successfully wrote to file!");
	} else {
		console.log("Something went wrong when trying to write to file");
	}
}

function loadIntervalList() {
	var content = storage.readSync("test.txt");
	console.log("Successfully read from file!");
	intervalContent.value = content.toString();
}

function addInterval() {
	console.log("Adding item to intervalList!");
	console.log("Interval name: " + intervalName.value);
	console.log("Interval minutes: " + intervalMins.value);
	console.log("Interval seconds: " + intervalSecs.value);
	console.log("Pause minutes: " + intervalPauseMins.value);
	console.log("Pause seconds: " + intervalPauseSecs.value);
	console.log("Interval reps: " + intervalReps.value);

	intervalList.add(new interval(intervalName.value, intervalMins.value, intervalSecs.value, intervalPauseMins.value, intervalPauseSecs.value, intervalReps.value));
	console.log(intervalList.length);
	console.log("Interval added!");
}

function removeInterval(arg) {
	console.log("Removing item from intervalList");
	console.log("Data in args: " + arg.data);
	intervalList.tryRemove(arg.data);
}

function intervalListToString(args) {
	var theString = intervalList.toString();
	console.log("intervalList.toString: " + theString);
	console.log(theString);

	var theString2 = intervalList.value;
	console.log("intervalList.value: " + theString2);

	var theString3 = intervalList.value.toString;
	console.log("intervalList.value.toString: " + theString3);

	var backToList = fromStringToIntervalList(theString);
	console.log(backToList);

	return theString;
}

function fromStringToIntervalList(intlistString) {
	return "This is where the magic happens, biatch";
}

module.exports = {
	intervalList: intervalList,
	intervalName: intervalName,
	intervalMins: intervalMins,
	intervalSecs: intervalSecs,
	intervalPauseMins: intervalPauseMins,
	intervalPauseSecs: intervalPauseSecs,
	intervalReps: intervalReps,
	intervalContent: intervalContent,
	writeIntervalList: writeIntervalList,
	loadIntervalList: loadIntervalList,
	addInterval: addInterval,
	removeInterval: removeInterval,
	intervalListToString: intervalListToString,
	fromStringToIntervalList: fromStringToIntervalList
};