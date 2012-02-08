/**
 * @fileoverview Holds the data to represent a day of classes.
 *   An array of 10 rosegrid.model.Cell objects.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Day');

goog.require('goog.array');
goog.require('rosegrid.model.Weekday');
goog.require('rosegrid.model.Period');
goog.require('rosegrid.model.Cell');



/**
 * @param {rosegrid.model.Weekday} weekday The day of the week
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
   * @type {rosegrid.model.Weekday}
   */
   this.weekday_ = weekday;
   
  /**
   * @type {Array.<rosegrid.model.Cell>}
   */
   this.cellModels_ = goog.array.clone(items);
};


/**
 * @return {rosegrid.model.Weekday}
 */
rosegrid.model.Day.prototype.getWeekday = function() {
  return this.weekday_;
};


/**
 * @return {Array.<rosegrid.model.Cell>}
 */
rosegrid.model.Day.prototype.getCellModels = function() {
  return goog.array.clone(this.cellModels_);
};


/**
 * @param {rosegrid.model.Period} period Zero based, index 0 = 1st Period
 * @return {rosegrid.model.Cell}
 */
rosegrid.model.Day.prototype.getCellModel = function(period) {
  return this.cellModels_[period];
};
