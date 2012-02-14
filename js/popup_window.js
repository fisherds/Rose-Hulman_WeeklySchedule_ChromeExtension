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
goog.require('rosegrid.ui.TableContainer');

goog.require('rosegrid.ui.CourseEditor');
goog.require('rosegrid.editor.CourseDialog');

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
   * Holds the model objects for the weekly schedule. Convenience reference. 
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
//   * @type {rosegrid.ui.CourseEditor} 
   * @type {rosegrid.editor.CourseDialog}
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

  this.quarterSchedule.loadSavedCourses();

	// The table values will be updated when they are constructed.
  var table = goog.dom.getElementsByTagNameAndClass('table')[0];
	window.console.log("table " + table);
	var tableContainer = new rosegrid.ui.TableContainer(this.weekModel);
	tableContainer.decorate(table);
	
	for (var i = 0; i < tableContainer.getChildCount(); i++) {
	  goog.events.listen(tableContainer.getChildAt(i),
	      goog.ui.Component.EventType.ACTION,
	      goog.bind(this.cellControlClickListener_, this));	  
	}
	
  // Initialize the logger.
	//Log levels: shout, severe, warning, info, config, fine, finer, finest
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);
  
	this.logger.info('Total number of listeners = ' + goog.events.getTotalListenerCount());
	// Originally 252 prior to adding a container
	

	rosegrid.RoseClock.getInstance().updateOffset();
};


/**
 * Handle the click event when a cell control is selected.
 * @param {goog.events.Event} e Event from the cell-control
 */
rosegrid.PopupWindow.prototype.cellControlClickListener_ = function(e) {
  if (this.courseEditor == null) {
    this.logger.info("Made a new course editor");
    //this.courseEditor = new rosegrid.ui.CourseEditor();
    this.courseEditor = new rosegrid.editor.CourseDialog();
  }
  
  // Figure up the course that was clicked and pass it along
  var cellControl = /** @type {rosegrid.ui.CellControl} */ (e.target);
  var cellModel = cellControl.getModel();
  var cellIndex = this.weekModel.getCellIndexForCellModel(cellModel);
  var course = this.quarterSchedule.getCourseAtCellIndex(cellIndex);
  var isNewCourse = false;
  if (course == null) {
    course = new rosegrid.model.Course(this.weekModel);
    isNewCourse = true;
  }
  this.courseEditor.launchEditorForCourse(course, isNewCourse);
  
  goog.events.listen(this.courseEditor.courseDialog_,
      goog.ui.Dialog.EventType.SELECT,
      goog.bind(this.handleDialogClose_, this));
};
