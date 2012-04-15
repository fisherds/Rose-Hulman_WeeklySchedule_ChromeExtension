
/**
 * @fileoverview Represents the data necessary to define a course.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Course');

goog.require('goog.array');
goog.require('rosegrid.model.Cell');
goog.require('rosegrid.model.CellGroup');



/**
 * Creates a new course object that holds all the data for a Course Editor.
 *
 * @param {rosegrid.model.Week} weekModel The model object representing all the
 *     cell models.
 * @param {string=} courseBackgroundColor Color of the cells for this course.
 * @param {string=} courseTextColor Color of the text for this course.
 * @param {string=} officialCourseNumber Course number example 'ME430'.
 * @param {number=} officialCourseSection Course section example 2.
 * @param {Array.<rosegrid.model.CellGroup>=} cellGroups Array of the cell
 *     groups holding the course meeting times.
 * @constructor
 */
rosegrid.model.Course = function(weekModel, courseBackgroundColor,
    courseTextColor, officialCourseNumber, officialCourseSection, cellGroups) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   * @private
   */
  this.weekModel_ = weekModel;

  /**
   * Cell background color hexString.
   * @type {string}
   */
  this.courseBackgroundColor = courseBackgroundColor ||
      rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR;

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.courseTextColor = courseTextColor ||
      rosegrid.model.Cell.DEFAULT_TEXT_COLOR;

  /**
   * Course department prefix + number, example ME430
   * @type {string}
   */
  this.officialCourseNumber = officialCourseNumber || '';

  /**
   * Section number for this course
   * @type {number}
   */
  this.officialCourseSection = goog.isNumber(officialCourseSection) ?
      officialCourseSection : 0;

  /**
   * List of the cell groups holding the course meeting times.
   * @type {Array.<rosegrid.model.CellGroup>}
   * @private
   */
  this.cellGroups_ = cellGroups || [];
};


/**
 * Returns a clone of the Array of cell groups.
 * @return {Array.<rosegrid.model.CellGroup>} Clone of the array of cell groups.
 */
rosegrid.model.Course.prototype.getCellGroups = function() {
  return goog.array.clone(this.cellGroups_);
};


/**
 * Resets all the cell model objects in the cell groups, then resets the values
 * of the course to default values.  Does not alter the week model.
 */
rosegrid.model.Course.prototype.clear = function() {
  this.officialCourseNumber = '';
  this.officialCourseSection = 0;
  this.courseBackgroundColor = rosegrid.model.Cell.DEFAULT_BACKGROUND_COLOR;
  this.courseTextColor = rosegrid.model.Cell.DEFAULT_TEXT_COLOR;
  for (var i = 0; i < this.cellGroups_.length; i++) {
    this.cellGroups_[i].clear();
  }
  this.cellGroups_ = [];
};


/**
 * Set the week model property.
 * @param {rosegrid.model.Week} weekModel New week model or null.
 */
rosegrid.model.Course.prototype.setWeekModel = function(weekModel) {
  this.weekModel_ = weekModel;
};

/**
 * Creates a new course with the same properties as an existing course.
 * @return {rosegrid.model.Course} New course with the same properties.
 */
rosegrid.model.Course.prototype.clone = function() {
  var newCourse = new rosegrid.model.Course(this.weekModel_);
  newCourse.setProperties(this);
  return newCourse;
};


/**
 * Sets the properties of the model.Course using the courseProperties.  Does
 * NOT set the week model.
 *
 * @param {rosegrid.model.Course} courseProperties Object with new properties
 *     for the model.Course.
 */
rosegrid.model.Course.prototype.setProperties = function(courseProperties) {
  this.officialCourseNumber = courseProperties.officialCourseNumber;
  this.officialCourseSection = courseProperties.officialCourseSection;
  this.courseBackgroundColor = courseProperties.courseBackgroundColor;
  this.courseTextColor = courseProperties.courseTextColor;
  this.cellGroups_ = [];
  for (var i = 0; i < courseProperties.getCellGroups().length; i++) {
    this.cellGroups_.push(courseProperties.getCellGroups()[i].clone());
  }
};


