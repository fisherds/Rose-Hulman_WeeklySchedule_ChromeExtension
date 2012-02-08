/**
 * @fileoverview Holds data to represent a single cell in the grid.
 *  Includes the course name, room number, connections to other cells,
 *  and the course color.
 *  
 *  @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Cell');

goog.require('goog.string');
goog.require('rosegrid.model.CellProperties');


/**
 * Creates an object that holds the data for a Cell.
 *
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
rosegrid.model.Cell = function(courseName, roomNumber, cellBackgroundColor, cellTextColor) {
  
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

  /**
   * Cell background color hexString.
   * @type {string}
   */
  this.cellBackgroundColor = cellBackgroundColor || rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR;

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.cellTextColor = cellTextColor || rosegrid.model.Cell.DEFAULT_TEXT_COLOR;
};

/**
 * Default cell background color hexString (white).
 * @type {string}
 * @const
 */
rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR = '#fff';

/**
 * Default cell text color hexString (black).
 * @type {string}
 * @const
 */
rosegrid.model.Cell.DEFAULT_TEXT_COLOR = '#000';

/**
 * Resets the values of the cell to default values.
 */
rosegrid.model.Cell.prototype.clear = function() {
  this.courseName = '';
  this.roomNumber = '';
  this.cellBackgroundColor = '#fff';
  this.cellTextColor = '#000';
};


/**
 * Sets the properties of the model.Cell using the cellModelProperties.
 * @param {rosegrid.model.CellProperties} cellModelProperties Object with new properties for the model.Cell.
 */
rosegrid.model.Cell.prototype.setProperties = function(cellModelProperties) {
  this.courseName = cellModelProperties.getCourseName();
  this.roomNumber = cellModelProperties.getRoomNumber();
  this.cellBackgroundColor = cellModelProperties.getCellBackgroundColor();
  this.cellTextColor = cellModelProperties.getCellTextColor();
};

/** @inheritDoc */
rosegrid.model.Cell.prototype.getCourseName = function() {
  return this.courseName;
};

/** @inheritDoc */
rosegrid.model.Cell.prototype.getRoomNumber = function() {
  return this.roomNumber;
};

/** @inheritDoc */
rosegrid.model.Cell.prototype.getCellBackgroundColor = function() {
  return this.cellBackgroundColor;
};

/** @inheritDoc */
rosegrid.model.Cell.prototype.getCellTextColor = function() {
  return this.cellTextColor;
};
