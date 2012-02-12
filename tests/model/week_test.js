
/**
 * @fileoverview Unit tests for the js/model/week.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var blankWeek;


function setUp() {
  blankWeek = new rosegrid.model.Week();
}


function testShortWeek() {
  var monday = new rosegrid.model.Day(rosegrid.model.Weekday.MONDAY);
  var tuesday = new rosegrid.model.Day(rosegrid.model.Weekday.TUESDAY);
  var days = [monday, tuesday];
  try {
    new rosegrid.model.Week(days);
    fail('Should have thrown an error');
  } catch (e) {
    assertEquals('Week must have 5 days', e.message);
  }
}


function testWrongDays() {
  var monday = new rosegrid.model.Day(rosegrid.model.Weekday.MONDAY);
  var tuesday = new rosegrid.model.Day(rosegrid.model.Weekday.TUESDAY);
  var days = [monday, tuesday, monday, tuesday, monday];
  try {
    new rosegrid.model.Week(days);
    fail('Should have thrown an error');
  } catch (e) {
    assertEquals('Week must have the correct 5 days', e.message);
  }
}


function testConstructor() {
  var m = new rosegrid.model.Day(rosegrid.model.Weekday.MONDAY);
  var t = new rosegrid.model.Day(rosegrid.model.Weekday.TUESDAY);
  var w = new rosegrid.model.Day(rosegrid.model.Weekday.WEDNESDAY);
  var r = new rosegrid.model.Day(rosegrid.model.Weekday.THURSDAY);
  var f = new rosegrid.model.Day(rosegrid.model.Weekday.FRIDAY);
  var days = [m, t, w, r, f];
  var week = new rosegrid.model.Week(days);

  assertEquals(m, week.getDayModel(rosegrid.model.Weekday.MONDAY));
  assertNotEquals(w, week.getDayModel(rosegrid.model.Weekday.FRIDAY));
  assertEquals(f, week.getDayModel(rosegrid.model.Weekday.FRIDAY));
}


function testClear() {
  // A bit a of misuse of the rosegrid.model.Weekday enum, but functional.
  for (var i = 0; i < 5; i++) {
    blankWeek.getCellModel(i, 3).cellBackgroundColor = '#abc';
    blankWeek.getCellModel(i, 3).cellTextColor = '#123';
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  assertEquals('#abc', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).cellBackgroundColor);
  assertEquals('#123', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).cellTextColor);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);

  blankWeek.clear();

  assertEquals('#fff', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).cellBackgroundColor);
  assertEquals('#000', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).cellTextColor);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
}


function testGetDayModel() {
  assertEquals(5, blankWeek.getDayModels().length);
  assertNotNullNorUndefined(
      blankWeek.getDayModel(rosegrid.model.Weekday.TUESDAY));
  assertNotNullNorUndefined(
      blankWeek.getCellModel(rosegrid.model.Weekday.TUESDAY, 2));
}

function testLoadingACourse() {
  // A bit a of misuse of the rosegrid.model.Weekday enum, but functional.
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('ME430', blankWeek.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FOURTH_HOUR).courseName);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('C111', blankWeek.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
  assertEquals('', blankWeek.getCellModel(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FOURTH_HOUR).roomNumber);
}

function testGetCellModelByNumericIndex() {
  // A bit a of misuse of the rosegrid.model.Weekday enum, but functional.
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  assertEquals('ME430', blankWeek.getCellModelByNumericIndex(3).courseName);
  assertEquals('ME430', blankWeek.getCellModelByNumericIndex(13).courseName);
  assertEquals('ME430', blankWeek.getCellModelByNumericIndex(23).courseName);
  assertEquals('ME430', blankWeek.getCellModelByNumericIndex(33).courseName);
  assertEquals('', blankWeek.getCellModelByNumericIndex(43).courseName);
  assertEquals('C111', blankWeek.getCellModelByNumericIndex(3).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByNumericIndex(13).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByNumericIndex(23).roomNumber);
  assertEquals('C111', blankWeek.getCellModelByNumericIndex(33).roomNumber);
  assertEquals('', blankWeek.getCellModelByNumericIndex(43).roomNumber);
}

function testGetCellModelByCellIndex() {
  // A bit a of misuse of the rosegrid.model.Weekday enum, but functional.
  for (var i = 0; i < 4; i++) {
    blankWeek.getCellModel(i, 3).courseName = 'ME430';
    blankWeek.getCellModel(i, 3).roomNumber = 'C111';
  }
  var monday4thHourCellIndex = new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.FOURTH_HOUR);
  var tuesday4thHourCellIndex = new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.TUESDAY, rosegrid.model.Period.FOURTH_HOUR);
  var wednesday4thHourCellIndex = new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.FOURTH_HOUR);
  var thursday4thHourCellIndex = new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.THURSDAY, rosegrid.model.Period.FOURTH_HOUR);
  var friday4thHourCellIndex = new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.FRIDAY, rosegrid.model.Period.FOURTH_HOUR);

  assertEquals('ME430',
      blankWeek.getCellModelByCellIndex(monday4thHourCellIndex).courseName);
  assertEquals('ME430',
      blankWeek.getCellModelByCellIndex(tuesday4thHourCellIndex).courseName);
  assertEquals('ME430',
      blankWeek.getCellModelByCellIndex(wednesday4thHourCellIndex).courseName);
  assertEquals('ME430',
      blankWeek.getCellModelByCellIndex(thursday4thHourCellIndex).courseName);
  assertEquals('',
      blankWeek.getCellModelByCellIndex(friday4thHourCellIndex).courseName);
  assertEquals('C111',
      blankWeek.getCellModelByCellIndex(monday4thHourCellIndex).roomNumber);
  assertEquals('C111',
      blankWeek.getCellModelByCellIndex(tuesday4thHourCellIndex).roomNumber);
  assertEquals('C111',
      blankWeek.getCellModelByCellIndex(wednesday4thHourCellIndex).roomNumber);
  assertEquals('C111',
      blankWeek.getCellModelByCellIndex(thursday4thHourCellIndex).roomNumber);
  assertEquals('',
      blankWeek.getCellModelByCellIndex(friday4thHourCellIndex).roomNumber);
}
