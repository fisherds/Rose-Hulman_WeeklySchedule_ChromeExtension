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
	/*
	var baseButtonClass = goog.getCssName('goog-button');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new goog.ui.Control('');
		control.decorate(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
	*/
	
	var c = new goog.ui.Control('Click me');
	c.render(goog.dom.getElement('c'));
	goog.events.listen(c, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
			
	var d = new goog.ui.Control('button 2');
	d.render(goog.dom.getElement('c'));
	goog.events.listen(d, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	
	var e = new goog.ui.Control('button 2');
	e.render(goog.dom.getElement('c'));
	goog.events.listen(e, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
};

roseGrid.Popup.prototype.handleAction_ = function(e) {
	goog.dom.getElement('top_title').innerHTML = "Clicked button";
	e.target.setCaption('You clicked me sucka!');
	window.console.log("button clicked");
}
