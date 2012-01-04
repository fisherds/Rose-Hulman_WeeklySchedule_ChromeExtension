goog.provide('roseGrid.Popup');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');

/**
* Popup controller for the Popup page.
* @constructor
*/
roseGrid.Popup = function(container) {
	
	window.console.log("Created a popup");
	
	goog.dom.getElement('top_title').innerHTML = "Rose-Hulman Weekly Schedule";
	
	var baseButtonClass = goog.getCssName('goog-button');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new goog.ui.Control('i = ' + i);
		control.decorate(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
};

roseGrid.Popup.prototype.handleAction_ = function(e) {
	goog.dom.getElement('top_title').innerHTML = "Clicked button";
	e.target.setCaption('Done');
}
