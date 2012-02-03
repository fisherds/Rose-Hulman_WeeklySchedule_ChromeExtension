/**
 * @fileOverview Wrapper around the course dialog box.
 * Coordinates the communication of the course dialog box  
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.ui.CourseEditor');

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

/**
 * Control that displays a single cell in the Rose grid.
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
   * The course this dialog is editing.
   * @type {rosegrid.model.Course}
   */
  this.course_;

  this.init_();
};

/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.ui.CourseEditor.prototype.logger = goog.debug.Logger.getLogger('rosegrid.ui.CourseEditor');

rosegrid.ui.CourseEditor.prototype.init_ = function() {
  this.courseDialog_.setTitle('Add new course');
  this.courseDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  this.courseDialog_.setHasTitleCloseButton(true);
  this.courseDialog_.setEscapeToCancel(true);
  
  this.courseDialog_.setContent(rosegrid.templates.courseDialog.dialogTabBar());
  goog.events.listen(this.courseDialog_, goog.ui.Dialog.EventType.SELECT,
      goog.bind(this.handleDialogClose_, this));

  this.courseDialog_.render();
  
  var start = new goog.ui.TabBar();
  start.decorate(goog.dom.getElement('dialog-tabbar'));
  goog.events.listen(start, goog.ui.Component.EventType.SELECT,
      function(e) {
        var tabSelected = e.target;
        var contentElement = goog.dom.getElement('dialog-tabbar-content');
        
        if (tabSelected.getCaption() == 'Course') {
          goog.soy.renderElement(contentElement, rosegrid.templates.courseDialog.course);
        } else if (tabSelected.getCaption() == 'Schedule') {
          goog.soy.renderElement(contentElement, rosegrid.templates.courseDialog.schedule);
        } else {
          goog.dom.setTextContent(
                  contentElement,
                  'You selected the "' + tabSelected.getCaption() + '" tab.');
        }
      });
};

rosegrid.ui.CourseEditor.prototype.setVisible = function(isVisible) {
  this.courseDialog_.setVisible(isVisible);  
};

/**
 * Handle a button press from the Dialog. 
 */
rosegrid.ui.CourseEditor.prototype.handleDialogClose_ = function(e) {
  var dialogEvent = /** type {goog.ui.Dialog.Event} */ (e);
  if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
//    var nameValue = goog.dom.getElement('dialog-course-name').value;
//    var roomValue = goog.dom.getElement('dialog-room-number').value;
//    
//    // TODO: Figure out how to use the updateDisplay with the final system
//    this.activeCell.getModel().courseName = nameValue;
//    this.activeCell.getModel().roomNumber = roomValue;
//    
//    
//    //var newValues = {courseName: nameValue, roomNumber: roomValue};
//    this.activeCell.updateDisplay();
    

    this.logger.info('OK pressed');
  } else if (dialogEvent.key == goog.ui.Dialog.DefaultButtonKeys.CANCEL) {
    this.logger.info('Cancel pressed');
  } else {
    this.logger.info('Unknown button');
  }
};