/**
 * @fileOverview Primary controller for the popup.html window.
 * Loads Soy data, components, listeners, and other initialization work.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.PopupWindow');

goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Dialog');
goog.require('rosegrid.templates');
goog.require('rosegrid.ui.CellControl');
goog.require('rosegrid.model.Week');



/**
 * Controller for the extension's Popup window.
 * @constructor
 */
rosegrid.PopupWindow = function(container) {
	
	/**
	 * Holds the model objects for the weekly schedule.
	 * @type {rosegrid.model.Week} 
	 */	
	this.weekModel = new rosegrid.model.Week();
	
	/**
	 * Holds the model objects for the weekly schedule.
	 * @type {rosegrid.ui.CellControl} 
	 */	
	this.activeCell;
	
    // CONSIDER: Might want to create an event handler for listener cleanup.
    
	this.init_();
};
// CONSIDER: Might want to subclass Disposable.


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.PopupWindow.prototype.logger = goog.debug.Logger.getLogger('rosegrid.PopupWindow');


/**
 * Dialog displayed when creating or editing a course.
 * @type {goog.ui.Dialog}
 */
rosegrid.PopupWindow.prototype.courseInfoDialog_ = new goog.ui.Dialog();


/**
 * Loads Soy html, adds components to the page, and initializes the dialog box.
 */
rosegrid.PopupWindow.prototype.init_ = function() {

	// Load the html using Soy
	var daysOfTheWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	var soyData = {days: daysOfTheWeek};
	goog.soy.renderElement(goog.dom.getElement('popup'), rosegrid.templates.popupWindowBody, soyData);

	// Render all of the cell controls
	// TODO: Use a container to reduce the number of listeners.
	var baseButtonClass = goog.getCssName('cell-control');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new rosegrid.ui.CellControl( this.weekModel.getCellModelByIndex(i) );
		control.render(button);
		goog.events.listen(control, goog.ui.Component.EventType.ACTION,
		    goog.bind(this.cellControlClickListener_, this));
	}
	
	// Initialize the course info dialog.
	this.courseInfoDialog_.setTitle('Add new course');
    //this.courseInfoDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
    this.courseInfoDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
    
    
    this.courseInfoDialog_.setContent(rosegrid.templates.courseInfoDialog());    
    goog.events.listen(this.courseInfoDialog_, goog.ui.Dialog.EventType.SELECT, goog.bind(this.handleDialogClose_, this));
    
    // Initialize the logger.
	//Log levels: shout, severe, warning, info, config, fine, finer, finest
    goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
    var logconsole = new goog.debug.Console();
    logconsole.setCapturing(true);
    
	this.logger.info('Total number of listeners = ' + goog.events.getTotalListenerCount());
	// Originally 252 prior to adding a container
};


/**
 * Handle the click event when a cell control is selected.
 * @param {goog.events.Event} e Event from the cell-control
 */
rosegrid.PopupWindow.prototype.cellControlClickListener_ = function(e) {

  // Capture which cell was clicked
  this.activeCell = /** @type {rosegrid.ui.CellControl} */ e.target;
  
  // Display the course info dialog
  this.courseInfoDialog_.setVisible(true);
  
  // Load values into the dialog text areas
  var nameEl = goog.dom.getElement('dialog-course-name');
  var roomEl = goog.dom.getElement('dialog-room-number');
  if (nameEl) {
    nameEl.value = this.activeCell.getModel().courseName;
  } else {
	this.logger.info('name value not set. nameEl = ' + nameEl);
  }
  if (roomEl) {
    roomEl.value = this.activeCell.getModel().roomNumber;
  } else {
	this.logger.info('room value not set. roomEl = ' + roomEl);
  }
};


/**
 * Handle a button press from the Dialog. 
 */
rosegrid.PopupWindow.prototype.handleDialogClose_ = function(e) {
  	var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
  	if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
  	  var nameValue = goog.dom.getElement('dialog-course-name').value;
  	  var roomValue = goog.dom.getElement('dialog-room-number').value;
  	  
  	  // TODO: Figure out how to use the updateDisplay with the final system
  	  this.activeCell.getModel().courseName = nameValue;
  	  this.activeCell.getModel().roomNumber = roomValue;
  	  
  	  
  	  //var newValues = {courseName: nameValue, roomNumber: roomValue};
  	  this.activeCell.updateDisplay();
  	  
  	  
    	} else if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.CANCEL) {
    	  this.logger.info('Cancel pressed');
    	} else {
    	  this.logger.info('Unknown button');
    	}
    	

	
};
