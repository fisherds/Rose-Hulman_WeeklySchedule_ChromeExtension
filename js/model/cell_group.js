/**
 * @fileoverview Represents the data necessary to define a group of cells.
 * All cell models in a group have the exact some properties.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.CellGroup');

goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.Day');
goog.require('rosegrid.model.Week');
goog.require('rosegrid.model.CellProperties');

/**
 * Creates a governing object that controls the properties of a cell model group.
 * A course could consist of a single CellGroup or multiple cell groups.
 * For example a course that has a lab in a different location would have two CellGroups.
 * One CellGroup for the class meeting times and another CellGroup for the lab cells.
 *
 * @param {rosegrid.model.Week} weekModel the model object representing all the cell models
 * @param {Array.<rosegrid.CellIndex>} cellIndices list of the cells in this group
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
rosegrid.model.CellGroup = function(weekModel, cellIndices,
    courseName, roomNumber, cellBackgroundColor, cellTextColor) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   * @private
   */
  this.weekModel_ = weekModel;

  /**
   * Meeting times for this course.
   * @type {Array.<rosegrid.CellIndex>}
   * @private
   */
  this.cellIndices_ = cellIndices;
  
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
   * Cell background color hexString.
   * @type {string}
   */
  this.cellBackgroundColor = cellBackgroundColor || '#fff';

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.cellTextColor = cellTextColor || '#000';
  
};

/**
 * Adds these CellIndex objects to the group and updates all cell models to current properties.
 * 
 * @param {Array.<rosegrid.CellIndex>} newCellIndices CellIndex objects to add to this group.
 */
rosegrid.model.CellGroup.prototype.addCellModels = function(newCellIndices) {
  for (var i = 0; i < newCellIndices.length; i++) {
    goog.array.insert(this.cellIndices_, newCellIndices[i]);  
  }
  this.updateAllCellModels();
};

/**
 * 
 * @param removeCellIndices
 */
rosegrid.model.CellGroup.prototype.removeCellModels = function(removeCellIndices) {

  for (var i = 0; i < newCellIndices.length; i++) {
    goog.array.insert(this.cellIndices_, newCellIndices[i]);  
  }
  this.updateAllCellModels();
};

/**
 * 
 */
rosegrid.model.CellGroup.prototype.updateAllCellModels = function() {
  for (var i = 0; i < this.cellIndices_; i++) {
    var cellIndex = this.cellIndices_[i];
    var cellModel = this.weekModel_.getCellModelByCellIndex(cellIndex);
    cellModel.setProperties(this);
  }

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
