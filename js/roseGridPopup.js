goog.provide('roseGrid.Popup');

goog.require('goog.dom');
goog.require('roseGrid.templates')

/**
* @param {string} message a message to display
*/
roseGrid.Popup.sayHello = function(message) {
	var data = {greeting: message, year: new Date().getFullYear()};
	var html = roseGrid.templates.welcome(data);
	goog.dom.getElement('hello').innerHTML = html;
};

goog.exportSymbol('roseGrid.Popup.sayHello', roseGrid.Popup.sayHello);
