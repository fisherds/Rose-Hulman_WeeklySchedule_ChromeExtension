/**
 * @fileoverview Interface that defines getter methods for cell model properties.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.CellProperties');

/**
 * An interface that represents the properties of a cell model object.
 * @interface
 */
rosegrid.model.CellProperties = function() {};

/**
 * Get the name of the course.
 * @return {string} name of the course
 */
rosegrid.model.CellProperties.prototype.getCourseName = function() {};


/**
 * Get the room number where the course meets.
 * @return {string} room location for this course
 */
rosegrid.model.CellProperties.prototype.getRoomNumber = function() {};

/**
 * Get the background color used in the table cells for this course.
 * @return {string} table cell background color as hex a string
 */
rosegrid.model.CellProperties.prototype.getCellBackgroundColor = function() {};

/**
 * Get the name of the course.
 * @return {string} table cell text color as a hex string.
 */
rosegrid.model.CellProperties.prototype.getCellTextColor = function() {};
