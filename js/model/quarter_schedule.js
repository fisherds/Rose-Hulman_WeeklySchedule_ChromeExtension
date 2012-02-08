/**
 * @fileoverview Represents the data necessary to define a quarter's schedule of courses.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.QuarterSchedule');

goog.require('goog.array');
goog.require('rosegrid.model.Course');

/**
 * Use static {@code getInstance} method to get the singleton instance.
 * @constructor
 */
rosegrid.model.QuarterSchedule = function() {};
goog.addSingletonGetter(rosegrid.model.QuarterSchedule);

/**
 * All of the courses in this quarter's schedule.
 * @type {Array.<rosegrid.model.Course>} 
 */
rosegrid.model.QuarterSchedule.prototype.courses_ = [];

/**
 * The model object representing all the cell models.
 * @type {rosegrid.model.Week}
 */
rosegrid.model.QuarterSchedule.prototype.weekModel = new rosegrid.model.Week();

/**
 * Loads the courses saved in local storage
 */
rosegrid.model.QuarterSchedule.prototype.loadSavedCourses = function() {

  // TODO: Save courses into persistent storage
  
  // Hard code values for testing
  var physicsCourse = new rosegrid.model.Course(this.weekModel, '#ee0', '#000', 'PH101', 2);
  var m3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.THIRD_HOUR);
  var t3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY, rosegrid.model.Period.THIRD_HOUR);
  var r3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY, rosegrid.model.Period.THIRD_HOUR);
  var w7 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.SEVENTH_HOUR);
  var w8 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.EIGHTH_HOUR);
  var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.NINTH_HOUR);
  physicsCourse.addNewCellGroup([m3, t3, r3], 'Physics I Class', 'O267');
  physicsCourse.addNewCellGroup([w7, w8, w9], 'Physics I Lab', 'CL102');
  this.courses_.push(physicsCourse);

  var calcCourse = new rosegrid.model.Course(this.weekModel, '#28f', '#000', 'MA111', 2);
  var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY, rosegrid.model.Period.FOURTH_HOUR);
  var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY, rosegrid.model.Period.FOURTH_HOUR);
  var w4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY, rosegrid.model.Period.FOURTH_HOUR);
  var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY, rosegrid.model.Period.FOURTH_HOUR);
  var f4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.FRIDAY, rosegrid.model.Period.FOURTH_HOUR);
  calcCourse.addNewCellGroup([m4, t4, w4, r4, f4], 'Calc I', 'O315');
  this.courses_.push(calcCourse);
  
};

/**
 * 
 */
rosegrid.model.QuarterSchedule.prototype.saveCourses = function() {
  // TODO: Save courses into persistent storage
};

/**
 * Adds a new course to this quarter's schedule.
 * @param {rosegrid.model.Course} newCourse new course to add to the schedule
 */
rosegrid.model.QuarterSchedule.prototype.addCoure = function(newCourse) {
  goog.array.insert(this.courses_, newCourse);
  
  // TODO: Look for cell conflict (ie two courses with the same cells)
  //  If there is a conflict remove the old connection and use this course as king.
  // TODO: Update all the cell models
};

/**
 * Removes the course from the quarter's schedule and resets those cells.
 * 
 * @param {rosegrid.model.Course} deleteCourse course that needs to be removed
 */
rosegrid.model.QuarterSchedule.prototype.removeCourse = function(deleteCourse) {
  goog.array.remove(this.courses_, deleteCourse);
  
  // TODO: Clean up after the deleted course
};


/**
 * Updates the CellModel objects via the Courses.
 */
rosegrid.model.QuarterSchedule.prototype.updateAllCellModels = function() {
  for (var i = 0; i < this.courses_.length; i++) {
    this.courses_[i].updateAllCellModels();
  }
};

/**
 * Returns the course at this CellIndex.  Returns null if no course fills that cell index.
 * @param {rosegrid.model.CellIndex} cellIndex 
 * @returns {rosegrid.model.Course}
 */
rosegrid.model.QuarterSchedule.prototype.getCourseAtIndex = function(cellIndex) {
  for (var i = 0; i < this.courses_.length; i++) {
    var course = this.courses_[i];
    if (course.contains(cellIndex)) {
      return course;
    }
  }
  return null;
};


/**
 * Returns a copy of the courses in this quarter's schedule
 * @returns {Array.<rosegrid.model.Course>}
 */
rosegrid.model.QuarterSchedule.prototype.getCourses = function() {
  return goog.array.clone(this.courses_);
};

/**
 * Returns a copy of the courses in this quarter's schedule
 * @returns {Array.<rosegrid.model.Course>}
 */
rosegrid.model.QuarterSchedule.prototype.getWeekModel = function() {
  return this.weekModel;
};