/**
 * @fileoverview Unit tests for the model/day.js file.
 */

/** Objects under test. */
var blankCell;
var me430Cell;

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
  var newProperties = {courseName: 'Test 1', roomNumber: 'DL201'};
  blankCell.setProperties(newProperties);
  var newProperties = {courseName: 'Test 2'};
  me430Cell.setProperties(newProperties);
  assertEquals('Test 1', blankCell.courseName);
  assertEquals('DL201', blankCell.roomNumber);
  assertEquals('Test 2', me430Cell.courseName);
  assertEquals('C111', me430Cell.roomNumber);
}

function testClear() {
  me430Cell.clear();
  assertEquals('', me430Cell.courseName);
  assertEquals('', me430Cell.roomNumber);
}
