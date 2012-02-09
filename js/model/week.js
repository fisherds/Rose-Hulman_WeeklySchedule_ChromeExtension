
/**
 * @fileoverview Holds the data to represent the grid cells.
 * Week is an array of 5 Day objects, which have 10 Cell objects each.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Week');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.Day');
goog.require('rosegrid.model.Period');
goog.require('rosegrid.model.Weekday');



/**
 * Creates a full week model of all the cell models.
 * @param {Array.<rosegrid.model.Day>=} items array of Day objects.
 * @constructor
 */
rosegrid.model.Week = function(items) {

  if (!items) {
    items = [];
    items.push(new rosegrid.model.Day(rosegrid.model.Weekday.MONDAY));
    items.push(new rosegrid.model.Day(rosegrid.model.Weekday.TUESDAY));
    items.push(new rosegrid.model.Day(rosegrid.model.Weekday.WEDNESDAY));
    items.push(new rosegrid.model.Day(rosegrid.model.Weekday.THURSDAY));
    items.push(new rosegrid.model.Day(rosegrid.model.Weekday.FRIDAY));
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
   * @type {Array.<rosegrid.model.Day>}
   * @private
   */
  this.dayModels_ = goog.array.clone(items);
};


/**
 * Returns a shallow copy of the Day model objects.
 * @return {Array.<rosegrid.model.Day>} Days in this week.
 */
rosegrid.model.Week.prototype.getDayModels = function() {
  return goog.array.clone(this.dayModels_);
};


/**
 * Returns the Day for a given weekday.
 * @param {rosegrid.model.Weekday} weekday weekday to get.
 * @return {rosegrid.model.Day} the Day for the passed Weekday.
 */
rosegrid.model.Week.prototype.getDayModel = function(weekday) {
  return this.dayModels_[weekday];
};


/**
 * Returns the cell model for a given weekday and period.
 * @param {rosegrid.model.Weekday} weekday weekday to get.
 * @param {rosegrid.model.Period} period Zero based, index 0 = 1st Period.
 * @return {rosegrid.model.Cell} Cell located at the given weekday/period.
 */
rosegrid.model.Week.prototype.getCellModel = function(weekday, period) {
  return this.dayModels_[weekday].getCellModel(period);
};


/**
 * Returns the cell model for a given numeric index.  Monday 1st hour = 0,
 * Friday 10th hour = 49.
 * @param {number} numericIndex index value 0 to 49 for the Cell model.
 * @return {rosegrid.model.Cell} Cell located at the passed numericIndex.
 */
rosegrid.model.Week.prototype.getCellModelByNumericIndex =
    function(numericIndex) {
  var cellIndex =
      rosegrid.model.CellIndex.convertNumericIndexToCellIndex(numericIndex);
  return this.getCellModelByCellIndex(cellIndex);
};


/**
 * Returns the cell model for a given cell index.
 * @param {rosegrid.model.CellIndex} cellIndex the CellIndex to retrieve.
 * @return {rosegrid.model.Cell} Cell located at the passed CellIndex.
 */
rosegrid.model.Week.prototype.getCellModelByCellIndex = function(cellIndex) {
  return this.dayModels_[cellIndex.weekday].getCellModel(cellIndex.period);
};
