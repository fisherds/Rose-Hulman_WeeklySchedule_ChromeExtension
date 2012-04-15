
/**
 * @fileoverview Wrapper around the course dialog box to edit a course.  
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.editor.CourseDialogController');
goog.provide('rosegrid.editor.CourseDialogController.EventType');

goog.require('goog.debug.Logger');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.ui.Dialog');
goog.require('rosegrid.editor.ContentTabBarController');
goog.require('rosegrid.model.Course');



/**
 * Creates the editor for this course.  Displays the course editor dialog box
 * with the data for the given course. If a user hits OK the course is modified
 * and an event is fired.
 *
 * @param {rosegrid.model.Course} course The course to edit.
 * @param {boolean} isNewCourse True if this course is new,
 *     false if this course is existing and needs a delete button.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
rosegrid.editor.CourseDialogController = function(course, isNewCourse) {
  goog.base(this);

  /**
   * The course this editor will modify if a user selects OK after making
   * changes.
   * @type {rosegrid.model.Course}
   */
  this.course_ = course;

  /**
   * Holds the properties of the course during the editing process.
   * For simplicity it is a rosegrid.model.Course, but it has no week model
   * object.  The properties of the course_ get copied into this object at the
   * start of editing and the finished properties are copied back if the user
   * hits OK.
   * @type {rosegrid.model.Course}
   */
  this.tempCourse_ = course.clone();
  //this.tempCourse_.setWeekModel(null);
    
  /**
   * Dialog displayed when creating or editing a course.
   * @type {goog.ui.Dialog}
   */
  this.courseDialog_ = new goog.ui.Dialog();
  
  /**
   * The tab bar controller that will manage the dialog's content.
   * Created after the dialog is rendered.
   * @type {goog.ui.TabBar}
   */
  this.contentTabBarController_ = new rosegrid.editor.ContentTabBarController(
      this.tempCourse_, this.courseDialog_.getContentElement());

  /**
   * Holds events that should only be removed when the dialog is closed.
   * @type {goog.events.EventHandler}
   */
  this.eventHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(rosegrid.editor.CourseDialogController, goog.events.EventTarget);


/**
 * Logger for this class. 
 * @type {goog.debug.Logger}
 */
rosegrid.editor.CourseDialogController.prototype.logger =
    goog.debug.Logger.getLogger('rosegrid.editor.CourseDialogController');


/**
 * Event types that might be dispatched. 
 * @enum {string} 
 */
rosegrid.editor.CourseDialogController.EventType = {
  COURSE_DIALOG_CLOSED: goog.events.getUniqueId('course_dialog_closed')
};


/**
 * Initialize the course dialog and display the dialog.
 * @param {boolean} isNewCourse True if this is a new course being added.
 *     False if this dialog is editing an existing course.
 * @private
 */
rosegrid.editor.CourseDialogController.prototype.init_ = function(isNewCourse) {
  // Setup the dialog.
  this.courseDialog_.setHasTitleCloseButton(true);
  this.courseDialog_.setEscapeToCancel(true);
  this.courseDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  this.eventHandler_.listen(this.courseDialog_, goog.ui.Dialog.EventType.SELECT,
      this.handleDialogClose_);

  if (isNewCourse) {
    this.courseDialog_.setTitle('Add new course');
  } else {
    this.courseDialog_.setTitle('Editing ' +
        this.tempCourse_.officialCourseNumber);
  }
  this.courseDialog_.setVisible(true);
  this.contentTabBarController_.onVisible();
};


/**
 * Handles a button press from the Dialog. 
 * @param {goog.ui.Dialog.Event} e Event from the Dialog
 */
rosegrid.editor.CourseDialogController.prototype.handleDialogClose_ = function(e) {
  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
  if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    this.logger.info('OK pressed');
    this.course_.setProperties(this.tempCourse_);
  } else if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.CANCEL) {
    this.logger.info('Cancel pressed');
  } else {
    this.logger.info('Unknown button pressed');
  }

  //this.courseEditor.courseDialog_.setVisible(false);
  
  // Fire an event
  this.dispatchEvent(
      rosegrid.editor.CourseDialogController.EventType.COURSE_DIALOG_CLOSED);
};


// *****************************************************************************
// goog.Disposable
// *****************************************************************************
/** @inheritDoc */
rosegrid.editor.CourseDialogController.prototype.disposeInternal = function() {
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  goog.dispose(this.contentTabBarController_);
  goog.dispose(this.courseDialog_);
  
  this.eventHandler_ = null;
  this.contentTabBarController_ = null;
  this.courseDialog_ = null;
  this.course_ = null;
  this.tempCourse_ = null;
};