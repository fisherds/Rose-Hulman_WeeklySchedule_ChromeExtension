/**
 * @fileoverview Unit tests for the week_model.js file
 */

/** Objects under test. */
var blankWeek;

function setUp() {
  blankWeek = new rosegrid.model.Week();
}

function testShortWeek() {
  var monday = new rosegrid.model.Day(rosegrid.Weekday.MONDAY);
  var tuesday = new rosegrid.model.Day(rosegrid.Weekday.TUESDAY);
  var days = [monday, tuesday];
  try {
    new rosegrid.model.Week(days);
    fail('Should have thrown an error');
  } catch(e) {
    assertEquals('Week must have 5 days', e.message);
  }
}

function testWrongDaysWeek() {
  var monday = new rosegrid.model.Day(rosegrid.Weekday.MONDAY);
  var tuesday = new rosegrid.model.Day(rosegrid.Weekday.TUESDAY);
  var days = [monday, tuesday, monday, tuesday, monday];
  try {
    new rosegrid.model.Week(days);
    fail('Should have thrown an error');
  } catch(e) {
    assertEquals('Week must have the correct 5 days', e.message);
  }  
}

function testCorrectItems() {
  var m = new rosegrid.model.Day(rosegrid.Weekday.MONDAY);
  var t = new rosegrid.model.Day(rosegrid.Weekday.TUESDAY);
  var w = new rosegrid.model.Day(rosegrid.Weekday.WEDNESDAY);
  var r = new rosegrid.model.Day(rosegrid.Weekday.THURSDAY);
  var f = new rosegrid.model.Day(rosegrid.Weekday.FRIDAY);
  var days = [m, t, w, r, f];
  var week = new rosegrid.model.Week(days);
  
  assertEquals(m, week.getDayModel(rosegrid.Weekday.MONDAY));
  assertNotEquals(w, week.getDayModel(rosegrid.Weekday.FRIDAY));
  assertEquals(f, week.getDayModel(rosegrid.Weekday.FRIDAY));
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
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.MONDAY, rosegrid.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.TUESDAY, rosegrid.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.WEDNESDAY, rosegrid.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.Weekday.THURSDAY, rosegrid.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.Weekday.FRIDAY, rosegrid.Period.FOURTH_HOUR).courseName); 
  assertEquals('C111', blankWeek.getCellModel(rosegrid.Weekday.MONDAY, rosegrid.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.Weekday.TUESDAY, rosegrid.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.Weekday.WEDNESDAY, rosegrid.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.Weekday.THURSDAY, rosegrid.Period.FOURTH_HOUR).roomNumber);
  assertEquals('', blankWeek.getCellModel(rosegrid.Weekday.FRIDAY, rosegrid.Period.FOURTH_HOUR).roomNumber); 
}

function testGetCellModelByIndex() {
  // A bit a of misuse of the rosegrid.Weekday enum, but functional
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  assertEquals('ME430', blankWeek.getCellModelByIndex(3).courseName);
  assertEquals('ME430', blankWeek.getCellModelByIndex(13).courseName);
  assertEquals('ME430', blankWeek.getCellModelByIndex(23).courseName);
  assertEquals('ME430', blankWeek.getCellModelByIndex(33).courseName);
  assertEquals('', blankWeek.getCellModelByIndex(43).courseName); 
  assertEquals('C111', blankWeek.getCellModelByIndex(3).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByIndex(13).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByIndex(23).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByIndex(33).roomNumber);
  assertEquals('', blankWeek.getCellModelByIndex(43).roomNumber); 
}

function testGetCellModelByCellIndex() {
  // A bit a of misuse of the rosegrid.Weekday enum, but functional
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  var monday4thHourCellIndex = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.FOURTH_HOUR};
  var tuesday4thHourCellIndex = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.FOURTH_HOUR};
  var wednesday4thHourCellIndex = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.FOURTH_HOUR};
  var thursday4thHourCellIndex = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.FOURTH_HOUR};
  var friday4thHourCellIndex = {weekday: rosegrid.Weekday.FRIDAY, period: rosegrid.Period.FOURTH_HOUR};
  assertEquals('ME430', blankWeek.getCellModelByCellIndex(monday4thHourCellIndex).courseName);
  assertEquals('ME430', blankWeek.getCellModelByCellIndex(tuesday4thHourCellIndex).courseName);
  assertEquals('ME430', blankWeek.getCellModelByCellIndex(wednesday4thHourCellIndex).courseName);
  assertEquals('ME430', blankWeek.getCellModelByCellIndex(thursday4thHourCellIndex).courseName);
  assertEquals('', blankWeek.getCellModelByCellIndex(friday4thHourCellIndex).courseName); 
  assertEquals('C111', blankWeek.getCellModelByCellIndex(monday4thHourCellIndex).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByCellIndex(tuesday4thHourCellIndex).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByCellIndex(wednesday4thHourCellIndex).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByCellIndex(thursday4thHourCellIndex).roomNumber);
  assertEquals('', blankWeek.getCellModelByCellIndex(friday4thHourCellIndex).roomNumber); 
}