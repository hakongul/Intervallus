var Observable = require("FuseJS/Observable");

var intervals = Observable();

function removeInterval(interval) {
	intervals.remove(interval.data);
}

function newIntervalClicked()
{
    router.push("newInterval");
}

function intervalClicked()
{
    router.push("intervall");
}

for(i=1;i<=20;i++)
	intervals.add({name:"Interval" + i, subtext:"buttonsubtext" + i})

module.exports = {
	intervals: intervals,
	removeInterval: removeInterval,
	newIntervalClicked: newIntervalClicked,
	intervalClicked: intervalClicked
};
