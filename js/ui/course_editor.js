
/**
 * @fileoverview Wrapper around the course dialog box.
 * Coordinates the communication of the course dialog box  
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.ui.CourseEditor');

goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.string');
goog.require('goog.ui.Control');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('rosegrid.model.Week');
goog.require('rosegrid.templates.courseDialog');
goog.require('rosegrid.ui.CellControl');
goog.require('rosegrid.model.Course');


//*********************
//  TODO: Delete this file and move to the editor namespace solution
//*********************


/**
 * Creates the editor for this course.  
 *
 * @constructor
 */
rosegrid.ui.CourseEditor = function() {

  /**
   * Dialog displayed when creating or editing a course.
   * @type {goog.ui.Dialog}
   */
  this.courseDialog_ = new goog.ui.Dialog();

  /**
   * The course this dialog will edit if a user selects OK after making changes.
   * Not edited at all until a user hits ok.
   * @type {rosegrid.model.Course}
   */
  this.course_ = null;

  /**
   * Holds the properties of the course during the editing process.
   * For simplicity it is a rosegrid.model.Course, but it has no week model
   * object.  The properties of the course_ get copied into this object at the
   * start of editing and the finished properties are copied back if the user
   * hits OK.
   * @type {rosegrid.model.Course}
   */
  this.tempCourseProperties_ = new rosegrid.model.Course(null);

  this.init_();
};

/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.ui.CourseEditor.prototype.logger =
    goog.debug.Logger.getLogger('rosegrid.ui.CourseEditor');

/**
 * Initialize the Course Editor
 */
rosegrid.ui.CourseEditor.prototype.init_ = function() {
  this.courseDialog_.setHasTitleCloseButton(true);
  this.courseDialog_.setEscapeToCancel(true);
  this.courseDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  var dialogButtonKey = goog.events.listen(this.courseDialog_,
      goog.ui.Dialog.EventType.SELECT,
      goog.bind(this.handleDialogClose_, this));
  
  this.logger.info("Initialized the Dialog Editor");
};

/**
 * Displays the course editor dialog box with the data for the given course. If
 * a user hits OK the course is modified and an event is fired.
 * 
 * @param {rosegrid.model.Course} course the course to edit
 * @param {boolean} isNewCourse true if this course is new,
 *     false if this course is existing and needs a delete button
 */
rosegrid.ui.CourseEditor.prototype.launchEditorForCourse =
    function(course, isNewCourse) {
  this.tempCourseProperties_.setProperties(course);
  this.course_ = course;
  
  this.courseDialog_.setTitle('Add new course');
  
  var data = {course: this.course_};
  this.courseDialog_.setContent(
      rosegrid.templates.courseDialog.dialogTabBar(data));

  this.courseDialog_.render();
  
  var start = new goog.ui.TabBar();
  start.decorate(goog.dom.getElement('dialog-tabbar'));
  
  // TODO: Make an evenet handler so that this listener can be removed
  goog.events.listen(start, goog.ui.Component.EventType.SELECT,
      goog.bind(this.handleTabSelection_, this));
  
  
  this.courseDialog_.setVisible(true);  
};


/**
 * 
 * @param {goog.events.Event} e Event from the tab bar
 */
rosegrid.ui.CourseEditor.prototype.handleTabSelection_ = function(e) {
    var tabSelected = e.target;
    var contentElement = goog.dom.getElement('dialog-tabbar-content');
    while (contentElement.hasChildNodes()) {
      contentElement.removeChild(contentElement.lastChild);
    }
    if (tabSelected.getCaption() == 'Course') {
      goog.soy.renderElement(contentElement,
          rosegrid.templates.courseDialog.courseTab, this.course_);
      return;
    }
    for (var i = 0; i < this.course_.cellGroups_.length; i++) {
      window.console.log("tabSelected.getElement.id = " + tabSelected.getElement().id);
      if (goog.string.caseInsensitiveEndsWith(tabSelected.getElement().id, "" + i)) {
        goog.soy.renderElement(contentElement, rosegrid.templates.courseDialog.cellGroupScheduleTab, this.course_.cellGroups_[i]);
        return;
      }
    }
    goog.dom.setTextContent(contentElement, 'You selected the "' + tabSelected.getCaption() + '" tab.');
};


/**
 * Handle a button press from the Dialog. 
 * @param {goog.ui.Dialog.Event} e Event from the Dialog
 */
rosegrid.ui.CourseEditor.prototype.handleDialogClose_ = function(e) {
  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
  if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    this.logger.info('OK pressed');
  } else if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.CANCEL) {
    this.logger.info('Cancel pressed');
  } else {
    this.logger.info('Unknown button');
  }
  
  // TODO: Do any necessary cleanup.
  // The dialog content should be completely removed
  // - Remove all listeners
  // - Dispose of all controls
  // - Remove all DOM elements within the Dialog content
  // Dialog title reset to an empty string
  // Button set can remain but delete button and listener is removed if present
  
};