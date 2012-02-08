/**
 * @fileoverview Represents the data necessary to define a course.
 * 
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.model.Course');

goog.require('goog.array');
goog.require('rosegrid.model.CellGroup');

/**
 * Creates a new course object that holds all the data for a Course Editor.
 *
 * @param {rosegrid.model.Week} weekModel the model object representing all the cell models
 * @param {string=} courseBackgroundColor color of the cells for this course
 * @param {string=} courseTextColor color of the text in the cells for this course
 * @param {string=} officialCourseNumber course number example 'ME430'
 * @param {number=} officialCourseSection course section example 2
 * @param {Array.<rosegrid.model.CellGroup>=} cellGroups list of the cell groups holding the course meeting times
 * @constructor
 */
rosegrid.model.Course = function(weekModel, courseBackgroundColor, courseTextColor,
    officialCourseNumber, officialCourseSection, cellGroups) {

  /**
   * Reference to the complete week of cell models
   * @type {rosegrid.model.Week}
   */
  this.weekModel_ = weekModel;

  /**
   * Course department prefix + number, example ME430
   * @type {string}
   */
  this.officialCourseNumber = officialCourseNumber || '';

  /**
   * Section number for this course
   * @type {number}
   */
  this.officialCourseSection = goog.isNumber(officialCourseSection) ? officialCourseSection : 0;

  /**
   * Cell background color hexString.
   * @type {string}
   */
  this.courseBackgroundColor = courseBackgroundColor || '#fff';

  /**
   * Cell text color hexString.
   * @type {string}
   */
  this.courseTextColor = courseTextColor || '#000';
  
  /**
   * List of the cell groups holding the course meeting times.
   * @type {Array.<rosegrid.model.CellGroup>}
   */
  this.cellGroups_ = cellGroups || [];
};

/**
 * Returns a clone of the Array of cell groups.
 * @returns {Array.<rosegrid.model.CellGroup>}
 */
rosegrid.model.Course.prototype.getCellGroups = function() {
  return goog.array.clone(this.cellGroups_);
};


/**
 * Resets the values of the course to empty default values.
 */
rosegrid.model.Course.prototype.clear = function() {
  this.weekModel_ = null;
  this.officialCourseNumber = '';
  this.officialCourseSection = 0;
  this.courseBackgroundColor = '#fff';
  this.courseTextColor = '#000';
  this.cellGroups_ = [];
};

/**
 * Sets the properties of the model.Course using the courseProperties.
 * @param {rosegrid.model.Course} courseProperties Object with new properties for the model.Course.
 */
rosegrid.model.Course.prototype.setProperties = function(courseProperties) {
  this.officialCourseNumber = courseProperties.officialCourseNumber;
  this.officialCourseSection = courseProperties.officialCourseSection;
  this.courseBackgroundColor = courseProperties.courseBackgroundColor;
  this.courseTextColor = courseProperties.courseTextColor;
  this.cellGroups_ = [];
  for (var i = 0; i < courseProperties.getCellGroups().length; i++) {
    this.cellGroups_.push( courseProperties.getCellGroups()[i] ); 
  }
};

/**
 * Adds a new Cell Group to this course. Sets the background and text color to match the course.
 * Updates the cell models in the week model.
 * 
 * @param {Array.<rosegrid.model.CellIndex>=} cellIndices list of the cells in this group
 * @param {string=} courseName title of the course to display
 * @param {string=} roomNumber location for the course to display
 */
rosegrid.model.Course.prototype.addNewCellGroup = function(cellIndices, courseName, roomNumber) {
  var newCellGroup = new rosegrid.model.CellGroup(this.weekModel_, this.courseBackgroundColor,
      this.courseTextColor, cellIndices, courseName, roomNumber);
  newCellGroup.updateAllCellModels();
  this.cellGroups_.push(newCellGroup);
};

/**
 * Updates the CellModel objects via the Cell Groups.
 * Note: Don't call this method with the temporary dialog editor property holder "course".
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
 * @param {rosegrid.model.CellIndex} cellIndex 
 * @returns {boolean}
 */
rosegrid.model.Course.prototype.contains = function(cellIndex) {
  for (var i = 0; i < this.cellGroups_.length; i++) {
    var cellGroup = this.cellGroups_[i];
    if (cellGroup.contains(cellIndex)) {
      return true;
    }
  }
  return false;
};