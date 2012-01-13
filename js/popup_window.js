/*
* @fileOverview Controller for the popup.html window.
* Loads appropriate listens and other initialization work.
* Attempts to delegate as much work as reasonably possible to other modules.
*
* @author David Fisher (fisherds@gmail.com)
*/

goog.provide('rosegrid.PopupWindow');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');
goog.require('goog.ui.Dialog');


/**
* Popup controller for the Popup page.
* @constructor
*/
rosegrid.PopupWindow = function(container) {
	
	goog.dom.getElement('top_title').innerHTML = "Rose-Hulman Weekly Schedule";
	
	
	
	var baseButtonClass = goog.getCssName('rg-cell');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new goog.ui.Control(
        	goog.dom.createDom('table', null, '',
        	  goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'course-name'], '')
              ), goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'room-number'], '')
              )
            )
        );
		control.render(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
	
	
};

rosegrid.PopupWindow.prototype.dialog_ = new goog.ui.Dialog();

rosegrid.PopupWindow.prototype.handleAction_ = function(e) {
	this.lastButton = /** @type {Element} */ e.target.getElement() ;
	 
    this.dialog_.setContent('<form>Course name: <input id="dialog-course-name" type="text"><br>Room number:<input id="dialog-room-number" type="text"><br></form>');
    this.dialog_.setTitle('Course info');
    this.dialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);    
    goog.events.listen(this.dialog_, goog.ui.Dialog.EventType.SELECT, goog.bind(this.handleDialogClose_, this));
	this.dialog_.setVisible(true);
}

rosegrid.PopupWindow.prototype.handleDialogClose_ = function(e) {
  	  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
	  window.console.log("dialogEvent.key = " + dialogEvent.key);
	  var name = goog.dom.getElement('dialog-course-name').value;
	  window.console.log("Course Name = " + name );
	  
	  var room = goog.dom.getElement('dialog-room-number').value;
	  window.console.log("Room number = " + room );
  
  
	var nameCell = goog.dom.getElementsByTagNameAndClass(null, 'course-name', this.lastButton)[0];
	var roomCell = goog.dom.getElementsByTagNameAndClass(null, 'room-number', this.lastButton)[0];
	nameCell.innerHTML = name;
	roomCell.innerHTML = room;
}