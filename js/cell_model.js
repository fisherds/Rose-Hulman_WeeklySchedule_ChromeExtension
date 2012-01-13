/*
 * @fileoverview Holds the data to represent the grid cells.
 * CellModel: 
 *  Holds the data representing a single cell in the grid.
 *  Includes the course name and room number.
 * FullWeekModel:
 *   An 
 */

goog.provide('rosegrid.CellModel');
goog.provide('rosegrid.FullWeekModel');

goog.require('goog.array');

/** @typedef {{courseName:string, roomNumber:string}} */
rosegrid.CellModel;


/**
 * @param {Array.<Array.<rosegrid.CellModel>>=} items
 * @constructor
 */
rosegrid.FullWeekModel = function(items) {

  if (!items) {
    items = [];
  	for (var day = 0; day < 5; day++) {
  	  var oneDay = [];
  	  for(var period = 0; period < 10; period++) {
  	    goog.array.push(oneDay, {courseName: '', roomNumber: ''});
  	  }
  	  goog.array.push(items, oneDay);
  	}
  }

  /**
   * @type {Array.<Array.<rosegrid.CellModel>>}
   * @private
   */
   this.cells_ = goog.array.clone(items);
};


/** @enum {number} */
rosegrid.FullWeekModel.Weekday = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4
};


/** @return {Array.<Array.<rosegrid.CellModel>>} */
rosegrid.FullWeekModel.prototype.getCells = function() {
  return goog.array.clone(this.items_);
};


/** 
 * Returns the cells for a weekday.
 * @param {rosegrid.FullWeekModel.Weekday} weekday
 * @return {Array.<rosegrid.CellModel>} 
 */
rosegrid.FullWeekModel.prototype.getDay = function(weekday) {
  return goog.array.clone(this.items_[weekday]);
};


/** 
 * Returns the cells for a weekday.
 * @param {rosegrid.FullWeekModel.Weekday} weekday
 * @return {Array.<rosegrid.CellModel>} 
 */
rosegrid.FullWeekModel.prototype.getDay = function(weekday) {
  return goog.array.clone(this.items_[weekday]);
};