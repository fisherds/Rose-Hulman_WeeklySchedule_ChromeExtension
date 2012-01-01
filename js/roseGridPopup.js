goog.provide('roseGrid.Popup');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');

/**
* Popup controller for the Popup page.
* @constructor
*/
roseGrid.Popup = function(container) {
	
	goog.dom.getElement('top_title').innerHTML = "Popup called";
	
	var baseButtonClass = goog.getCssName('goog-button');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new goog.ui.Control('');
		control.decorate(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
};

roseGrid.Popup.prototype.handleAction_ = function() {
	goog.dom.getElement('top_title').innerHTML = "Clicked button";
	window.console.log("button clicked");
}
