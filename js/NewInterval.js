var Observable = require("FuseJS/Observable");

var intervalLegListTest = Observable();
var intervalName = Observable();
var intervalMins = Observable();
var intervalSecs = Observable();
var intervalPauseMins = Observable();
var intervalPauseSecs = Observable();
var intervalReps = Observable();
var intervalRepsSliderValue = Observable();

intervalRepsSliderValue.value = 1;

intervalRepsSliderValue.addSubscriber(getNumberOFRepeats)

function getNumberOFRepeats() {
	intervalReps.value = parseInt(intervalRepsSliderValue.value, 10);
}

var intervalLegTest = function (mins, secs, pauseMins, pauseSecs) {
	this.mins = mins;
	this.secs = secs;
	this.pauseMins = pauseMins;
	this.pauseSecs = pauseSecs;
}

var intervalTest = function(name, intervalLegList) {
	this.name = name;
	this.intervalLegList = intervalLegList;
}



function addInterval() {
	console.log("Adding item to intervalList!");
	console.log("Interval name: " + intervalName.value);
	console.log("Interval minutes: " + intervalMins.value);
	console.log("Interval seconds: " + intervalSecs.value);
	console.log("Pause minutes: " + intervalPauseMins.value);
	console.log("Pause seconds: " + intervalPauseSecs.value);
	console.log("Interval reps: " + intervalReps.value);

	for(i=1;i<=intervalReps.value;i++)
		intervalLegListTest.add(new intervalLegTest(intervalMins.value, intervalSecs.value, intervalPauseMins.value, intervalPauseSecs.value));

	console.log(intervalLegListTest.length);
	console.log("Interval added!");

	intervalMins.value = "";
	intervalSecs.value = "";
	intervalPauseMins.value = "";
	intervalPauseSecs.value = "";
	intervalRepsSliderValue.value = 1;

	console.log("cleaned up!");
}

function saveInterval() {
	console.log("Save interval");
	var intervalTestInstans = new intervalTest(intervalName.value, intervalLegListTest.value);
	console.log(intervalTestInstans)
	console.log("Write to disk");

	console.log("Time to clean up");

	intervalMins.value = "";
	intervalSecs.value = "";
	intervalPauseMins.value = "";
	intervalPauseSecs.value = "";
	intervalRepsSliderValue.value = 1;
	intervalName.value = "";
	//TODO denne funker ikke heeelt...
	intervalLegListTest.value = null;

	//TODO goBack, krever ny refakturering av navigasjon ved å legge til en router, slik at man kan navigere med javascript, se:
	//https://www.fusetools.com/docs/navigation/navigation
}


var intervalLegListElements = intervalLegListTest.map(function (x, i) {
  return {
    element: x,
    max_index: intervalLegListTest.count() - 1,
    index: i +1
  };
});


module.exports = {
	intervalLegListTest: intervalLegListTest,
	intervalName: intervalName,
	intervalMins: intervalMins,
	intervalSecs: intervalSecs,
	intervalPauseMins: intervalPauseMins,
	intervalPauseSecs: intervalPauseSecs,
	intervalReps: intervalReps,
	intervalRepsSliderValue: intervalRepsSliderValue,
	addInterval: addInterval,
	intervalLegListElements: intervalLegListElements,
	saveInterval: saveInterval
};
