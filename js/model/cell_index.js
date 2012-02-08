/**
 * @fileoverview Represents the location of a cell model within in the week.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Weekday');
goog.provide('rosegrid.model.Period');
goog.provide('rosegrid.model.CellIndex');

goog.require('rosegrid.templates.courseDialog');

/** @enum {number} */
rosegrid.model.Weekday = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4
};


/** @enum {number} */
rosegrid.model.Period = {
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
 * Creates a cell index. 
 * 
 * @param {rosegrid.model.Weekday} weekday
 * @param {rosegrid.model.Period} period
 * @constructor
 */
rosegrid.model.CellIndex = function(weekday, period) {

  /**
   * The weekday for this cell index
   * @type {rosegrid.model.Weekday} 
   */
  this.weekday = weekday;
  
  /**
   * The period (ie hour) for this cell index
   * @type {rosegrid.model.Period} 
   */
  this.period = period;
};


/** @inheritDoc */
rosegrid.model.CellIndex.prototype.toString = function() {
  return rosegrid.templates.courseDialog.displayCellIndex(this);
};


/**
 * Compares this Cell Index to another Cell Index to determine if they are equal.
 * @param {rosegrid.model.CellIndex} anotherCellIndex
 * @return {boolean} true if the Cell Index properties match
 */
rosegrid.model.CellIndex.prototype.equals = function(anotherCellIndex) {
  return this.weekday == anotherCellIndex.weekday && this.period == anotherCellIndex.period;
};

/**
 * Static method to convert a cell index into a numeric index value (0 to 49).
 * 
 * @param {rosegrid.model.CellIndex} cellIndex
 * @return {number}
 */
rosegrid.model.CellIndex.convertCellIndexToNumericIndex = function(cellIndex) {
  return cellIndex.weekday * 10 + cellIndex.period;
};

/**
 * Static method to convert a numeric value (0 to 49) into a cell index.
 * 
 * @param {number} numericIndex
 * @return {rosegrid.model.CellIndex}
 */
rosegrid.model.CellIndex.convertNumericIndexToCellIndex = function(numericIndex) {
  var weekday = Math.floor(numericIndex / 10);
  var period = numericIndex % 10;
  return new rosegrid.model.CellIndex(/** @type {rosegrid.model.Weekday} */ (weekday), 
      /** @type {rosegrid.model.Period} */ (period));
};