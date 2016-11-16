var Observable = require("FuseJS/Observable");

var standardIntervalls = Observable();

standardIntervalls.add({name:"4x4", subtext:"Completed 0 times"})
standardIntervalls.add({name:"6x6", subtext:"Completed 5 times"})
standardIntervalls.add({name:"20x1", subtext:"Completed 5 times"})
standardIntervalls.add({name:"Tabata", subtext:"Completed 5 times"})
standardIntervalls.add({name:"Håkons spesial", subtext:"Completed 5 times"})

function intervalClicked()
{
    router.push("intervall");
}

module.exports = {
	standardIntervalls: standardIntervalls,
	intervalClicked: intervalClicked
};