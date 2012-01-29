/**
 * @fileoverview Represents the data necessary to define a course.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Course');

goog.require('rosegrid.model.CellProperties');

/**
 *
 * @param {rosegrid.model.Week} weekModel the model object representing all the cell models
 * @param {Array.<rosegrid.CellIndex>} cellIndices list of the times this course meets
 * @param {string=} courseName title of the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 */
rosegrid.model.Course = function(weekModel, courseName, cellBackgroundColor, cellTextColor) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   */
  this.weekModel_ = weekModel;

  /**
   * Holds name for this course.
   * @type {string}
   */
  this.courseName_ = courseName || '';


  /**
   * Cell background color hexString.
   * @type {string}
   */
  this.cellBackgroundColor_ = cellBackgroundColor || '#fff';

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.cellTextColor_ = cellTextColor || '#000';
  
};


/**
 * 
 */
rosegrid.model.Course.prototype.updateAllCellGroups = function() {

};
