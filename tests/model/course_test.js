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
var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.FOURTH_HOUR);
var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY, rosegrid.model.Period.FOURTH_HOUR);
var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY, rosegrid.model.Period.FOURTH_HOUR);
var w7 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.SEVENTH_HOUR);
var w8 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.EIGHTH_HOUR);
var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.NINTH_HOUR);

function setUp() {
  weekModel = new rosegrid.model.Week();
  var backgroundColor = '#ee0';
  var textColor = '#000';
  es203LectureCellGroup = new rosegrid.model.CellGroup(weekModel, backgroundColor, textColor, [m4, t4, r4], 'ES204 ESys', 'O257');
  es203LabCellGroup = new rosegrid.model.CellGroup(weekModel, backgroundColor, textColor, [w7, w8, w9], 'ES204 ESys', 'C161');
  es203Course = new rosegrid.model.Course(weekModel, [es203LectureCellGroup, es203LabCellGroup], 'ES204', 1, backgroundColor, textColor);
}

function testGetCellGroups() {
  assertSameElements([es203LectureCellGroup, es203LabCellGroup], es203Course.getCellGroups());
}

function testClear() {
}

function testSetProperties() {
}

function testUpdateAllCellModels() {
}
