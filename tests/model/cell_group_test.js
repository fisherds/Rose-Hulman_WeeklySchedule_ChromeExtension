/**
 * @fileoverview Unit tests for the model/course.js file.
 */

/** Objects under test. */
var me430CellGroup;
var csse490CellGroup;
var weekModel;
var m3CM, t3CM, r3CM, m4CM, t4CM, r4CM, w9CM, m10CM;
var m3 = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.THIRD_HOUR};
var t3 = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.THIRD_HOUR};
var r3 = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.THIRD_HOUR};
var m4 = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.FOURTH_HOUR};
var t4 = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.FOURTH_HOUR};
var r4 = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.FOURTH_HOUR};
var w9 = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.NINTH_HOUR};

function setUp() {
  weekModel = new rosegrid.model.Week();

  var mtr34 = [m3, t3, r3, m4, t4, r4];
  me430CellGroup = new rosegrid.model.CellGroup(weekModel, mtr34, 'ME430', 'C111', '#33e', '#000');  
  csse490CellGroup = new rosegrid.model.CellGroup(weekModel, [w9], 'CSSE490', 'F217', '#281', '#fff');
  
  m3CM = weekModel.getCellModel(rosegrid.Weekday.MONDAY, rosegrid.Period.THIRD_HOUR);
  t3CM = weekModel.getCellModel(rosegrid.Weekday.TUESDAY, rosegrid.Period.THIRD_HOUR);
  r3CM = weekModel.getCellModel(rosegrid.Weekday.THURSDAY, rosegrid.Period.THIRD_HOUR);
  m4CM = weekModel.getCellModel(rosegrid.Weekday.MONDAY, rosegrid.Period.FOURTH_HOUR);
  t4CM = weekModel.getCellModel(rosegrid.Weekday.TUESDAY, rosegrid.Period.FOURTH_HOUR);
  r4CM = weekModel.getCellModel(rosegrid.Weekday.THURSDAY, rosegrid.Period.FOURTH_HOUR);
  w9CM = weekModel.getCellModel(rosegrid.Weekday.WEDNESDAY, rosegrid.Period.NINTH_HOUR);
  m10CM = weekModel.getCellModel(rosegrid.Weekday.MONDAY, rosegrid.Period.TENTH_HOUR);
}

function testBasicInitialization() {
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

function testAddCellModels() {
  assertEquals(0,  me430CellGroup.findCellIndex(m3));
  assertEquals(5,  me430CellGroup.findCellIndex(t4));
  assertEquals(-1,  me430CellGroup.findCellIndex(w9));
}
  
function testAddCellModels() {
  var f1CM = weekModel.getCellModel(rosegrid.Weekday.FRIDAY, rosegrid.Period.FIRST_HOUR);
  assertEquals('', f1CM.getCourseName());
  assertEquals('', f1CM.getRoomNumber());
  assertSameElements([w9], csse490CellGroup.getCellIndices());
  
  var f1 = {weekday: rosegrid.Weekday.FRIDAY, period: rosegrid.Period.FIRST_HOUR};
  csse490CellGroup.addCellModels([f1]);
  assertEquals('CSSE490', f1CM.getCourseName());
  assertEquals('F217', f1CM.getRoomNumber());
  assertSameElements([w9, f1], csse490CellGroup.getCellIndices());
  
  csse490CellGroup.addCellModels([f1]);
  csse490CellGroup.addCellModels([f1]);
  csse490CellGroup.addCellModels([f1]);
  assertSameElements([w9, f1], csse490CellGroup.getCellIndices());
}

function testRemoveCellModels() {
  assertEquals('ME430', m3CM.getCourseName());
  assertEquals('C111', m3CM.getRoomNumber());
  assertSameElements([m3, t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());
  me430CellGroup.removeCellModels([{weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.THIRD_HOUR}]);
  assertEquals('', m3CM.getCourseName());
  assertEquals('', m3CM.getRoomNumber());
  assertSameElements([t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());
  
  me430CellGroup.removeCellModels([{weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.THIRD_HOUR}]);
  me430CellGroup.removeCellModels([{weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.THIRD_HOUR}]);
  assertSameElements([t3, r3, m4, t4, r4], me430CellGroup.getCellIndices());
}