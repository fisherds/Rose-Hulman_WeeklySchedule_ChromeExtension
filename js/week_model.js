/**
 * @fileoverview Holds the data to represent the grid cells.
 * WeekModel is an array of 5 DayModel objects. 
 */

goog.provide('rosegrid.WeekModel');

goog.require('goog.array');
goog.require('rosegrid.DayModel');



/**
 * Create a full week model of all the cell models.
 * @param {Array.<rosegrid.DayModel>=} items
 * @constructor
 */
rosegrid.WeekModel = function(items) {

  if (!items) {
    items = [];
  	items.push(new rosegrid.DayModel(rosegrid.Weekday.MONDAY));
  	items.push(new rosegrid.DayModel(rosegrid.Weekday.TUESDAY));
  	items.push(new rosegrid.DayModel(rosegrid.Weekday.WEDNESDAY));
  	items.push(new rosegrid.DayModel(rosegrid.Weekday.THURSDAY));
  	items.push(new rosegrid.DayModel(rosegrid.Weekday.FRIDAY));
  }

  /**
   * @type {!Array.<rosegrid.DayModel>}
   * @private
   */
   this.dayModels_ = goog.array.clone(items);
};


/** @return {!Array.<rosegrid.DayModel>} */
rosegrid.WeekModel.prototype.getDayModels = function() {
  return goog.array.clone(this.dayModels_);
};


/** 
 * Returns the DayModel for a given weekday.
 * @param {rosegrid.Weekday} weekday
 * @return {rosegrid.DayModel} 
 */
rosegrid.WeekModel.prototype.getDayModel = function(weekday) {
  return this.dayModels_[weekday];
};


/** 
 * Returns the cell model for a given weekday and period.
 * @param {rosegrid.Weekday} weekday
 * @param {number} period Zero based, index 0 = 1st Period
 * @return {rosegrid.CellModel} 
 */
rosegrid.WeekModel.prototype.getCellModel = function(weekday, period) {
  return this.dayModels_[weekday].getCellModel(period);
};
