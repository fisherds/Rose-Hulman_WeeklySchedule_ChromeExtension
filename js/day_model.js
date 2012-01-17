/**
 * @fileoverview Holds the data to represent the grid cells.
 * CellModel: 
 *  Holds the data representing a single cell in the grid.
 *  Includes the course name and room number.
 * DayModel:
 *   An array of 10 CellModel objects.
 * FullWeekModel:
 *   An array of 5 DayModel objects. 
 */

goog.provide('rosegrid.CellModel');
goog.provide('rosegrid.DayModel');
goog.provide('rosegrid.Period');
goog.provide('rosegrid.Weekday');

goog.require('goog.array');

/** @typedef {{courseName:string, roomNumber:string}} */
rosegrid.CellModel;

/** @enum {number} */
rosegrid.Weekday = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4
};

/** @enum {number} */
rosegrid.Period = {
  FIRST_HOUR: 0,
  SECOND_HOUR: 1,
  THIRD_HOUR: 2,
  FOURTH_HOUR: 3,
  FIFTH_HOUR: 4,
  SIXTH_HOUR: 5,
  SEVENTH_HOUR: 6,
  EIGHTH_HOUR: 7,
  NINTH_HOUR: 8,
  TENTH_HOUR: 9
};

/**
 * @param {rosegrid.Weekday} weekday The day of the week
 * @param {Array.<rosegrid.CellModel>=} items The cells in this day
 * @constructor
 */
rosegrid.DayModel = function(weekday, items) {

  if (!items) {
    items = [];
    for(var period = 0; period < 10; period++) {
      items.push({courseName: '', roomNumber: ''});
    }
  }

  /**
   * @type {!rosegrid.Weekday}
   */
   this.weekday_ = weekday;
   
  /**
   * @type {!Array.<rosegrid.CellModel>}
   */
   this.cellModels_ = goog.array.clone(items);
};


/**
 * @return {rosegrid.Weekday}
 */
rosegrid.DayModel.prototype.getWeekday = function() {
  return this.weekday_;
};


/**
 * @return {!Array.<rosegrid.CellModel>}
 */
rosegrid.DayModel.prototype.getCellModels = function() {
  return goog.array.clone(this.cellModels_);
};


/**
 * @param {number} period Zero based, index 0 = 1st Period
 * @return {!rosegrid.CellModel}
 */
rosegrid.DayModel.prototype.getCellModel = function(period) {
  return this.cellModels_[period];
};


/**
 * @param {number} period Zero based, index 0 = 1st Period
 * @param {!rosegrid.CellModel} cellModel Single cell 
 */
rosegrid.DayModel.prototype.setCellModel = function(period, cellModel) {
  this.cellModels_[period] = cellModel;
};

// TODO: Consider removing this convenience methods.
/**
 * @param {number} period Zero based, index 0 = 1st Period
 * @param {string} courseName Name of a course 
 */
rosegrid.DayModel.prototype.setCellModelCourseName = function(period, courseName) {
  this.cellModels_[period].courseName = courseName;
};


/**
 * @param {number} period Zero based, index 0 = 1st Period
 * @param {string} roomNumber Location of the course 
 */
rosegrid.DayModel.prototype.setCellModelRoomNumber = function(period, roomNumber) {
  this.cellModels_[period].roomNumber = roomNumber;
};


