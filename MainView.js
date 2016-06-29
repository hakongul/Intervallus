var Observable = require("FuseJS/Observable");

//Her skal vi legge inn sidene våre
var buttons = Observable();

for(i=1;i<=10;i++)
	buttons.add({text:"Button" + i, subtext:"buttonsubtext" + i})

module.exports = {
	buttons: buttons
};