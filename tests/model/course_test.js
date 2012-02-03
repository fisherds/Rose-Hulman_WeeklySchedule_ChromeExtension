/**
 * @fileoverview Unit tests for the model/course.js file.
 */

/** Objects under test. */
var weekModel;
var es203Course;
var es203LectureCellGroup;
var es203LabCellGroup;
var m4 = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.FOURTH_HOUR};
var t4 = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.FOURTH_HOUR};
var r4 = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.FOURTH_HOUR};
var w7 = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.SEVENTH_HOUR};
var w8 = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.EIGHTH_HOUR};
var w9 = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.NINTH_HOUR};

function setUp() {
  weekModel = new rosegrid.model.Week();
  es203LectureCellGroup = new rosegrid.model.CellGroup(weekModel, [m4, t4, r4], 'ES204 ESys', 'O257', '#800', '#fff');
  es203LabCellGroup = new rosegrid.model.CellGroup(weekModel, [w7, w8, w9], 'ES204 ESys', 'C161', '#800', '#fff');
  es203Course = new rosegrid.model.Course(weekModel, [es203LectureCellGroup, es203LabCellGroup]);
}

function testBasicInitialization() {
  assertSameElements([es203LectureCellGroup, es203LabCellGroup], es203Course.getCellGroups());
}
