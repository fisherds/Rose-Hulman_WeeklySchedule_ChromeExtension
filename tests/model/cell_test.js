/**
 * @fileoverview Unit tests for the model/day.js file.
 */

/** Objects under test. */
var blankCell;
var me430Cell;

/**
 * Creates an test object that holds the data for a Cell.
 *
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
var testCellProperties = function(courseName, roomNumber, cellBackgroundColor, cellTextColor) {
  this.courseName = courseName || '';
  this.roomNumber = roomNumber || '';
  this.cellBackgroundColor = cellBackgroundColor || '#fff';
  this.cellTextColor = cellTextColor || '#000';
};
testCellProperties.prototype.getCourseName = function() {
  return this.courseName;};
testCellProperties.prototype.getRoomNumber = function() {
  return this.roomNumber;};
testCellProperties.prototype.getCellBackgroundColor = function() {
  return this.cellBackgroundColor;};
testCellProperties.prototype.getCellTextColor = function() {
  return this.cellTextColor;};

function setUp() {
  blankCell = new rosegrid.model.Cell();
  me430Cell = new rosegrid.model.Cell('ME430 Mechatronics', 'C111');
}

function testCellModel() {
  assertEquals('ME430 Mechatronics', me430Cell.courseName);
  assertEquals('C111', me430Cell.roomNumber);
  assertEquals('', blankCell.courseName);
  assertEquals('', blankCell.roomNumber);
}

function testSetProperties() {
  var newProperties1 = new testCellProperties('Test 1', 'DL201');  
  blankCell.setProperties(newProperties1);
  assertEquals('Test 1', blankCell.courseName);
  assertEquals('DL201', blankCell.roomNumber);
  
  var newProperties2 = new testCellProperties('Test 2');
  me430Cell.setProperties(newProperties2);
  assertEquals('Test 2', me430Cell.courseName);
  assertEquals('', me430Cell.roomNumber);
}

function testClear() {
  me430Cell.clear();
  assertEquals('', me430Cell.courseName);
  assertEquals('', me430Cell.roomNumber);
}
