var storage = require("FuseJS/Storage")
var observable = require("FuseJS/Observable")

function interval(mins, secs, pauseMins, pauseSecs) {
	this.mins = mins;
	this.secs = secs;
	this.pauseMins = pauseMins;
	this.pauseSecs = pauseSecs;
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
	var maketheString = intervalListToString();

	var result = storage.writeSync("test.txt", maketheString);
	if(result) {
		console.log("Successfully wrote to file!");
		console.log("Wrote: " + maketheString);
	} else {
		console.log("Something went wrong when trying to write to file");
	}

	loadIntervalList();
}

function loadIntervalList() {
	var content = storage.readSync("test.txt");
	console.log("Successfully read from file!");
	console.log("Read this: " + content);
	fromStringToIntervalList(content);
}

function addInterval() {
	console.log("Adding item to intervalList!");
	console.log("Interval reps: " + intervalReps.value);

	for(x=1; x<=intervalReps.value; x++){
		console.log("Iteration: " + x)
		console.log("Interval minutes: " + intervalMins.value);
		console.log("Interval seconds: " + intervalSecs.value);
		console.log("Pause minutes: " + intervalPauseMins.value);
		console.log("Pause seconds: " + intervalPauseSecs.value);
	
		intervalList.add(new interval(intervalMins.value, intervalSecs.value, intervalPauseMins.value, intervalPauseSecs.value));
		console.log("Interval added!");
	}

	console.log("IntervalList length: " + intervalList.length);
}

function removeInterval(intervalItem) {
	console.log("Removing item from intervalList");
	console.log("Data in args: " + intervalItem.data.mins + "m, " + intervalItem.data.secs + "s");
	intervalList.tryRemove(intervalItem.data);
	console.log("IntervalList length: " + intervalList.length);
}

function intervalListToString(args) {
	var intervalString = "";

	var counter = 0;
	var listLength = intervalList.length-1;

	intervalList.forEach(function(x) {
		console.log("counter is: " + counter);
		console.log("List length is: " + listLength);
		if(counter == listLength){
			intervalString += (x.mins + "," + x.secs + "," + x.pauseMins + "," + x.pauseSecs);
			console.log("String is now: " + intervalString);
		} else {
			intervalString += (x.mins + "," + x.secs + "," + x.pauseMins + "," + x.pauseSecs + ",");
			console.log("String is now: " + intervalString);
		}
		counter++;
	});

	return intervalString
}

function fromStringToIntervalList(intlistString) {
	console.log("Attempting to recreate the observable");
	console.log("Data to restore from: " + intlistString);

	for(x=0; x<=intervalList.length; x++){
		intervalList.forEach(function(y){
			intervalList.remove(y);
		});
		x=0;
	}

	var test = intervalList.length;
	console.log("intervalList should be empty: " + test);

	var array = intlistString.split(',');
	var al = array.length-1;
	console.log("Length of array: " + al);
	for(i=0; i < al; i+=4){
		console.log("Value of i: " + i);
		var m = array[i];
		var s = array[i+1];
		var pm = array[i+2];
		var ps = array[i+3];

		console.log("Values: " + m + "m, " + s + "s, " + pm + "pm, " + ps + "ps");
		intervalList.add(new interval(m, s, pm, ps));
		console.log("Added item to intervalList!");
	}
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