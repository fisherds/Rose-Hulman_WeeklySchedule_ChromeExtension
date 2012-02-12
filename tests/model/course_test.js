
/**
 * @fileoverview Unit tests for the js/model/course.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var weekModel;
var es203Course;
var es203LectureCellGroup;
var es203LabCellGroup;
var m4CM, t4CM, r4CM, w7CM, w8CM, w9CM;
var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var w7 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.SEVENTH_HOUR);
var w8 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.EIGHTH_HOUR);
var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.NINTH_HOUR);


function setUp() {
  weekModel = new rosegrid.model.Week();
  var backgroundColor = '#ee0';
  var textColor = '#200';
  es203LectureCellGroup = new rosegrid.model.CellGroup(weekModel,
      backgroundColor, textColor, 'ES204 ESys', 'O257', [m4, t4, r4]);
  es203LabCellGroup = new rosegrid.model.CellGroup(weekModel,
      backgroundColor, textColor, 'ES204 Lab', 'C161', [w7, w8, w9]);
  es203Course = new rosegrid.model.Course(weekModel, backgroundColor, textColor,
      'ES204', 1, [es203LectureCellGroup, es203LabCellGroup]);

  m4CM = weekModel.getCellModel(rosegrid.model.Weekday.MONDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  t4CM = weekModel.getCellModel(rosegrid.model.Weekday.TUESDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  r4CM = weekModel.getCellModel(rosegrid.model.Weekday.THURSDAY,
      rosegrid.model.Period.FOURTH_HOUR);
  w7CM = weekModel.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.SEVENTH_HOUR);
  w8CM = weekModel.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.EIGHTH_HOUR);
  w9CM = weekModel.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.NINTH_HOUR);
}


function testGetCellGroups() {
  assertSameElements([es203LectureCellGroup, es203LabCellGroup],
      es203Course.getCellGroups());
  assertNotEquals([es203LectureCellGroup, es203LabCellGroup],
      es203Course.getCellGroups());
}


function testClear() {
  assertEquals('ES204 ESys', m4CM.courseName);
  assertEquals('O257', m4CM.roomNumber);
  assertEquals('#ee0', m4CM.cellBackgroundColor);
  assertEquals('#200', m4CM.cellTextColor);
  assertEquals('ES204 Lab', w9CM.courseName);
  assertEquals('C161', w9CM.roomNumber);
  assertEquals('#ee0', w9CM.cellBackgroundColor);
  assertEquals('#200', w9CM.cellTextColor);

  assertEquals(weekModel, es203Course.weekModel_);
  assertEquals('#ee0', es203Course.courseBackgroundColor);
  assertEquals('#200', es203Course.courseTextColor);
  assertEquals('ES204', es203Course.officialCourseNumber);
  assertEquals(1, es203Course.officialCourseSection);
  assertSameElements([es203LectureCellGroup, es203LabCellGroup],
      es203Course.getCellGroups());

  es203Course.clear();

  assertEquals(weekModel, es203Course.weekModel_);
  assertEquals('#fff', es203Course.courseBackgroundColor);
  assertEquals('#000', es203Course.courseTextColor);
  assertEquals('', es203Course.officialCourseNumber);
  assertEquals(0, es203Course.officialCourseSection);
  assertEquals(0, es203Course.getCellGroups().length);

  assertEquals('#fff', m4CM.cellBackgroundColor);
  assertEquals('#000', m4CM.cellTextColor);
  assertEquals('', m4CM.courseName);
  assertEquals('', m4CM.roomNumber);
  assertEquals('#fff', w9CM.cellBackgroundColor);
  assertEquals('#000', w9CM.cellTextColor);
  assertEquals('', w9CM.courseName);
  assertEquals('', w9CM.roomNumber);
}


function testSetProperties() {
  var aDifferentWeek = new rosegrid.model.Week();
  var courseProperties = new rosegrid.model.Course(aDifferentWeek,
      '#800', '#eee', 'ME430', 3, []);
  es203Course.setProperties(courseProperties);
  assertEquals(aDifferentWeek, es203Course.weekModel_);
  assertEquals('ME430', es203Course.officialCourseNumber);
  assertEquals(3, es203Course.officialCourseSection);
  assertEquals('#800', es203Course.courseBackgroundColor);
  assertEquals('#eee', es203Course.courseTextColor);
  assertEquals(0, es203Course.getCellGroups().length);
}


function testAddCellGroups() {
  var cg1 = new rosegrid.model.CellGroup(weekModel);
  var cg2 = new rosegrid.model.CellGroup(weekModel);
  var cg3 = new rosegrid.model.CellGroup(weekModel);
  es203Course.addCellGroups([cg1, cg2, cg3]);
  es203Course.addCellGroups([cg1, cg2, cg3]);
  es203Course.addCellGroups([cg1, cg2, cg3]);
  assertSameElements([es203LectureCellGroup, es203LabCellGroup, cg1, cg2, cg3],
      es203Course.getCellGroups());
}


function testAddNewCellGroup() {
  var w10 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.TENTH_HOUR);
  var w10CM = weekModel.getCellModel(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.TENTH_HOUR);

  assertEquals('#fff', w10CM.cellBackgroundColor);
  assertEquals('#000', w10CM.cellTextColor);
  assertEquals('', w10CM.courseName);
  assertEquals('', w10CM.roomNumber);
  var es203Meeting = es203Course.addNewCellGroup(
      'MSys Meeting', 'BSB 121', [w10]);

  assertEquals('#ee0', es203Meeting.cellBackgroundColor);
  assertEquals('#200', es203Meeting.cellTextColor);
  assertEquals('MSys Meeting', es203Meeting.courseName);
  assertEquals('BSB 121', es203Meeting.roomNumber);
  assertSameElements([w10], es203Meeting.cellIndices_);

  assertEquals('#ee0', w10CM.cellBackgroundColor);
  assertEquals('#200', w10CM.cellTextColor);
  assertEquals('MSys Meeting', w10CM.courseName);
  assertEquals('BSB 121', w10CM.roomNumber);
}


function testRemoveCellGroup() {
  assertEquals('#ee0', m4CM.cellBackgroundColor);
  assertEquals('#200', m4CM.cellTextColor);
  assertEquals('ES204 ESys', m4CM.courseName);
  assertEquals('O257', m4CM.roomNumber);
  assertEquals('#ee0', w9CM.cellBackgroundColor);
  assertEquals('#200', w9CM.cellTextColor);
  assertEquals('ES204 Lab', w9CM.courseName);
  assertEquals('C161', w9CM.roomNumber);
  assertSameElements([es203LectureCellGroup, es203LabCellGroup],
      es203Course.getCellGroups());

  es203Course.removeCellGroup(es203LabCellGroup);

  assertSameElements([es203LectureCellGroup], es203Course.getCellGroups());
  assertEquals('#ee0', m4CM.cellBackgroundColor);
  assertEquals('#200', m4CM.cellTextColor);
  assertEquals('ES204 ESys', m4CM.courseName);
  assertEquals('O257', m4CM.roomNumber);
  assertEquals('#fff', w9CM.cellBackgroundColor);
  assertEquals('#000', w9CM.cellTextColor);
  assertEquals('', w9CM.courseName);
  assertEquals('', w9CM.roomNumber);
}


function testRemoveCellGroupAtIndex() {
  assertEquals('#ee0', m4CM.cellBackgroundColor);
  assertEquals('#200', m4CM.cellTextColor);
  assertEquals('ES204 ESys', m4CM.courseName);
  assertEquals('O257', m4CM.roomNumber);
  assertEquals('#ee0', w9CM.cellBackgroundColor);
  assertEquals('#200', w9CM.cellTextColor);
  assertEquals('ES204 Lab', w9CM.courseName);
  assertEquals('C161', w9CM.roomNumber);
  assertSameElements([es203LectureCellGroup, es203LabCellGroup],
      es203Course.getCellGroups());

  es203Course.removeCellGroupAtIndex(0);

  assertSameElements([es203LabCellGroup], es203Course.getCellGroups());
  assertEquals('#fff', m4CM.cellBackgroundColor);
  assertEquals('#000', m4CM.cellTextColor);
  assertEquals('', m4CM.courseName);
  assertEquals('', m4CM.roomNumber);
  assertEquals('#ee0', w9CM.cellBackgroundColor);
  assertEquals('#200', w9CM.cellTextColor);
  assertEquals('ES204 Lab', w9CM.courseName);
  assertEquals('C161', w9CM.roomNumber);
}


function testRemoveCellIndices() {
  var courseGroup = es203Course.getCellGroups()[0];
  var labGroup = es203Course.getCellGroups()[1];
  assertSameElements([m4, t4, r4], courseGroup.getCellIndices());
  assertSameElements([w7, w8, w9], labGroup.getCellIndices());

  var w10 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.TENTH_HOUR);
  es203Course.removeCellIndices([r4, w7, w8, w9, w10]);

  assertSameElements([m4, t4], courseGroup.getCellIndices());
  assertEquals(0, labGroup.getCellIndices().length);
}


function testUpdateAllCellModels() {
  es203Course.courseBackgroundColor = '#123';
  es203Course.courseTextColor = '#abc';
  assertEquals('#ee0', m4CM.cellBackgroundColor);
  assertEquals('#200', m4CM.cellTextColor);
  assertEquals('#ee0', w9CM.cellBackgroundColor);
  assertEquals('#200', w9CM.cellTextColor);

  es203Course.updateAllCellModels();
  assertEquals('#123', m4CM.cellBackgroundColor);
  assertEquals('#abc', m4CM.cellTextColor);
  assertEquals('#123', w9CM.cellBackgroundColor);
  assertEquals('#abc', w9CM.cellTextColor);
}


function testContainsCellIndex() {
  var w10 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
      rosegrid.model.Period.TENTH_HOUR);

  assertFalse(es203Course.containsCellIndex(w10));
  assertTrue(es203Course.containsCellIndex(m4));
  assertTrue(es203Course.containsCellIndex(w9));
}
