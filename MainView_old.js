var Observable = require("FuseJS/Observable");

//Her skal vi legge inn sidene våre
var pages = Observable();

pages.add({title: "New interval", handle: "newInterval"});
var secondIntervalPage = {title: "secondInterval", handle: "secondInterval"};
pages.add(secondIntervalPage)

//Startsiden til appen
var mainPage = {title: "Main page", handle: "mainPage"};

//Dette er variabelen som holder på nåværende side. Denne oppdateres etterhvert som bruker navigerer. Settes til mainPage som start
var currentPage = Observable(mainPage);

//Metoder for å retunere page handle og title
var currentPageHandle = currentPage.map(function(x){
	return x.handle;
});

var currentPageTitle = currentPage.map(function(x){
	return x.title;
});

function pageButtonClicked(arg){
	currentPage.value = arg.data;
}

function secondIntervalButtonClicked(arg){
	currentPage.value = secondIntervalPage;
}

function goBack(arg){
	currentPage.value = mainPage;
}

module.exports = {
	pages: pages,
	currentPage: currentPage,
	currentPageHandle: currentPageHandle,
	currentPageTitle: currentPageTitle,
	pageButtonClicked: pageButtonClicked,
	secondIntervalButtonClicked: secondIntervalButtonClicked,
	goBack: goBack
};