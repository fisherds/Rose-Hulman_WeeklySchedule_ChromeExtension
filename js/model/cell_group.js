
/**
 * @fileoverview Represents the data necessary to define a group of cells that
 * have identical properties.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.CellGroup');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.CellIndex');
goog.require('rosegrid.model.CellProperties');
goog.require('rosegrid.model.Day');
goog.require('rosegrid.model.Period');
goog.require('rosegrid.model.Week');
goog.require('rosegrid.model.Weekday');



/**
 * Creates an object that controls the properties of a cell model group.  A
 * course could consist of a single CellGroup or multiple cell groups.  For
 * example a course that has a lab in a different location would have two
 * CellGroups.  One CellGroup for the class meeting times and another CellGroup
 * for the lab cells.  Note, all the cell models get updated at the time of
 * construction.
 *
 * @param {rosegrid.model.Week} weekModel All the cell models.
 * @param {string=} cellBackgroundColor Color of the cells for this course.
 * @param {string=} cellTextColor Color of the text for this course.
 * @param {string=} courseName Title of the course to display.
 * @param {string=} roomNumber Location for the course to display.
 * @param {Array.<rosegrid.model.CellIndex>=} cellIndices Array of cell
 *     indices that are controlled by this cell group.
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
rosegrid.model.CellGroup = function(weekModel, cellBackgroundColor,
    cellTextColor, courseName, roomNumber, cellIndices) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   * @private
   */
  this.weekModel_ = weekModel;

  /**
   * Cell background color hexString.
   * @type {string}
   */
  this.cellBackgroundColor = cellBackgroundColor ||
      rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR;

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.cellTextColor = cellTextColor || rosegrid.model.Cell.DEFAULT_TEXT_COLOR;

  /**
   * Holds name for this course.
   * @type {string}
   */
  this.courseName = courseName || '';

  /**
   * Holds room location for this course.
   * @type {string}
   */
  this.roomNumber = roomNumber || '';

  /**
   * Meeting times for this course.
   * @type {Array.<rosegrid.model.CellIndex>}
   * @private
   */
  this.cellIndices_ = cellIndices || [];

  this.updateAllCellModels();
};


/**
 * Resets all the cell model objects in the cellIndicies, then resets all of the
 * properties to their defaults values.
 */
rosegrid.model.CellGroup.prototype.clear = function() {
  this.cellBackgroundColor = rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR;
  this.cellTextColor = rosegrid.model.Cell.DEFAULT_TEXT_COLOR;
  this.courseName = '';
  this.roomNumber = '';
  for (var i = 0; i < this.cellIndices_.length; i++) {
    var cellIndex = this.cellIndices_[i];
    var cellModel = this.weekModel_.getCellModelByCellIndex(cellIndex);
    cellModel.clear();
  }
  this.cellIndices_ = [];
};


/**
 * Adds these CellIndex objects to the group and updates all cell models to
 * current properties.
 *
 * @param {Array.<rosegrid.model.CellIndex>} newCellIndices CellIndex objects to
 * add to this group.
 */
rosegrid.model.CellGroup.prototype.addCellIndices = function(newCellIndices) {
  for (var i = 0; i < newCellIndices.length; i++) {
    if (!this.containsCellIndex(newCellIndices[i])) {
      this.cellIndices_.push(newCellIndices[i]);
    }
  }
  this.updateAllCellModels();
};


/**
 * Removes the CellIndex objects from the group and resets those cells.
 *
 * @param {Array.<rosegrid.model.CellIndex>} cellIndices Cell indices to remove.
 */
rosegrid.model.CellGroup.prototype.removeCellIndices =
    function(cellIndices) {
  for (var i = 0; i < cellIndices.length; i++) {
    var removeIndex = this.findCellIndex(cellIndices[i]);
    if (removeIndex > -1) {
      this.weekModel_.getCellModelByCellIndex(cellIndices[i]).clear();
      goog.array.removeAt(this.cellIndices_, removeIndex);
    }
  }
};


/**
 * Updates the CellModel objects
 */
rosegrid.model.CellGroup.prototype.updateAllCellModels = function() {
  for (var i = 0; i < this.cellIndices_.length; i++) {
    var cellIndex = this.cellIndices_[i];
    var cellModel = this.weekModel_.getCellModelByCellIndex(cellIndex);
    cellModel.setProperties(this);
  }
};


/**
 * Finds the cell index within the cellIndices_.  Uses the actual values of the
 * cell index and matches the values (not required to be the same object).
 *
 * @param {rosegrid.model.CellIndex} cellIndex CellIndex to search for.
 * @return {number} The location of the cell index within cellIndices_.
 *     Returns -1 if the cell index is not found.
 */
rosegrid.model.CellGroup.prototype.findCellIndex = function(cellIndex) {
  for (var i = 0; i < this.cellIndices_.length; i++) {
    if (this.cellIndices_[i].equals(cellIndex)) {
      return i;
    }
  }
  return -1;
};


/**
 * Determines if the cellIndex is contained in this cell group.
 *
 * @param {rosegrid.model.CellIndex} cellIndex CellIndex to search for.
 * @return {boolean} Returns true if the cellIndex is found, otherwise false.
 */
rosegrid.model.CellGroup.prototype.containsCellIndex = function(cellIndex) {
  return this.findCellIndex(cellIndex) != -1;
};


/**
 * Creates a new CellGroup object with the same properties.  Note this is a
 * shallow copy that reuses the cell index objects in the array.  This is
 * acceptable because the cell index objects should be created as immutable.
 *
 * @return {rosegrid.model.CellGroup} the new CellGroup.
 */
rosegrid.model.CellGroup.prototype.clone = function() {
  return new rosegrid.model.CellGroup(this.weekModel_, this.cellBackgroundColor,
      this.cellTextColor, this.courseName, this.roomNumber,
      goog.array.clone(this.cellIndices_));
};


/**
 * Returns a copy of the cell indices managed by this cell group.
 * @return {Array.<rosegrid.model.CellIndex>} List of Cell indices in the group.
 */
rosegrid.model.CellGroup.prototype.getCellIndices = function() {
  return goog.array.clone(this.cellIndices_);
};


/** @inheritDoc */
rosegrid.model.CellGroup.prototype.getCourseName = function() {
  return this.courseName;
};


/** @inheritDoc */
rosegrid.model.CellGroup.prototype.getRoomNumber = function() {
  return this.roomNumber;
};


/** @inheritDoc */
rosegrid.model.CellGroup.prototype.getCellBackgroundColor = function() {
  return this.cellBackgroundColor;
};


/** @inheritDoc */
rosegrid.model.CellGroup.prototype.getCellTextColor = function() {
  return this.cellTextColor;
};
