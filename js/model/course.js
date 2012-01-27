/**
 * @fileoverview Array of Cells.
 */

goog.provide('rosegrid.model.Course');


/**
 * Creates the governing model object that control the properties in the course meeting times.
 *
 * @param {Array.<rosegrid.CellIndex>} cellModels list of times this course meets
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 */
rosegrid.model.Course = function(cellIndices, courseName, roomNumber, cellBackgroundColor, cellTextColor) {
  
  /**
   * Meeting times for this course.
   * @type {Array.<rosegrid.CellIndex>}
   */
  this.cellIndices_ = cellIndices || [];
  
  /**
   * Holds name for this course.
   * @type {string}
   */
  this.courseName_ = courseName || '';

  /**
   * Holds room location for this course.
   * @type {string}
   */
  this.roomNumber_ = roomNumber || '';

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
rosegrid.model.Course.prototype.getCellModels = function() {

};

