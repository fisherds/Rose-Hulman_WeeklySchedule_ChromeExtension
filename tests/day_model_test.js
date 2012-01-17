/**
 * @fileoverview Unit tests for the day_model.js file.
 */

/** Objects under test. */
var me430Cell;
var blankMonday;

function setUp() {
  me430Cell = {courseName: 'ME430 Mechatronics', roomNumber: 'C111'};
  blankMonday = new rosegrid.DayModel(rosegrid.Weekday.MONDAY);
}

function testCellModel() {
  assertEquals('ME430 Mechatronics', me430Cell.courseName);
  assertEquals('C111', me430Cell.roomNumber);
}

function testEnumValues() {
  assertEquals(4, rosegrid.Weekday.FRIDAY);
  assertEquals(2, rosegrid.Period.THIRD_HOUR);
}

function testDayModelGetters() {
  assertEquals(rosegrid.Weekday.MONDAY, blankMonday.getWeekday());
  assertEquals(10, blankMonday.getCellModels().length);
  assertEquals('', blankMonday.getCellModels()[0].courseName);
  assertEquals('', blankMonday.getCellModels()[0].roomNumber);
  assertNotNullNorUndefined(blankMonday.getCellModel(3));
  assertEquals('', blankMonday.getCellModel(3).courseName);
  assertEquals('', blankMonday.getCellModel(3).roomNumber);
}

function testSetCellModel() {
  blankMonday.setCellModel(rosegrid.Period.FIRST_HOUR, me430Cell);
  assertEquals('ME430 Mechatronics', blankMonday.getCellModel(rosegrid.Period.FIRST_HOUR).courseName);
  assertEquals('ME430 Mechatronics', blankMonday.getCellModel(0).courseName);
  assertEquals('C111', blankMonday.getCellModel(0).roomNumber);
}

// These setters are pretty unnecessary.  Consider just losing them.
// The properties for a CellModel are public
function testSetCellModelProperties() {
  var course = 'ME435 Robotics Engineering';
  var room = 'C112';
  blankMonday.setCellModelCourseName(1, course);
  blankMonday.setCellModelRoomNumber(9, room);
  assertEquals(course, blankMonday.getCellModel(1).courseName);
  assertEquals(room, blankMonday.getCellModel(9).roomNumber);
  
  // Note that this type of approach also works
  blankMonday.getCellModels()[5].courseName = course;
  assertEquals(course, blankMonday.getCellModels()[5].courseName);
}