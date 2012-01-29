/**
 * @fileoverview Holds the data to represent a day of classes.
 *   An array of 10 rosegrid.model.Cell objects.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Day');
goog.provide('rosegrid.Period');
goog.provide('rosegrid.Weekday');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');


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
 * @param {Array.<rosegrid.model.Cell>=} items The cells in this day
 * @constructor
 */
rosegrid.model.Day = function(weekday, items) {

  if (!items) {
    items = [];
    for(var period = 0; period < 10; period++) {
      items.push(new rosegrid.model.Cell());
    }
  }
  
  if (items.length != 10) {
    throw Error('Day must have 10 cells');
  }

  /**
   * @type {rosegrid.Weekday}
   */
   this.weekday_ = weekday;
   
  /**
   * @type {Array.<rosegrid.model.Cell>}
   */
   this.cellModels_ = goog.array.clone(items);
};


/**
 * @return {rosegrid.Weekday}
 */
rosegrid.model.Day.prototype.getWeekday = function() {
  return this.weekday_;
};


/**
 * @return {!Array.<rosegrid.model.Cell>}
 */
rosegrid.model.Day.prototype.getCellModels = function() {
  return goog.array.clone(this.cellModels_);
};


/**
 * @param {number} period Zero based, index 0 = 1st Period
 * @return {rosegrid.model.Cell}
 */
rosegrid.model.Day.prototype.getCellModel = function(period) {
  return this.cellModels_[period];
};
