
/**
 * @fileoverview Unit tests for the js/model/day.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var blankMonday;
var thursday;


function setUp() {
  blankMonday = new rosegrid.model.Day(rosegrid.model.Weekday.MONDAY);
  var cellModels = [];
  for (var i = 0; i < 10; i++) {
    if (i == rosegrid.model.Period.THIRD_HOUR ||
        i == rosegrid.model.Period.FOURTH_HOUR) {
      cellModels.push(
          new rosegrid.model.Cell(null, null, 'ME430 Mechatronics', 'C111'));
    } else {
      cellModels.push(new rosegrid.model.Cell());
    }
  }
  thursday = new rosegrid.model.Day(
      rosegrid.model.Weekday.THURSDAY, cellModels);
}


function testInvalidSize() {
  try {
    var cellModels = [];
    for (var i = 0; i < 12; i++) {
      cellModels.push(new rosegrid.model.Cell());
    }
    new rosegrid.model.Day(rosegrid.model.Weekday.FRIDAY, cellModels);
    fail('Should have thrown an error');
  } catch (e) {
    assertEquals('Day must have 10 cells', e.message);
  }
}


function testClear() {
  assertEquals('ME430 Mechatronics', thursday.getCellModel(2).courseName);
  assertEquals('C111', thursday.getCellModel(2).roomNumber);
  assertEquals('ME430 Mechatronics', thursday.getCellModel(3).courseName);
  assertEquals('C111', thursday.getCellModel(3).roomNumber);

  thursday.clear();
  assertEquals('', thursday.getCellModel(2).courseName);
  assertEquals('', thursday.getCellModel(2).roomNumber);
  assertEquals('', thursday.getCellModel(3).courseName);
  assertEquals('', thursday.getCellModel(3).roomNumber);

}


function testGetWeekday() {
  assertEquals(rosegrid.model.Weekday.MONDAY, blankMonday.getWeekday());
  assertEquals(rosegrid.model.Weekday.THURSDAY, thursday.getWeekday());
}


function testGetCellModels() {
  assertEquals(10, blankMonday.getCellModels().length);
  assertEquals(10, thursday.getCellModels().length);
  assertEquals('', blankMonday.getCellModels()[0].courseName);
  assertEquals('C111', thursday.getCellModels()[3].roomNumber);
  assertFalse(blankMonday.cellModels_ == blankMonday.getCellModels());
}


function testGetCellModel() {
  assertEquals('#fff', blankMonday.getCellModel(3).getCellBackgroundColor());
  assertEquals('#000', blankMonday.getCellModel(3).getCellTextColor());
  assertEquals('', blankMonday.getCellModel(3).courseName);
  assertEquals('', blankMonday.getCellModel(3).roomNumber);

  assertEquals('ME430 Mechatronics', thursday.getCellModel(2).courseName);
  assertEquals('C111', thursday.getCellModel(2).roomNumber);
  assertEquals('ME430 Mechatronics', thursday.getCellModel(3).courseName);
  assertEquals('C111', thursday.getCellModel(3).roomNumber);
  assertEquals('', thursday.getCellModel(4).courseName);
  assertEquals('', thursday.getCellModel(4).roomNumber);
}
