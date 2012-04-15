/**
 * @fileoverview Controller for the extension popup window.
 * Loads Soy data, components, listeners, and other initialization work.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.PopupController');


goog.require('goog.Disposable');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('rosegrid.templates.popup');
goog.require('rosegrid.ui.CellControl');
goog.require('rosegrid.ui.TableContainer');
//goog.require('rosegrid.editor.CourseDialogController');
goog.require('rosegrid.model.QuarterSchedule');



/**
 * Controller for the extension's Popup window.
 * @param {!Element} container The container element for this controller.
 * @constructor
 * @extends goog.Disposable
 */
rosegrid.PopupController = function(container) {

  /**
   * Body element of the popup.html page.
   * @type {!Element}
   * @private
   */
  this.container_ = container;
  
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

//  /**
//   * Dialog box to allow course creation and editing.
////   * @type {rosegrid.ui.CourseEditor} 
//   * @type {rosegrid.editor.CourseDialogController}
//   */ 
//  this.courseEditor;
  
  
  
  // CONSIDER: Might want to create an event handler for listener cleanup.
    
	this.init_();
};
goog.inherits(rosegrid.PopupController, goog.Disposable);


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.PopupController.prototype.logger =
    goog.debug.Logger.getLogger('rosegrid.PopupController');


/**
 * Loads Soy html, adds components to the page, and initializes the dialog box.
 */
rosegrid.PopupController.prototype.init_ = function() {

	// Load the html using Soy
	var daysOfTheWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	var soyData = {days: daysOfTheWeek};
	goog.soy.renderElement(this.container_, rosegrid.templates.popup.body, soyData);

  this.quarterSchedule.loadSavedCourses();

	// The table values will be updated when they are constructed.
  var table = goog.dom.getElementsByTagNameAndClass('table')[0];
	var tableContainer = new rosegrid.ui.TableContainer(this.weekModel);
	tableContainer.decorate(table);
	
	for (var i = 0; i < tableContainer.getChildCount(); i++) {
	  goog.events.listen(tableContainer.getChildAt(i),
	      goog.ui.Component.EventType.ACTION,
	      goog.bind(this.cellControlClickListener_, this));	  
	}
	
  
	this.logger.info('Total number of listeners = ' + goog.events.getTotalListenerCount());
	// Originally 252 prior to adding a container
};


/**
 * Handle the click event when a cell control is selected.
 * @param {goog.events.Event} e Event from the cell-control
 */
rosegrid.PopupController.prototype.cellControlClickListener_ = function(e) {
  this.logger.info("cellControlClickListener_");
//  if (!this.courseEditor) {
//    this.logger.info("Made a new course editor");
//    this.courseEditor = new rosegrid.editor.CourseDialogController();
//  }
//  
//  // Figure up the course that was clicked and pass it along
//  var cellControl = /** @type {rosegrid.ui.CellControl} */ (e.target);
//  var cellModel = cellControl.getModel();
//  var cellIndex = this.weekModel.getCellIndexForCellModel(cellModel);
//  var course = this.quarterSchedule.getCourseAtCellIndex(cellIndex);
//  var isNewCourse = false;
//  if (course == null) {
//    course = new rosegrid.model.Course(this.weekModel);
//    isNewCourse = true;
//  }
//  this.courseEditor.launchEditorForCourse(course, isNewCourse);
  
//  goog.events.listen(this.courseEditor.courseDialog_,
//      goog.ui.Dialog.EventType.SELECT,
//      goog.bind(this.handleDialogClose_, this));
};


/** @override */
rosegrid.PopupController.prototype.disposeInternal = function() {
  
};
