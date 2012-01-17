/*
* @fileOverview Controller for the popup.html window.
* Loads the Soy data and appropriate listens, plus other initialization work.
* Attempts to delegate as much work as reasonably possible to other modules.
*
* @author David Fisher (fisherds@gmail.com)
*/

goog.provide('rosegrid.PopupWindow');

goog.require('goog.debug');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Console');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Control');
goog.require('goog.ui.Dialog');
goog.require('rosegrid.templates');
goog.require('rosegrid.ui.Cell');
goog.require('rosegrid.WeekModel');

/**
* Popup controller for the Popup page.
* @constructor
*/
rosegrid.PopupWindow = function(container) {
	
	var daysOfTheWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	var pageTitle = "Rose-Hulman Weekly Schedule";
	var soyData = {days: daysOfTheWeek, title: pageTitle};
	goog.soy.renderElement(goog.dom.getElement('popup'), rosegrid.templates.popupWindowBody, soyData);
	
	goog.dom.getElement('top_title').innerHTML = "Rose-Hulman Weekly Schedule";
	
	var baseButtonClass = goog.getCssName('button-cell');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		/*
		var control = new goog.ui.Control(
        	goog.dom.createDom('table', null, '',
        	  goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'course-name'], '')
              ), goog.dom.createDom('tr', null, '',
                goog.dom.createDom('td', ['cell-inner', 'room-number'], '')
              )
            )
        );
        */
        var control = new rosegrid.ui.Cell();
		control.render(button);
		
		goog.events.listen(control, goog.ui.Component.EventType.ACTION, 
			goog.bind(this.handleAction_, this));
	}
	    
	this.dialog_.setTitle('Course info');
    this.dialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);    
    goog.events.listen(this.dialog_, goog.ui.Dialog.EventType.SELECT, goog.bind(this.handleDialogClose_, this));
    
	//shout, severe, warning, info, config, fine, finer, finest
    goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
    var logconsole = new goog.debug.Console();
    logconsole.setCapturing(true);
	this.logger.info('Popup constructed');
};

rosegrid.PopupWindow.prototype.logger = goog.debug.Logger.getLogger('rosegrid.PopupWindow');

rosegrid.PopupWindow.prototype.dialog_ = new goog.ui.Dialog();

rosegrid.PopupWindow.prototype.handleAction_ = function(e) {
	this.lastButton = /** @type {Element} */ e.target.getElement() ;
	 
    this.dialog_.setContent('<form>Course name: <input id="dialog-course-name" type="text"><br>Room number:<input id="dialog-room-number" type="text"><br></form>');

	this.dialog_.setVisible(true);
}

rosegrid.PopupWindow.prototype.handleDialogClose_ = function(e) {
  	  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
	  var name = goog.dom.getElement('dialog-course-name').value;
	  var room = goog.dom.getElement('dialog-room-number').value;
  
	var nameCell = goog.dom.getElementsByTagNameAndClass(null, 'course-name', this.lastButton)[0];
	var roomCell = goog.dom.getElementsByTagNameAndClass(null, 'room-number', this.lastButton)[0];
	nameCell.innerHTML = name;
	roomCell.innerHTML = room;
	this.logger.warning(name);
}