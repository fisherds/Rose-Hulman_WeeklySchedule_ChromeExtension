
/**
 * @fileoverview Unit tests for the js/model/cell.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */



/**
 * Creates an mock class that holds the data for a Cell.
 *
 * @param {string=} cellBackgroundColor Color of the cells for this course.
 * @param {string=} cellTextColor Color of the text for this course.
 * @param {string=} courseName Title of the course to display.
 * @param {string=} roomNumber Location for the course to display.
 * @constructor
 * @implements {rosegrid.model.CellProperties}
 */
var mockCellProperties = function(cellBackgroundColor, cellTextColor,
    courseName, roomNumber) {
  this.cellBackgroundColor = cellBackgroundColor || '#123';
  this.cellTextColor = cellTextColor || '#abc';
  this.courseName = courseName || 'foo';
  this.roomNumber = roomNumber || 'who';
};


/** @inheritDoc */
mockCellProperties.prototype.getCellBackgroundColor = function() {
  return this.cellBackgroundColor;
};


/** @inheritDoc */
mockCellProperties.prototype.getCellTextColor = function() {
  return this.cellTextColor;
};


/** @inheritDoc */
mockCellProperties.prototype.getCourseName = function() {
  return this.courseName;
};


/** @inheritDoc */
mockCellProperties.prototype.getRoomNumber = function() {
  return this.roomNumber;
};


/** Objects under test. */
var blankCell;
var me430Cell;

function setUp() {
  blankCell = new rosegrid.model.Cell();
  me430Cell = new rosegrid.model.Cell(null, null, 'ME430 Mechatronics', 'C111');
  ma111Cell = new rosegrid.model.Cell('#800', '#111', 'MA111', 'O213');
}

function testCellModel() {
  assertEquals('#800', ma111Cell.cellBackgroundColor);
  assertEquals('#111', ma111Cell.cellTextColor);
  assertEquals('MA111', ma111Cell.courseName);
  assertEquals('O213', ma111Cell.roomNumber);

  assertEquals('#fff', me430Cell.cellBackgroundColor);
  assertEquals('#000', me430Cell.cellTextColor);
  assertEquals('ME430 Mechatronics', me430Cell.courseName);
  assertEquals('C111', me430Cell.roomNumber);

  assertEquals('#fff', blankCell.cellBackgroundColor);
  assertEquals('#000', blankCell.cellTextColor);
  assertEquals('', blankCell.courseName);
  assertEquals('', blankCell.roomNumber);
}

function testClear() {
  ma111Cell.clear();
  assertEquals('#fff', ma111Cell.cellBackgroundColor);
  assertEquals('#000', ma111Cell.cellTextColor);
  assertEquals('', ma111Cell.courseName);
  assertEquals('', ma111Cell.roomNumber);
}

function testSetProperties() {
  var newProperties1 = new mockCellProperties(null, null, 'Test 1', 'DL201');
  blankCell.setProperties(newProperties1);
  assertEquals('#123', blankCell.cellBackgroundColor);
  assertEquals('#abc', blankCell.cellTextColor);
  assertEquals('Test 1', blankCell.courseName);
  assertEquals('DL201', blankCell.roomNumber);

  var newProperties2 = new mockCellProperties('Test 2');
  me430Cell.setProperties(newProperties2);
  assertEquals('Test 2', me430Cell.cellBackgroundColor);
  assertEquals('#abc', me430Cell.cellTextColor);
  assertEquals('foo', me430Cell.courseName);
  assertEquals('who', me430Cell.roomNumber);

  var newProperties3 = new mockCellProperties('#001', '#002',
      'Test 3', 'DL201');
  me430Cell.setProperties(newProperties3);
  assertEquals('#001', me430Cell.cellBackgroundColor);
  assertEquals('#002', me430Cell.cellTextColor);
  assertEquals('Test 3', me430Cell.courseName);
  assertEquals('DL201', me430Cell.roomNumber);
}

function testCellPropertiesGetters() {
  assertEquals('#fff', me430Cell.getCellBackgroundColor());
  assertEquals('#000', me430Cell.getCellTextColor());
  assertEquals('ME430 Mechatronics', me430Cell.getCourseName());
  assertEquals('C111', me430Cell.getRoomNumber());
}
