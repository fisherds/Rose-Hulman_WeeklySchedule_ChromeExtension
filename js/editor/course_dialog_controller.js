
/**
 * @fileOverview Wrapper around the course dialog box to edit a course.  
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.editor.CourseDialog');


goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.EventTarget');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.string');
goog.require('goog.ui.Control');
goog.require('goog.ui.Dialog');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('rosegrid.model.Week');
goog.require('rosegrid.editor.CellIndicesTabController');
goog.require('rosegrid.editor.DisplayTextTabController');
goog.require('rosegrid.templates.courseDialog');
goog.require('rosegrid.ui.CellControl');
goog.require('rosegrid.model.Course');



/**
 * Creates the editor for this course.  
 *
 * @constructor
 * @extends {goog.EventTarget}
 */
rosegrid.editor.CourseDialog = function() {

  /**
   * Dialog displayed when creating or editing a course.
   * @type {goog.ui.Dialog}
   */
  this.courseDialog_ = null;

  /**
   * The course this editor will modify if a user selects OK after making
   * changes.
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
  this.tempCourseProperties_ = null;

  /**
   * The tab bar that fills the dialog content.
   * @type {goog.ui.TabBar}
   */
  this.contentTabBar = null;
  
  /**
   * The controller for the displayed tab.
   * @type {goog.Disposable} 
   */
  this.tabDisplayed = null;
  
  /**
   * Holds events that should only be removed when the dialog is closed.
   * @type {goog.events.EventHandler}
   */
  this.eventHandler = null;
};
goog.inherits(rosegrid.editor.CourseDialog, goog.EventTarget);


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.editor.CourseDialog.prototype.logger =
    goog.debug.Logger.getLogger('rosegrid.editor.CourseDialog');


/**
 * Displays the course editor dialog box with the data for the given course. If
 * a user hits OK the course is modified and an event is fired.
 * 
 * @param {rosegrid.model.Course} course The course to edit
 * @param {boolean} isNewCourse True if this course is new,
 *     false if this course is existing and needs a delete button
 */
rosegrid.editor.CourseDialog.prototype.launchEditorForCourse =
    function(course, isNewCourse) {

  // Initialize the member variables
  this.eventHandler = new goog.events.EventHandler();
  this.course_ = course;
  this.tempCourseProperties_ = course.clone();

  // Setup the dialog (most complex part).
  this.courseDialog_ = new goog.ui.Dialog();
  this.courseDialog_.setHasTitleCloseButton(true);
  this.courseDialog_.setEscapeToCancel(true);
  this.courseDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  this.eventHandler.listen(this.courseDialog_,
      goog.ui.Dialog.EventType.SELECT,
      goog.bind(this.handleDialogClose_, this));

  if (isNewCourse) {
    this.courseDialog_.setTitle('Add new course');
  } else {
    this.courseDialog_.setTitle('Edit ' + course.officialCourseNumber);
  }
  
  var data = {course: this.course_};
  this.courseDialog_.setContent(
      rosegrid.templates.courseDialog.dialogTabBar(data));
  
  this.courseDialog_.render();
  
  // Now that the data is part of the DOM attach a TabBar container.
  this.contentTabBar = new goog.ui.TabBar();
  this.contentTabBar.decorate(goog.dom.getElement('dialog-tabbar'));
  
  // Listen for tab selections.
  this.eventHandler.listen(this.contentTabBar,
      goog.ui.Component.EventType.SELECT,
      goog.bind(this.handleTabSelection_, this));
    
  // Display the dialog.
  this.courseDialog_.setVisible(true);
};


/**
 * 
 * @param {goog.events.Event} e Event from the tab bar
 */
rosegrid.editor.CourseDialog.prototype.handleTabSelection_ = function(e) {
    var tabSelected = e.target;
    var contentElement = goog.dom.getElement('dialog-tabbar-content');
    while (contentElement.hasChildNodes()) {
      contentElement.removeChild(contentElement.lastChild);
    }
    if (tabSelected.getCaption() == 'Course') {
      this.tabDisplayed = new rosegrid.editor.DisplayTextTabController(contentElement, this.tempCourseProperties_);
//      goog.soy.renderElement(contentElement,
//          rosegrid.templates.courseDialog.courseTab, this.tempCourseProperties_);
      return;
    }
    for (var i = 0; i < this.course_.cellGroups_.length; i++) {
      if (goog.string.caseInsensitiveEndsWith(tabSelected.getElement().id,
          "" + i)) {
        this.tabDisplayed = new rosegrid.editor.CellIndexTabController(contentElement, this.tempCourseProperties_.cellGroups_[i]);
//        goog.soy.renderElement(contentElement,
//            rosegrid.templates.courseDialog.cellGroupScheduleTab,
//            this.course_.cellGroups_[i]);
        return;
      }
    }
    goog.dom.setTextContent(contentElement, 'You selected the "' + tabSelected.getCaption() + '" tab.');
    this.logger.info('handleTabSelection_ Total number of listeners = ' + goog.events.getTotalListenerCount());
};




/**
 * Handle a button press from the Dialog. 
 * @param {goog.ui.Dialog.Event} e Event from the Dialog
 */
rosegrid.editor.CourseDialog.prototype.handleDialogClose_ = function(e) {
  this.logger.info('handleDialogClose_ Total number of listeners = ' + goog.events.getTotalListenerCount());
  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
  if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    this.logger.info('OK pressed');
  } else if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.CANCEL) {
    this.logger.info('Cancel pressed');
  } else {
    this.logger.info('Unknown button');
  }

  this.courseEditor.courseDialog_.setVisible(false);  
  // TODO: Do any necessary cleanup.
  // The dialog content should be completely removed
  // - Remove all listeners
  // - Dispose of all controls
  // - Remove all DOM elements within the Dialog content
  // Dialog title reset to an empty string
  // Button set can remain but delete button and listener is removed if present
  
  this.courseEditor.dispose();
  this.courseEditor = null;
  this.logger.info('handleDialogClose_ Total number of listeners = ' + goog.events.getTotalListenerCount());
};


// *****************************************************************************
// goog.Disposable
// *****************************************************************************
/** @inheritDoc */
rosegrid.editor.CourseDialog.prototype.disposeInternal = function() {
  this.eventHandler.removeAll();
  this.eventHandler.dispose();
  this.contentTabBar.dispose();
  this.courseDialog_.dispose();
  this.tabDisplayed.dispose();
  
  this.eventHandler = null;
  this.contentTabBar = null;
  this.courseDialog_ = null;
  this.course_ = null;
  this.tempCourseProperties_ = null;
  this.tabDisplayed = null;
  this.logger.info('Total number of listeners = ' + goog.events.getTotalListenerCount());
};