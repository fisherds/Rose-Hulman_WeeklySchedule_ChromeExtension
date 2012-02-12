
/**
 * @fileoverview Represents the data necessary to define a quarter's schedule
 * of courses.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.QuarterSchedule');

goog.require('goog.array');
goog.require('rosegrid.model.Course');
goog.require('rosegrid.model.Week');



/**
 * Use static {@code getInstance} method to get the singleton instance.
 * @constructor
 */
rosegrid.model.QuarterSchedule = function() {

  /**
   * All of the courses in this quarter's schedule.
   * @type {Array.<rosegrid.model.Course>}
   * @private
   */
  this.courses_ = [];

  /**
   * "THE" model object representing all the cell models in the week.
   * @type {rosegrid.model.Week}
   */
  this.weekModel = new rosegrid.model.Week();

};
goog.addSingletonGetter(rosegrid.model.QuarterSchedule);


/**
 * Loads the courses that were saved into local storage.
 */
rosegrid.model.QuarterSchedule.prototype.loadSavedCourses = function() {

  // TODO: Load courses from local storage.

  if (true) {
    this.courses_ = [];
    // Hard code values for testing only
    var physicsCourse = new rosegrid.model.Course(this.weekModel,
        '#ee0', '#000', 'PH101', 2);
    var m3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
        rosegrid.model.Period.THIRD_HOUR);
    var t3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
        rosegrid.model.Period.THIRD_HOUR);
    var r3 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
        rosegrid.model.Period.THIRD_HOUR);
    var w7 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
        rosegrid.model.Period.SEVENTH_HOUR);
    var w8 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
        rosegrid.model.Period.EIGHTH_HOUR);
    var w9 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
        rosegrid.model.Period.NINTH_HOUR);
    physicsCourse.addNewCellGroup('Physics I Class', 'O267', [m3, t3, r3]);
    physicsCourse.addNewCellGroup('Physics I Lab', 'CL102', [w7, w8, w9]);
    this.courses_.push(physicsCourse);

    var calcCourse = new rosegrid.model.Course(this.weekModel,
        '#28f', '#000', 'MA111', 2);
    var m4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.MONDAY,
        rosegrid.model.Period.FOURTH_HOUR);
    var t4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.TUESDAY,
        rosegrid.model.Period.FOURTH_HOUR);
    var w4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.WEDNESDAY,
        rosegrid.model.Period.FOURTH_HOUR);
    var r4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.THURSDAY,
        rosegrid.model.Period.FOURTH_HOUR);
    var f4 = new rosegrid.model.CellIndex(rosegrid.model.Weekday.FRIDAY,
        rosegrid.model.Period.FOURTH_HOUR);
    calcCourse.addNewCellGroup('Calc I', 'O315', [m4, t4, w4, r4, f4]);
    this.courses_.push(calcCourse);
  }
};


/**
 * Erases any course data from local storage.
 */
rosegrid.model.QuarterSchedule.prototype.eraseSavedData = function() {
  // TODO: Erase all local storage
};


/**
 * Saves the courses into local storage.
 */
rosegrid.model.QuarterSchedule.prototype.saveCourses = function() {
  // TODO: Save courses into local storage
};


/**
 * Removes all courses and creates a
 */
rosegrid.model.QuarterSchedule.prototype.clear = function() {
  for (var courseIndex = 0; courseIndex < this.courses_.length; courseIndex++) {
    var course = this.courses_[courseIndex];
    course.clear();
  }
  this.courses_ = [];
  this.weekModel.clear();
};


/**
 * Adds a new course to this quarter's schedule.
 * @param {rosegrid.model.Course} newCourse new course to add to the schedule.
 */
rosegrid.model.QuarterSchedule.prototype.addCoure = function(newCourse) {
  // Look for cell index conflicts (ie two courses with the same cells).
  // If there is a conflict remove the old connection.
  var cellGroups = newCourse.getCellGroups();
  for (var groupIndex = 0; groupIndex < cellGroups.length; groupIndex++) {
    var cellGroup = cellGroups[groupIndex];
    var cellIndices = cellGroup.getCellIndices();
    this.removeCellIndices_(cellIndices);
  }

  goog.array.insert(this.courses_, newCourse);
  this.updateAllCellModels();
};


/**
 * Helper function that will clear out cell index conflicts with existing
 * courses.
 *
 * @param {Array.<rosegrid.model.CellIndex>} cellIndices Cell indices to remove.
 * @private
 */
rosegrid.model.QuarterSchedule.prototype.removeCellIndices_ =
    function(cellIndices) {
  for (var courseIndex = 0; courseIndex < this.courses_.length; courseIndex++) {
    var course = this.courses_[courseIndex];
    course.removeCellIndices(cellIndices);
  }
};


/**
 * Removes the course from the quarter's schedule and resets those cells.
 *
 * @param {rosegrid.model.Course} deleteCourse course that needs to be removed.
 */
rosegrid.model.QuarterSchedule.prototype.removeCourse = function(deleteCourse) {
  var courseIndex = goog.array.indexOf(this.courses_, deleteCourse);
  if (courseIndex > -1) {
    deleteCourse.clear();
    goog.array.remove(this.courses_, deleteCourse);
  }
};


/**
 * Updates the CellModel objects via the Courses.
 */
rosegrid.model.QuarterSchedule.prototype.updateAllCellModels = function() {
  // Different than other updates because it clears the slate (ie week) first.
  this.weekModel.clear();
  for (var i = 0; i < this.courses_.length; i++) {
    this.courses_[i].updateAllCellModels();
  }
};


/**
 * Returns the course at this CellIndex.  Returns null if no course fills that
 * cell index.
 *
 * @param {rosegrid.model.CellIndex} cellIndex Cell index to search for.
 * @return {rosegrid.model.Course} The course for that cell index.
 */
rosegrid.model.QuarterSchedule.prototype.getCourseAtCellIndex =
    function(cellIndex) {
  for (var i = 0; i < this.courses_.length; i++) {
    var course = this.courses_[i];
    if (course.containsCellIndex(cellIndex)) {
      return course;
    }
  }
  return null;
};


/**
 * Returns a copy of the courses in this quarter's schedule
 * @return {Array.<rosegrid.model.Course>} Clone of the array of courses.
 */
rosegrid.model.QuarterSchedule.prototype.getCourses = function() {
  return goog.array.clone(this.courses_);
};


/**
 * Returns a copy of the courses in this quarter's schedule
 * @return {rosegrid.model.Week} "The" week model.
 */
rosegrid.model.QuarterSchedule.prototype.getWeekModel = function() {
  return this.weekModel;
};
