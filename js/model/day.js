
/**
 * @fileoverview Holds the data to represent a day of classes.
 *   An array of 10 rosegrid.model.Cell objects.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Day');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.Period');
goog.require('rosegrid.model.Weekday');



/**
 * Creates a model object to represent a day of classes.
 *
 * @param {rosegrid.model.Weekday} weekday the day of the week.
 * @param {Array.<rosegrid.model.Cell>=} items the cells in this day.
 * @constructor
 */
rosegrid.model.Day = function(weekday, items) {

  if (!items) {
    items = [];
    for (var period = 0; period < 10; period++) {
      items.push(new rosegrid.model.Cell());
    }
  }

  if (items.length != 10) {
    throw Error('Day must have 10 cells');
  }

  /**
   * The day of this model object.
   * @type {rosegrid.model.Weekday}
   * @private
   */
  this.weekday_ = weekday;

  /**
   * The Cell model objects managed by this Day.
   * @type {Array.<rosegrid.model.Cell>}
   * @private
   */
  this.cellModels_ = goog.array.clone(items);
};


/**
 * Returns the name for this Day.
 * @return {rosegrid.model.Weekday} day name for this Day model.
 */
rosegrid.model.Day.prototype.getWeekday = function() {
  return this.weekday_;
};


/**
 * Returns a copy of the Cell models array.
 * @return {Array.<rosegrid.model.Cell>} cell model managed by this Day.
 */
rosegrid.model.Day.prototype.getCellModels = function() {
  return goog.array.clone(this.cellModels_);
};


/**
 * Returns an individual Cell from this Day.
 * @param {rosegrid.model.Period} period period of the Day to get.
 * @return {rosegrid.model.Cell} Cell model for that period.
 */
rosegrid.model.Day.prototype.getCellModel = function(period) {
  return this.cellModels_[period];
};
