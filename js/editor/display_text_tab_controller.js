
/**
 * @fileoverview Controller for the tab that allows a user to change the labels
 * of the cell groups, official course number, and course color.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.editor.DisplayTextTabController');

goog.require('goog.Disposable');
goog.require('rosegrid.model.Course');



/**
 * Creates the cell indices tab controller.  
 *
 * @constructor
 * @extends {goog.Disposable}
 */
rosegrid.editor.DisplayTextTabController = function() {
  goog.base(this);

  
  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   */
  this.eventHandler = null;
};
goog.inherits(rosegrid.editor.DisplayTextTabController, goog.Disposable);
