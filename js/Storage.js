var Storage = require("FuseJS/Storage");
var Observable = require("FuseJS/Observable");

var customIntervalList = Observable();

var intervalListFileName = "intervals.ivu";

function writeCustomIntervalList() {
	var listLength = customIntervalList.length-1;
	console.log("For each custom interval, write its name to the local storage file with the names");

	var storageString = "";
	var counter = 0;

	customIntervalList.forEach(function(x) {
		console.log("Adding " + x + " to the string");
		if(counter == listLength) {
			storageString += x;
			console.log("String is now: " + storageString);
		} else {
			storageString += (x + ",");
			console.log("String is now: " + storageString);
		}
		counter++;
	});

	var result = Storage.writeSync(intervalListFileName, storageString);
	if(result) {
		console.log("Successfully stored the custom interval list");
	} else {
		console.log("Something went wrong when trying to write the custom interval list");
	}
}

function loadCustomIntervalList() {
	var content = Storage.readSync(intervalListFileName);
	if(content) {
		console.log("Successfully read the custom interval list file");
		customIntervalList.clear();
		var array = content.split(',');
		array.forEach(function(name) {
			customIntervalList.add(name);
		});
	}
}

function writeInterval(name, stringToWrite) {
	var fileName = name+".ivu";

	console.log("String to write: " + stringToWrite);

	var result = Storage.writeSync(fileName, stringToWrite);
	if(result) {
		console.log("Successfully wrote to file!");
	} else {
		console.log("Something went wrong when trying to write to file");
	}
}

function loadInterval(name) {
	var fileName = name+".ivu";
	var content = storage.readSync(fileName);
	console.log("Successfully read from file!");
	console.log("Read this: " + content);

	return content;
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
	writeInterval: writeInterval,
	loadInterval: loadInterval,
	intervalListToString: intervalListToString,
	fromStringToIntervalList: fromStringToIntervalList
};