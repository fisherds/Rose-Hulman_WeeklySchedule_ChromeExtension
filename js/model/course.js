/**
 * @fileoverview Represents the data necessary to define a course.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Course');

goog.require('rosegrid.model.CellGroup');

/**
 *
 * @param {rosegrid.model.Week} weekModel the model object representing all the cell models
 * @param {Array.<rosegrid.CellGroup>} cellGroups list of the cell groups holding the course meeting times
 * @constructor
 */
rosegrid.model.Course = function(weekModel, cellGroups) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   */
  this.weekModel_ = weekModel;

  /**
   * List of the cell groups holding the course meeting times.
   * @type {Array.<rosegrid.CellGroup>}
   */
  this.cellGroups_ = cellGroups;
};

/**
 * Returns a clone of the Array of cell groups.
 * @returns {Array.<rosegrid.CellGroup>}
 */
rosegrid.model.Course.prototype.getCellGroups = function() {
  return goog.array.clone(this.cellGroups_);
};