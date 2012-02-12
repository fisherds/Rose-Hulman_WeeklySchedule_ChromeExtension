
/**
 * @fileoverview Unit tests for the js/model/cell_group.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var me430CellGroup;
var csse490CellGroup;
var blankCellGroup;
var weekModel;
var m3CM, t3CM, r3CM, m4CM, t4CM, r4CM, w9CM, m10CM;
var m3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.THIRD_HOUR);
var t3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
    rosegrid.model.Period.THIRD_HOUR);
var r3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.THIRD_HOUR);
var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.NINTH_HOUR);


function setUp() {
  weekModel = new rosegrid.model.Week();

  var mtr34 = [m3, t3, r3, m4, t4, r4];
  me430CellGroup = new rosegrid.model.CellGroup(
      weekModel, '#33e', '#000', 'ME430', 'C111', mtr34);
  csse490CellGroup = new rosegrid.model.CellGroup(
      weekModel, '#281', '#fff', 'CSSE490', 'F217', [w9]);
  blankCellGroup = new rosegrid.model.CellGroup(weekModel);

  m3CM = weekModel.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.THIRD_HOUR);
  t3CM = weekModel.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.THIRD_HOUR);
  r3CM = weekModel.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.THIRD_HOUR);
  m4CM = weekModel.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  t4CM = weekModel.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  r4CM = weekModel.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  w9CM = weekModel.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.NINTH_HOUR);
  m10CM = weekModel.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.TENTH_HOUR);
}


function testInitializationOfCellModels() {
  assertEquals('ME430', m3CM.getCourseName());
  assertEquals('ME430', t3CM.getCourseName());
  assertEquals('ME430', r3CM.getCourseName());
  assertEquals('ME430', m4CM.getCourseName());
  assertEquals('ME430', t4CM.getCourseName());
  assertEquals('ME430', r4CM.getCourseName());
  assertEquals('CSSE490', w9CM.getCourseName());
  assertEquals('', m10CM.getCourseName());

  assertEquals('C111', m3CM.getRoomNumber());
  assertEquals('C111', t3CM.getRoomNumber());
  assertEquals('C111', r3CM.getRoomNumber());
  assertEquals('C111', m4CM.getRoomNumber());
  assertEquals('C111', t4CM.getRoomNumber());
  assertEquals('C111', r4CM.getRoomNumber());
  assertEquals('F217', w9CM.getRoomNumber());
  assertEquals('', m10CM.getRoomNumber());
}


function testAddCellIndices() {
  var f1CM = weekModel.getCellModel(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FIRST_HOUR);
  assertEquals('', f1CM.getCourseName());
  assertEquals('', f1CM.getRoomNumber());
  assertSameElements([w9], csse490CellGroup.getCellIndices());

  var f1 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.FRIDAY,
      rosegrid.model.Period.FIRST_HOUR);
  csse490CellGroup.addCellIndices([f1]);
  assertEquals('CSSE490', f1CM.getCourseName());
  assertEquals('F217', f1CM.getRoomNumber());
  assertSameElements([w9, f1], csse490CellGroup.getCellIndices());

  csse490CellGroup.addCellIndices([f1]);
  csse490CellGroup.addCellIndices([f1]);
  csse490CellGroup.addCellIndices([f1]);
  assertSameElements([w9, f1], csse490CellGroup.getCellIndices());
}


function testRemoveCellIndices() {
  assertEquals('ME430', m3CM.getCourseName());
  assertEquals('C111', m3CM.getRoomNumber());
  assertSameElements([m3, t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());
  me430CellGroup.removeCellIndices([new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.THIRD_HOUR)]);
  assertEquals('', m3CM.getCourseName());
  assertEquals('', m3CM.getRoomNumber());
  assertSameElements([t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());

  me430CellGroup.removeCellIndices([new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.THIRD_HOUR)]);
  me430CellGroup.removeCellIndices([new rosegrid.model.CellIndex(
      rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.THIRD_HOUR)]);
  assertSameElements([t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());
  assertEquals('', m3CM.getCourseName());
  assertEquals('', m3CM.getRoomNumber());
}


function testUpdateAllCellModels() {
  assertEquals('ME430', m3CM.getCourseName());
  assertEquals('ME430', t3CM.getCourseName());
  me430CellGroup.courseName = 'ME435';
  assertEquals('ME430', m3CM.getCourseName());
  assertEquals('ME430', t3CM.getCourseName());
  me430CellGroup.updateAllCellModels();
  assertEquals('ME435', m3CM.getCourseName());
  assertEquals('ME435', t3CM.getCourseName());
}


function testFindCellIndex() {
  assertEquals(0, me430CellGroup.findCellIndex(m3));
  assertEquals(5, me430CellGroup.findCellIndex(r4));
  assertEquals(-1, me430CellGroup.findCellIndex(w9));
}


function testContainsCellIndex() {
  assertTrue(csse490CellGroup.containsCellIndex(w9));
  assertFalse(csse490CellGroup.containsCellIndex(m3));
}


function testGetCellIndicies() {
  assertEquals(6, me430CellGroup.getCellIndices().length);
  assertEquals(1, csse490CellGroup.getCellIndices().length);
  assertEquals(0, blankCellGroup.getCellIndices().length);
}


function testCellPropertiesGetters() {
  assertEquals('ME430', me430CellGroup.getCourseName());
  assertEquals('F217', csse490CellGroup.getRoomNumber());
  assertEquals('#fff', blankCellGroup.getCellBackgroundColor());
  assertEquals('#000', me430CellGroup.getCellTextColor());
}