/**
 * Adds the cell group items to the course.  No action is taken to set the
 * values in the week model.
 *
 * @param {Array.<rosegrid.model.CellGroup>} cellGroups Array of the cell
 *    group objects that need to be added to this course.
 */
rosegrid.model.Course.prototype.addCellGroups = function(cellGroups) {
  for (var i = 0; i < cellGroups.length; i++) {
    goog.array.insert(this.cellGroups_, cellGroups[i]);
  }
};


/**
 * Creates a new Cell Group and adds it to this course.  Sets the background and
 * text color to match the course.  Updates the cell models in the week model.
 *
 * @param {string=} courseName Title of the course to display.
 * @param {string=} roomNumber Location for the course to display.
 * @param {Array.<rosegrid.model.CellIndex>=} cellIndices Array of the cell
 *     indices that are managed by this cell group.
 * @return {rosegrid.model.CellGroup} The new cell group.
 */
rosegrid.model.Course.prototype.addNewCellGroup =
    function(courseName, roomNumber, cellIndices) {
  var newCellGroup = new rosegrid.model.CellGroup(
      this.weekModel_, this.courseBackgroundColor, this.courseTextColor,
      courseName, roomNumber, cellIndices);
  newCellGroup.updateAllCellModels();
  this.addCellGroups([newCellGroup]);
  return newCellGroup;
};


/**
 * Removes the cell group if it is part of this course.
 *
 * @param {rosegrid.model.CellGroup} cellGroup Cell group to remove.
 * @return {boolean} Returns true if the cell group is removed.
 */
rosegrid.model.Course.prototype.removeCellGroup = function(cellGroup) {
  var cellGroupIndex = goog.array.indexOf(this.cellGroups_, cellGroup);
  return this.removeCellGroupAtIndex(cellGroupIndex);
};


/**
 * Removes the cell group at the given index.
 *
 * @param {number} cellGroupIndex Index of the cell group to remove.
 * @return {boolean} Returns true if the cell group is removed.
 */
rosegrid.model.Course.prototype.removeCellGroupAtIndex =
    function(cellGroupIndex) {
  if (cellGroupIndex < 0 || cellGroupIndex >= this.cellGroups_.length) {
    return false;
  }
  // Clear the cell in the cell group before it is removed.
  this.cellGroups_[cellGroupIndex].clear();
  goog.array.removeAt(this.cellGroups_, cellGroupIndex);
  return true;
};


/**
 *
 * @param {Array.<rosegrid.model.CellIndex>} cellIndices Cell indices to remove.
 */
rosegrid.model.Course.prototype.removeCellIndices = function(cellIndices) {
  for (var i = 0; i < this.cellGroups_.length; i++) {
    var cellGroup = this.cellGroups_[i];
    cellGroup.removeCellIndices(cellIndices);
  }
};


/**
 * Updates the CellModel objects in the week via the Cell Groups.
 */
rosegrid.model.Course.prototype.updateAllCellModels = function() {
  for (var i = 0; i < this.cellGroups_.length; i++) {
    var cellGroup = this.cellGroups_[i];
    cellGroup.cellBackgroundColor = this.courseBackgroundColor;
    cellGroup.cellTextColor = this.courseTextColor;
    cellGroup.updateAllCellModels();
  }
};


/**
 * Returns true of a cell group contains that cellIndex.
 * @param {rosegrid.model.CellIndex} cellIndex The cell index to search for.
 * @return {boolean} True if the cell index is contained within one of the cell
 *     groups for this course.
 */
rosegrid.model.Course.prototype.containsCellIndex = function(cellIndex) {
  for (var i = 0; i < this.cellGroups_.length; i++) {
    var cellGroup = this.cellGroups_[i];
    if (cellGroup.containsCellIndex(cellIndex)) {
      return true;
    }
  }
  return false;
};
