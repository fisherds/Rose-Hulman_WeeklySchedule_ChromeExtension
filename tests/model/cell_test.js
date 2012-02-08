/**
 * @fileoverview Unit tests for the js/model/cell.js file.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

/** Objects under test. */
var blankCell;
var me430Cell;

/**************************************************************************************************
 * Start - Mock class that implements CellProperties 
 *************************************************************************************************/
/**
 * Creates an mock class that holds the data for a Cell.
 *
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 * @param {string=} cellBackgroundColor color of the cells for this course
 * @param {string=} cellTextColor color of the text in the cells for this course
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
var mockCellProperties = function(courseName, roomNumber, cellBackgroundColor, cellTextColor) {
  this.courseName = courseName || '';
  this.roomNumber = roomNumber || '';
  this.cellBackgroundColor = cellBackgroundColor || '#fff';
  this.cellTextColor = cellTextColor || '#000';
};
/** @inheritDoc */
mockCellProperties.prototype.getCourseName = function() { return this.courseName; };
/** @inheritDoc */
mockCellProperties.prototype.getRoomNumber = function() { return this.roomNumber; };
/** @inheritDoc */
mockCellProperties.prototype.getCellBackgroundColor = function() { return this.cellBackgroundColor; };
/** @inheritDoc */
mockCellProperties.prototype.getCellTextColor = function() { return this.cellTextColor; };

/**************************************************************************************************
 * End - Mock class that implements CellProperties 
 *************************************************************************************************/
  
function setUp() {
  blankCell = new rosegrid.model.Cell();
  me430Cell = new rosegrid.model.Cell('ME430 Mechatronics', 'C111');
  ma111Cell = new rosegrid.model.Cell('MA111', 'O213', '#800', '#111');
}

function testCellModel() {
  assertEquals('ME430 Mechatronics', me430Cell.courseName);
  assertEquals('C111', me430Cell.roomNumber);
  assertEquals('', blankCell.courseName);
  assertEquals('', blankCell.roomNumber);
  assertEquals('MA111', ma111Cell.courseName);
  assertEquals('O213', ma111Cell.roomNumber);
  assertEquals('#800', ma111Cell.cellBackgroundColor);
  assertEquals('#111', ma111Cell.cellTextColor);
}

function testClear() {
  me430Cell.clear();
  assertEquals('', me430Cell.courseName);
  assertEquals('', me430Cell.roomNumber);
  assertEquals('#fff', me430Cell.cellBackgroundColor);
  assertEquals('#000', me430Cell.cellTextColor);
}

function testSetProperties() {
  var newProperties1 = new mockCellProperties('Test 1', 'DL201');  
  blankCell.setProperties(newProperties1);
  assertEquals('Test 1', blankCell.courseName);
  assertEquals('DL201', blankCell.roomNumber);
  assertEquals('#fff', me430Cell.cellBackgroundColor);
  assertEquals('#000', me430Cell.cellTextColor);
  
  var newProperties2 = new mockCellProperties('Test 2');
  me430Cell.setProperties(newProperties2);
  assertEquals('Test 2', me430Cell.courseName);
  assertEquals('', me430Cell.roomNumber);
  assertEquals('#fff', me430Cell.cellBackgroundColor);
  assertEquals('#000', me430Cell.cellTextColor);
  
  var newProperties2 = new mockCellProperties('Test 3', 'DL201', '#001', '#002');
  me430Cell.setProperties(newProperties2);
  assertEquals('Test 3', me430Cell.courseName);
  assertEquals('DL201', me430Cell.roomNumber);
  assertEquals('#001', me430Cell.cellBackgroundColor);
  assertEquals('#002', me430Cell.cellTextColor);
}

function testGetters() {
  assertEquals('ME430 Mechatronics', me430Cell.getCourseName());
  assertEquals('C111', me430Cell.getRoomNumber());
  assertEquals('#fff', me430Cell.getCellBackgroundColor());
  assertEquals('#000', me430Cell.getCellTextColor());
}
