var Observable = require("FuseJS/Observable");

var intervalLegList = Observable();
var intervalName = Observable();
var intervalMins = Observable();
var intervalSecs = Observable();
var intervalPauseMins = Observable();
var intervalPauseSecs = Observable();
var intervalReps = Observable();
var intervalRepsSliderValue = Observable();
var addIntervalButton = Observable();
var areEditingInterval = Observable();
var indexOfInterval = Observable();

addIntervalButton.value = "Add to inverval";
areEditingInterval.value = false;

intervalRepsSliderValue.value = 1;

intervalRepsSliderValue.addSubscriber(getNumberOFRepeats)
areEditingInterval.addSubscriber(toggleAddIntervalButtonText)

function getNumberOFRepeats() {
	intervalReps.value = parseInt(intervalRepsSliderValue.value, 10);
}

function toggleAddIntervalButtonText(){
	if(areEditingInterval.value) {
		addIntervalButton.value = "Update interval leg";
	} else {
		addIntervalButton.value = "Add to inverval";
	}
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

function validateInput() {
	if(intervalMins.value == null || intervalMins.value == "") {
		intervalMins.value = 0;
	}
	if(intervalSecs.value == null || intervalSecs.value == "") {
		intervalSecs.value = 0;
	}
	if(intervalPauseMins.value == null || intervalPauseMins.value == "") {
		intervalPauseMins.value = 0;
	}
	if(intervalPauseSecs.value == null || intervalPauseSecs.value == "") {
		intervalPauseSecs.value = 0;
	}

	//TODO Legg til validering paa at intervall og pause ikke kan være på 0 sekunder
	//TODO Legg til validering paa at input er tall
}



function addInterval() {
	
	validateInput()

	if(areEditingInterval.value) {
		console.log("Edit interval Leg");
		var tempIntervalList = Observable();
	    for(i=0;i<intervalLegList.length;i++){
	    	if(i == indexOfInterval.value) {
				tempIntervalList.add(new intervalLegTest(intervalMins.value, intervalSecs.value, intervalPauseMins.value, intervalPauseSecs.value));
			} else {
				tempIntervalList.add(intervalLegList.getAt(i));
			} 
	    }

	    deleteAllIntervallLegs();

	    tempIntervalList.forEach(function(interval) {
	        intervalLegList.add(interval)
	    });

	} else {
		console.log("Adding item to intervalList!");
		for(i=1;i<=intervalReps.value;i++)
		intervalLegList.add(new intervalLegTest(intervalMins.value, intervalSecs.value, intervalPauseMins.value, intervalPauseSecs.value));
		console.log("Interval added!");
	}

	clearInputElements();
	areEditingInterval.value = false;
}



function editInterval(interval) {
	console.log("edit interval with index " + interval.data.index);
	intervalMins.value = interval.data.element.mins;
	intervalSecs.value = interval.data.element.secs;
	intervalPauseMins.value = interval.data.element.pauseMins;
	intervalPauseSecs.value = interval.data.element.pauseSecs;

	areEditingInterval.value = true;
	indexOfInterval.value = interval.data.index-1;
}

function removeInterval(interval) {
	console.log("Removing interval");
	console.log("hoggorm 1: " + interval.data.element.mins);
	if(areEditingInterval && interval.data.index-1 == indexOfInterval.value) {
		areEditingInterval.value = false;
		clearInputElements();
	} else if(areEditingInterval && interval.data.index-1 < indexOfInterval.value) {
		indexOfInterval.value = indexOfInterval.value - 1;
	}
	intervalLegList.remove(interval.data.element);
}

function saveInterval() {
	console.log("Save interval");
	var intervalTestInstans = new intervalTest(intervalName.value, intervalLegList.value);
	console.log(intervalTestInstans)
	console.log("Write to disk");

	console.log("Time to clean up");

	clearInputElements();
	intervalName.value = "";
	deleteAllIntervallLegs();

	//TODO goBack, krever ny refakturering av navigasjon ved å legge til en router, slik at man kan navigere med javascript, se:
	//https://www.fusetools.com/docs/navigation/navigation
}

function clearInputElements() {
	intervalMins.value = "";
	intervalSecs.value = "";
	intervalPauseMins.value = "";
	intervalPauseSecs.value = "";
	intervalRepsSliderValue.value = 1;
}

function deleteAllIntervallLegs() {
	for(i=0; i<=intervalLegList.length; i++){
		intervalLegList.forEach(function(place) {
			intervalLegList.remove(place);
	    });
	    i = 0;
	}
}

var intervalLegListElements = intervalLegList.map(function (x, i) {
  return {
    element: x,
    max_index: intervalLegList.count() - 1,
    index: i +1
  };
});


module.exports = {
	intervalName: intervalName,
	intervalMins: intervalMins,
	intervalSecs: intervalSecs,
	intervalPauseMins: intervalPauseMins,
	intervalPauseSecs: intervalPauseSecs,
	intervalReps: intervalReps,
	intervalRepsSliderValue: intervalRepsSliderValue,
	addInterval: addInterval,
	intervalLegListElements: intervalLegListElements,
	saveInterval: saveInterval,
	removeInterval: removeInterval,
	editInterval: editInterval,
	addIntervalButton: addIntervalButton
};
