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
goog.require('rosegrid.templates.popup');
goog.require('rosegrid.ui.CellControl');
goog.require('rosegrid.ui.CourseEditor');
goog.require('rosegrid.model.QuarterSchedule');


goog.require('rosegrid.RoseClock');



/**
 * Controller for the extension's Popup window.
 * @constructor
 */
rosegrid.PopupWindow = function() {

  /**
   * Holds the courses that are in this quarter's schedule.
   * @type {rosegrid.model.QuarterSchedule} 
   */ 
  this.quarterSchedule = rosegrid.model.QuarterSchedule.getInstance();
  
  /**
   * Holds the model objects for the weekly schedule.
   * Just a convenience 
   * @type {rosegrid.model.Week} 
   */ 
  this.weekModel = this.quarterSchedule.getWeekModel();
  
  /**
   * List of all the Control objects in the grid.
   * @type {Array.<rosegrid.ui.CellControl>} 
   */ 
  this.cellControls = [];
  // CONSIDER: These might all be held by the table container and a list here might be unnecessary.

  /**
   * Dialog box to allow course creation and editing.
   * @type {rosegrid.ui.CourseEditor} 
   */ 
  this.courseEditor;
  
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
 * Loads Soy html, adds components to the page, and initializes the dialog box.
 */
rosegrid.PopupWindow.prototype.init_ = function() {

	// Load the html using Soy
	var daysOfTheWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	var soyData = {days: daysOfTheWeek};
	goog.soy.renderElement(goog.dom.getElement('popup'), rosegrid.templates.popup.body, soyData);

	// Render all of the cell controls
	// TODO: Use a container to reduce the number of listeners.
	var baseButtonClass = goog.getCssName('cell-control');
	var buttons = goog.dom.getElementsByClass(baseButtonClass);
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		var control = new rosegrid.ui.CellControl( this.weekModel.getCellModelByNumericIndex(i) );
		this.cellControls.push(control);
		control.render(button);
		goog.events.listen(control, goog.ui.Component.EventType.ACTION,
		    goog.bind(this.cellControlClickListener_, this));
	}
	
	// Initialize the course info dialog.

  for (var i = 0; i < this.cellControls.length; i++) {
    this.cellControls[i].updateDisplay();
  }
  
  // Initialize the logger.
	//Log levels: shout, severe, warning, info, config, fine, finer, finest
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);
  
	this.logger.info('Total number of listeners = ' + goog.events.getTotalListenerCount());
	// Originally 252 prior to adding a container
	

	rosegrid.RoseClock.getInstance().updateOffset();
	
	this.quarterSchedule.loadSavedCourses();
};


/**
 * Handle the click event when a cell control is selected.
 * @param {goog.events.Event} e Event from the cell-control
 */
rosegrid.PopupWindow.prototype.cellControlClickListener_ = function(e) {
  if (this.courseEditor == null) {
    this.courseEditor = new rosegrid.ui.CourseEditor();  
  }
  
  // Figure up the course that was clicked and pass it along
  this.quarterSchedule.getCourseAtIndex();
  
  this.courseEditor.setVisible(true);
};
