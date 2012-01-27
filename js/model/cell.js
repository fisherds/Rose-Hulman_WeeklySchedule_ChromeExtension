/**
 * @fileoverview Holds data to represent a single cell in the grid.
 *  Includes the course name, room number, connections to other cells,
 *  and the course color.
 */

goog.provide('rosegrid.model.Cell');

goog.require('goog.string');



/**
 * Creates an object that holds the data for a Cell.
 * Holds a link back to the course.
 *
 * @param {rosegrid.model.Course=} course parent course that this cell belongs to
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @constructor
 */
rosegrid.model.Cell = function(course, courseName, roomNumber) {

  /**
   * Holds the string that will be displayed in the bottom of the cell.
   * @type {rosegrid.model.Course}
   */
  this.course = course;
  
  /**
   * Holds the string that will be displayed in the top of the cell.
   * @type {string}
   */
  this.courseName = courseName || '';

  /**
   * Holds the string that will be displayed in the bottom of the cell.
   * @type {string}
   */
  this.roomNumber = roomNumber || '';
};


/**
 * Sets multiple properties of the model.Cell using the cellModelProperties.
 *   It's a set all properties that exist function.
 * @param {Object=} cellModelProperties Object with new properties for the model.Cell.
 */
rosegrid.model.Cell.prototype.setProperties = function(cellModelProperties) {
  if (cellModelProperties) {
    if (!goog.string.isEmptySafe(cellModelProperties.courseName)) {
      this.courseName = cellModelProperties.courseName;
    }
    if (!goog.string.isEmptySafe(cellModelProperties.roomNumber)) {
      this.roomNumber = cellModelProperties.roomNumber;
    }
  }
};
