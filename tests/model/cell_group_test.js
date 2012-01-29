/**
 * @fileoverview Unit tests for the model/course.js file.
 */

/** Objects under test. */
var me430Course;
var csse490Course;
var weekModel;

function setUp() {
  weekModel = new rosegrid.model.Week();
  var m3 = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.THIRD_HOUR};
  var t3 = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.THIRD_HOUR};
  var r3 = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.THIRD_HOUR};
  var m4 = {weekday: rosegrid.Weekday.MONDAY, period: rosegrid.Period.FOURTH_HOUR};
  var t4 = {weekday: rosegrid.Weekday.TUESDAY, period: rosegrid.Period.FOURTH_HOUR};
  var r4 = {weekday: rosegrid.Weekday.THURSDAY, period: rosegrid.Period.FOURTH_HOUR};
  var mtr34 = [m3, t3, r3, m4, t4, r4];
  me430Course = new rosegrid.model.CellGroup(weekModel, mtr34, 'ME430', 'C111', '#33e', '#000');  

  var w9 = {weekday: rosegrid.Weekday.WEDNESDAY, period: rosegrid.Period.NINTH_HOUR};
  csse490Course = new rosegrid.model.CellGroup(weekModel, [w9], 'CSSE490', 'F217', '#281', '#fff');
}

function testBasicInitialization() {

}
