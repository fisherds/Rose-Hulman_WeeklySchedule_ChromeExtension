/**
 * @fileoverview Unit tests for the day_model.js file.
 */

/** Objects under test. */
var blankMonday;
var thursday;

function setUp() {
  blankMonday = new rosegrid.model.Day(rosegrid.Weekday.MONDAY);
  var cellModels = [];
  for (var i = 0; i < 10 ; i++) {
    if (i == rosegrid.Period.THIRD_HOUR || i == rosegrid.Period.FOURTH_HOUR) {
      cellModels.push(new rosegrid.model.Cell('ME430 Mechatronics', 'C111'));
    } else {
      cellModels.push(new rosegrid.model.Cell());
    }
  }
  thursday = new rosegrid.model.Day(rosegrid.Weekday.THURSDAY, cellModels);
}

function testInvalidSize() {
  try {
    var cellModels = [];
    for (var i = 0; i < 12 ; i++) {
      cellModels.push(new rosegrid.model.Cell());
    }
    new rosegrid.model.Day(rosegrid.Weekday.FRIDAY, cellModels);
    fail('Should have thrown an error');
  } catch(e) {
    assertEquals('Day must have 10 cells', e.message);
  }
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
  
  assertEquals(rosegrid.Weekday.THURSDAY, thursday.getWeekday());
  assertEquals(10, thursday.getCellModels().length);
  assertEquals('', thursday.getCellModel(1).courseName);
  assertEquals('', thursday.getCellModel(1).roomNumber);
  assertEquals('ME430 Mechatronics', thursday.getCellModel(2).courseName);
  assertEquals('C111', thursday.getCellModel(2).roomNumber);
  assertEquals('ME430 Mechatronics', thursday.getCellModel(3).courseName);
  assertEquals('C111', thursday.getCellModel(3).roomNumber);
  assertEquals('', thursday.getCellModel(4).courseName);
  assertEquals('', thursday.getCellModel(4).roomNumber); 
}
