/**
 * @fileoverview Unit tests for the cell_model.js file:
 *   rosegrid.CellModel
 *   rosegrid.FullWeekModel
 */

/** Objects under test. */
var me430Cell;
var blankWeek;

function setUp() {
  me430Cell = {courseName:"ME430 Mechatronics", roomNumber:"C111"};
  blankWeek = new rosegrid.FullWeek();
}

function testBasicCellModel() {
  assertEquals("ME430 Mechatronics", me430Cell.courseName);
  assertEquals("C111", me430Cell.roomNumber);
}

