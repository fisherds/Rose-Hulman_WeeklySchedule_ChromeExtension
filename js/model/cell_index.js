
/**
 * @fileoverview Represents the location of a cell model within in the week.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.CellIndex');
goog.provide('rosegrid.model.Period');
goog.provide('rosegrid.model.Weekday');

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
 * @param {rosegrid.model.Weekday} weekday weekday enum value.
 * @param {rosegrid.model.Period} period period of the day enum value.
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
 * Compares this CellIndex to another CellIndex to determine if they are equal.
 * @param {rosegrid.model.CellIndex} anotherCellIndex comparison CellIndex.
 * @return {boolean} true if the Cell Index properties match.
 */
rosegrid.model.CellIndex.prototype.equals = function(anotherCellIndex) {
  return this.weekday == anotherCellIndex.weekday &&
      this.period == anotherCellIndex.period;
};


/**
 * Creates a new CellIndex that is a copy of the existing CellIndex.
 * @return {rosegrid.model.CellIndex} the new CellIndex.
 */
rosegrid.model.CellIndex.prototype.clone = function() {
  return new rosegrid.model.CellIndex(this.weekday, this.period);
};


/**
 * Static method to convert a cell index into a numeric index value (0 to 49).
 * Example: WEDNESDAY THIRD_HOUR is numeric index 24 (day * 10 + period).
 *
 * @param {rosegrid.model.CellIndex} cellIndex the CellIndex to convert.
 * @return {number} equivalent numerical value to the passed CellIndex.
 */
rosegrid.model.CellIndex.convertCellIndexToNumericIndex = function(cellIndex) {
  return cellIndex.weekday * 10 + cellIndex.period;
};


/**
 * Static method to convert a numeric value (0 to 49) into a cell index.
 * Example: Numeric index 40 is FRIDAY FIRST_HOUR (day = i / 10, period i % 10).
 *
 * @param {number} numericIndex numerical index (0 to 49) of the cell.
 * @return {rosegrid.model.CellIndex} equivalent CellIndex to the numeric value.
 */
rosegrid.model.CellIndex.convertNumericIndexToCellIndex =
    function(numericIndex) {
  var weekday = Math.floor(numericIndex / 10);
  var period = numericIndex % 10;
  return new rosegrid.model.CellIndex(
      /** @type {rosegrid.model.Weekday} */ (weekday),
      /** @type {rosegrid.model.Period} */ (period));
};
