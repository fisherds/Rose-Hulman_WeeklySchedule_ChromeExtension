/**
 * @fileoverview Holds the data to represent the grid cells.
 * WeekModel is an array of 5 DayModel objects. 
 */

goog.provide('rosegrid.model.Week');
goog.provide('rosegrid.CellIndex');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.Day');
goog.require('rosegrid.Period');
goog.require('rosegrid.Weekday');



/** @typedef {{weekday: rosegrid.Weekday, period: rosegrid.Period}} */
rosegrid.CellIndex;


/**
 * Create a full week model of all the cell models.
 * @param {Array.<rosegrid.model.Day>=} items
 * @constructor
 */
rosegrid.model.Week = function(items) {

  if (!items) {
    items = [];
  	items.push(new rosegrid.model.Day(rosegrid.Weekday.MONDAY));
  	items.push(new rosegrid.model.Day(rosegrid.Weekday.TUESDAY));
  	items.push(new rosegrid.model.Day(rosegrid.Weekday.WEDNESDAY));
  	items.push(new rosegrid.model.Day(rosegrid.Weekday.THURSDAY));
  	items.push(new rosegrid.model.Day(rosegrid.Weekday.FRIDAY));
  }
  
  if (items.length != 5) {
    throw Error('Week must have 5 days');
  }
  for (var i = 0; i < 5; i++) {
    if (items[i].getWeekday() != i) {
      throw Error('Week must have the correct 5 days');
    }
  }

  /**
   * @type {!Array.<rosegrid.model.Day>}
   * @private
   */
   this.dayModels_ = goog.array.clone(items);
};


/** @return {!Array.<rosegrid.model.Day>} */
rosegrid.model.Week.prototype.getDayModels = function() {
  return goog.array.clone(this.dayModels_);
};


/** 
 * Returns the DayModel for a given weekday.
 * @param {rosegrid.Weekday} weekday
 * @return {rosegrid.model.Day} 
 */
rosegrid.model.Week.prototype.getDayModel = function(weekday) {
  return this.dayModels_[weekday];
};


/** 
 * Returns the cell model for a given weekday and period.
 * @param {rosegrid.Weekday} weekday
 * @param {rosegrid.Period} period Zero based, index 0 = 1st Period
 * @return {rosegrid.model.Cell} 
 */
rosegrid.model.Week.prototype.getCellModel = function(weekday, period) {
  return this.dayModels_[weekday].getCellModel(period);
};


/** 
 * Returns the cell model for a given index (Monday 1st hour = 0, Friday 10th hour = 49)
 * @param {number} index
 * @return {rosegrid.model.Cell} 
 */
rosegrid.model.Week.prototype.getCellModelByIndex = function(index) {
  var weekday = Math.floor(index / 10);
  var period = index % 10;
  return this.dayModels_[weekday].getCellModel(period);
};


/** 
 * Returns the cell model for a given cell index
 * @param {rosegrid.CellIndex} cellIndex
 * @return {rosegrid.model.Cell} 
 */
rosegrid.model.Week.prototype.getCellModelByCellIndex = function(cellIndex) {
  return this.dayModels_[cellIndex.weekday].getCellModel(cellIndex.period);
};
