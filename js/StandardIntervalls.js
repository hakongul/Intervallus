var Observable = require("FuseJS/Observable");

var standardIntervalls = Observable();

standardIntervalls.add({name:"4x4", subtext:"Completed 0 times"})
standardIntervalls.add({name:"6x6", subtext:"Completed 5 times"})

module.exports = {
	standardIntervalls: standardIntervalls
};