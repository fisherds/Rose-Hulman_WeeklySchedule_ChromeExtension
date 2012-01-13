/*
* @fileOverview Controller for the popup.html window.
* Loads appropriate listens and other initialization work.
* Attempts to delegate as much work as reasonably possible to other modules.
*
* @author David Fisher (fisherds@gmail.com)
*/

goog.provide('exprosegrid.PopupWindow');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');
goog.require('goog.ui.Dialog');


/**
* Popup controller for the Popup page.
* @constructor
*/
exprosegrid.PopupWindow = function(container) {
	
	window.console.log("Created a popup");
	
	goog.dom.getElement('top_title').innerHTML = "Rose-Hulman Weekly Schedule";
	
	var baseButtonClass = goog.getCssName('rg-cell');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new goog.ui.Control(
        	goog.dom.createDom('table', null, '',
        	  goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'course-name'], 'name')
              ), goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'room-number'], 'loc')
              )
            )
        );
		control.render(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
	
	
};

// TODO: Make something like this more elegant
exprosegrid.PopupWindow.prototype.dialog_ = new goog.ui.Dialog();


exprosegrid.PopupWindow.prototype.handleAction_ = function(e) {
	goog.dom.getElement('top_title').innerHTML = "Clicked button";
	e.target.setCaption('Done');
    this.dialog_.setContent('<form>Course name: <input id="dialog-course-name" type="text"><br>Room number:<input id="dialog-room-number" type="text"><br></form>');
    this.dialog_.setTitle('Course info');
    this.dialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);    
    goog.events.listen(this.dialog_, goog.ui.Dialog.EventType.SELECT, this.handleDialogClose_);
	this.dialog_.setVisible(true);
}

exprosegrid.PopupWindow.prototype.handleDialogClose_ = function(e) {
  	  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
	  window.console.log("dialogEvent.key = " + dialogEvent.key);
	  var name = goog.dom.getElement('dialog-course-name').value;
	  window.console.log("Course Name = " + name );
	  
	  var room = goog.dom.getElement('dialog-room-number').value;
	  window.console.log("Room number = " + room );
  
}

goog.events.listen(window, goog.events.EventType.LOAD, function() {
		var popup = new exprosegrid.PopupWindow(document.body);
		window.console.log("Loading fake popup");
});
