/**
 * @fileoverview Represents the data necessary to define a course.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Course');

goog.require('rosegrid.model.CellProperties');

/**
 * Creates the governing model object that control the properties in the course meeting times.
 *
 * @param {rosegrid.model.Week} weekModel the model object representing all the cell models
 * @param {Array.<rosegrid.CellIndex>} cellIndices list of the times this course meets
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
rosegrid.model.Course = function(weekModel, cellIndices,
    courseName, roomNumber, cellBackgroundColor, cellTextColor) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   */
  this.weekModel_ = weekModel;

  /**
   * Meeting times for this course.
   * @type {Array.<rosegrid.CellIndex>}
   */
  this.cellIndices_ = cellIndices;
  
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
rosegrid.model.Course.prototype.updateAllCellModels = function() {
	for (var i = 0; i < this.cellIndices_; i++) {
		var cellIndex = this.cellIndices_[i];
		var cellModel = this.weekModel_.getCellModelByCellIndex(cellIndex);
		cellModel.setProperties(this);
	}

};



/** @inheritDoc */
rosegrid.model.Course.prototype.getCourseName = function() {
  return this.courseName;
};

/** @inheritDoc */
rosegrid.model.Course.prototype.getRoomNumber = function() {
  return this.roomNumber;
};

/** @inheritDoc */
rosegrid.model.Course.prototype.getCellBackgroundColor = function() {
  return this.cellBackgroundColor;
};

/** @inheritDoc */
rosegrid.model.Course.prototype.getCellTextColor = function() {
  return this.cellTextColor;
};