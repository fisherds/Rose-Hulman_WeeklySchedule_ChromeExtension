/**
 * @fileoverview Unit tests for the week_model.js file
 */

/** Objects under test. */
var blankWeek;
var me430Cell = {courseName:"ME430 Mechatronics", roomNumber:"C111"};

function setUp() {
  blankWeek = new rosegrid.WeekModel();
}

function testWeekModel() {
  assertEquals(5, blankWeek.getDayModels().length);
  assertNotNullNorUndefined(blankWeek.getDayModel(rosegrid.Weekday.TUESDAY));
  assertNotNullNorUndefined(blankWeek.getCellModel(rosegrid.Weekday.TUESDAY, 2));
}

function testLoadingACourse() {
  // A bit a of misuse of the rosegrid.Weekday enum, but functional
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.MONDAY, 3).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.TUESDAY, 3).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.WEDNESDAY, 3).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.THURSDAY, 3).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.Weekday.FRIDAY, 3).courseName);
  
}
