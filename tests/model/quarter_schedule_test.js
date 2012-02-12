
/**
 * @fileoverview Unit tests for the js/model/quarter_schedule.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var schedule;
var physicsCourse, calcCourse;
var physicsClassGroup, physicsLabGroup, calcGroup;
var m3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.THIRD_HOUR);
var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var m10 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
    rosegrid.model.Period.TENTH_HOUR);
var t3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
    rosegrid.model.Period.THIRD_HOUR);
var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var w4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var w7 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.SEVENTH_HOUR);
var w8 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.EIGHTH_HOUR);
var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
    rosegrid.model.Period.NINTH_HOUR);
var r3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.THIRD_HOUR);
var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.FOURTH_HOUR);
var r5 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.FIFTH_HOUR);
var r6 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
    rosegrid.model.Period.SIXTH_HOUR);
var f4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.FRIDAY,
    rosegrid.model.Period.FOURTH_HOUR);


function setUp() {
  schedule = rosegrid.model.QuarterSchedule.getInstance();
  schedule.clear();
}


function testAddCourse_noConflict() {
  addTestCourses();
  assertEquals(2, schedule.getCourses().length);

  assertEquals('#ee0',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellTextColor());
  assertEquals('Physics I Class',
      schedule.weekModel.getCellModelByCellIndex(m3).getCourseName());
  assertEquals('O267',
      schedule.weekModel.getCellModelByCellIndex(m3).getRoomNumber());

  assertEquals('#ee0',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('Physics I Lab',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('CL102',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());

  assertEquals('#28f',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('Calc I',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('O315',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getRoomNumber());
}


function testAddCourse_conflict() {
  addTestCourses();

  assertEquals('#28f',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('Calc I',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('O315',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());

  var deCourse = new rosegrid.model.Course(schedule.weekModel,
      '#abc', '#123', 'MA201', 1);
  deCourse.addNewCellGroup('DE 1', 'O333', [r4, r5, r6]);
  schedule.addCoure(deCourse);

  assertSameElements([m4, t4, w4, f4], calcGroup.getCellIndices());

  assertEquals('#abc',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#123',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('DE 1',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('O333',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());
}


function testLoadSavedCourses() {
}


function testEraseSavedData() {
}


function testSaveCourses() {
}


function testClear() {
  addTestCourses();
  schedule.clear();
  assertEquals(0, schedule.getCourses().length);

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getRoomNumber());
}


function testRemoveCellIndices_() {
  addTestCourses();
  assertEquals('#28f',
      schedule.weekModel.getCellModelByCellIndex(m4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m4).getCellTextColor());
  assertEquals('Calc I',
      schedule.weekModel.getCellModelByCellIndex(m4).getCourseName());
  assertEquals('O315',
      schedule.weekModel.getCellModelByCellIndex(m4).getRoomNumber());

  assertEquals('#ee0',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('Physics I Lab',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('CL102',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());

  schedule.removeCellIndices_([m4, w9]);

  assertSameElements([w7, w8], physicsLabGroup.getCellIndices());
  assertSameElements([t4, w4, r4, f4], calcGroup.getCellIndices());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m4).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m4).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m4).getRoomNumber());
  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());
}


function testRemoveCourse() {
  addTestCourses();
  schedule.removeCourse(physicsCourse);
  assertSameElements([calcCourse], schedule.getCourses());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());
}


function testUpdateAllCellModels() {
  addTestCourses();
  schedule.weekModel.clear();

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m3).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getRoomNumber());

  schedule.updateAllCellModels();

  assertEquals('#ee0',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m3).getCellTextColor());
  assertEquals('Physics I Class',
      schedule.weekModel.getCellModelByCellIndex(m3).getCourseName());
  assertEquals('O267',
      schedule.weekModel.getCellModelByCellIndex(m3).getRoomNumber());

  assertEquals('#ee0',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(w9).getCellTextColor());
  assertEquals('Physics I Lab',
      schedule.weekModel.getCellModelByCellIndex(w9).getCourseName());
  assertEquals('CL102',
      schedule.weekModel.getCellModelByCellIndex(w9).getRoomNumber());

  assertEquals('#28f',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(r4).getCellTextColor());
  assertEquals('Calc I',
      schedule.weekModel.getCellModelByCellIndex(r4).getCourseName());
  assertEquals('O315',
      schedule.weekModel.getCellModelByCellIndex(r4).getRoomNumber());

  assertEquals('#fff',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellBackgroundColor());
  assertEquals('#000',
      schedule.weekModel.getCellModelByCellIndex(m10).getCellTextColor());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getCourseName());
  assertEquals('',
      schedule.weekModel.getCellModelByCellIndex(m10).getRoomNumber());
}


function testGetCourseAtCellIndex() {
  addTestCourses();
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(m3));
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(t3));
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(r3));
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(w7));
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(w8));
  assertEquals(physicsCourse, schedule.getCourseAtCellIndex(w9));

  assertEquals(calcCourse, schedule.getCourseAtCellIndex(m4));
  assertEquals(calcCourse, schedule.getCourseAtCellIndex(t4));
  assertEquals(calcCourse, schedule.getCourseAtCellIndex(w4));
  assertEquals(calcCourse, schedule.getCourseAtCellIndex(r4));
  assertEquals(calcCourse, schedule.getCourseAtCellIndex(f4));

  assertNull(schedule.getCourseAtCellIndex(m10));
}


function testGetCourses() {
  addTestCourses();
  assertSameElements([physicsCourse, calcCourse], schedule.getCourses());
}


function testGetWeekModel() {
  assertEquals(schedule.weekModel, schedule.getWeekModel());
}


function addTestCourses() {
  physicsCourse = new rosegrid.model.Course(schedule.weekModel,
      '#ee0', '#000', 'PH101', 2);
  physicsClassGroup = physicsCourse.addNewCellGroup('Physics I Class', 'O267',
      [m3, t3, r3]);
  physicsLabGroup = physicsCourse.addNewCellGroup('Physics I Lab', 'CL102',
      [w7, w8, w9]);
  schedule.addCoure(physicsCourse);

  calcCourse = new rosegrid.model.Course(schedule.weekModel,
      '#28f', '#000', 'MA111', 2);
  calcGroup = calcCourse.addNewCellGroup('Calc I', 'O315',
      [m4, t4, w4, r4, f4]);
  schedule.addCoure(calcCourse);
}
