var Observable = require("FuseJS/Observable");

var intervals = Observable();

function removeInterval(interval) {
	intervals.remove(interval.data);
}

for(i=1;i<=20;i++)
	intervals.add({name:"Interval" + i, subtext:"buttonsubtext" + i})

module.exports = {
	intervals: intervals,
	removeInterval: removeInterval
};
