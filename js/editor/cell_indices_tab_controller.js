
/**
 * @fileOverview Controller for the tab that allows a user to change the cell
 * indices for a cell group.  
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.editor.CellIndicesTabController');

goog.require('goog.Disposable');
goog.require('rosegrid.model.Course');



/**
 * Creates the cell indices tab controller.  
 *
 * @constructor
 * @extends {goog.Disposable}
 */
rosegrid.editor.CellIndicesTabController = function() {

  
  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   */
  this.eventHandler = null;
};
goog.inherits(rosegrid.editor.CellIndicesTabController, goog.Disposable);
