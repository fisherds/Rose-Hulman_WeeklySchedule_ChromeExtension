
/**
 * @fileoverview Controller for the tab that allows a user to change the labels
 * of the cell groups, official course number, and course color.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.editor.ContentTabBarController');

goog.require('goog.Disposable');
goog.require('goog.soy');
goog.require('rosegrid.model.Course');
goog.require('rosegrid.editor.CellIndicesTabController');
goog.require('rosegrid.editor.DisplayTextTabController');
goog.require('rosegrid.templates.courseDialog');



/**
 * Creates a tab bar and swaps out the tab displayed in the 
 * 
 * @param {Element} dialogContent The 
 * @extends {goog.Disposable}
 * @constructor
 */
rosegrid.editor.ContentTabBarController = function(dialogContent, tempCourse) {
  goog.base(this);
  
  /**
   * The controller for the displayed tab.
   * @type {goog.Disposable} 
   */
  this.tabDisplayed = null;

  /**
   * The temporary course that will be edited in real time.
   * @type {rosegrid.model.Course}
   */
  this.tempCourse_ = tempCourse;

  /**
   * The tab bar that is displayed in the dialog content.
   * @type {goog.ui.TabBar}
   */
  this.contentTabBar = new goog.ui.TabBar();  
  

  /**
   * Holds events that should only be removed when the dialog is closed.
   * @type {goog.events.EventHandler}
   */
  this.eventHandler_ = new goog.events.EventHandler(this);
};
goog.inherits(rosegrid.editor.CourseDialog, goog.Disposable);


/**
 * 
 */
rosegrid.editor.ContentTabBarController.prototype.init_ = function() {
  
//  var data = {course: this.tempCourse_};
//  goog.soy.renderElement(dialogContent,
//      rosegrid.templates.courseDialog.dialogTabBar, data);
//
//  this.contentTabBar.decorate(goog.dom.getElement('dialog-tabbar'));
//  
//  // Listen for tab selections.
//  this.eventHandler.listen(this.contentTabBar,
//      goog.ui.Component.EventType.SELECT,
//      goog.bind(this.handleTabSelection_, this));
};


/**
 * 
 */
rosegrid.editor.ContentTabBarController.prototype.onVisible = function() {
  
};


/**
 * 
 * @param {goog.events.Event} e Event from the tab bar
 */
rosegrid.editor.ContentTabBarController.prototype.handleTabSelection_ = function(e) {
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



//*****************************************************************************
//goog.Disposable
//*****************************************************************************
/** @inheritDoc */
rosegrid.editor.CourseDialog.prototype.disposeInternal = function() {
this.eventHandler.removeAll();
goog.dispose(this.eventHandler);
goog.dispose(this.tabDisplayed);

this.eventHandler = null;
this.tempCourseProperties_ = null;
this.tabDisplayed = null;
};
