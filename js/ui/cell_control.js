
/**
 * @fileOverview Control subclass that serves as an individual cell in the grid.
 * Very simple goog.ui.Control subclass that can be clicked and updated.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.ui.CellControl');
goog.provide('rosegrid.ui.CellControl.IdFragment');

goog.require('goog.dom');
goog.require('goog.ui.Control');
goog.require('rosegrid.model.Cell');


/**
 * Control that displays a single cell in the Rose grid.
 *
 * @param {rosegrid.model.Cell} cellModel 
 * @param {goog.ui.ControlRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
rosegrid.ui.CellControl = function(cellModel, renderer) {
  if (!renderer) {
    renderer = goog.ui.ControlRenderer.getCustomRenderer(
        goog.ui.ControlRenderer, 'cell-control');
  }
  goog.base(this, null /* content */, renderer);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  this.setModel(cellModel);
};
goog.inherits(rosegrid.ui.CellControl, goog.ui.Control);


/** enum {string} */
rosegrid.ui.CellControl.IdFragment = {
  COURSE_NAME: 'cn',
  ROOM_NUMBER: 'rn',
  PARENT_TD: 'pt'
};


/**
 * Change the return type of the getModel method.
 * @return {!rosegrid.model.Cell}
 * @override
 */
rosegrid.ui.CellControl.prototype.getModel;


// *****************************************************************************
//   goog.ui.Control Life cycle methods
// *****************************************************************************
/** @inheritDoc */
rosegrid.ui.CellControl.prototype.createDom = function() {
  var cellControlDom = goog.soy.renderAsFragment(
      rosegrid.templates.popup.cellControl);
  this.setElementInternal(/** @type {Element} */ (cellControlDom)); 
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal'); // Removes .element_ from the DOM.
  // Clean up any additional work done in createDom
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.canDecorate = function() {
  return true;
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.addIds_(this.getElement());
  this.updateDisplay();
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  // Clean up anything from enterDocument.
};


// *****************************************************************************
//   Helper methods to id and update the DOM display elements.
// *****************************************************************************

/**
 * Adds the appropriate id attributes to the DOM for this component.
 * @param {Element} element
 * @private
 */
rosegrid.ui.CellControl.prototype.addIds_ = function(element) {
  var courseNameDiv = goog.dom.getElementByClass('course-name', element);
  courseNameDiv.id = this.makeId(
      rosegrid.ui.CellControl.IdFragment.COURSE_NAME);
  var roomNumberDiv = goog.dom.getElementByClass('room-number', element);
  roomNumberDiv.id = this.makeId(
      rosegrid.ui.CellControl.IdFragment.ROOM_NUMBER);  
//  // Slight stretch of good programming practice to label the parent, oh well.
//  var parentCellTd = element.parentElement;
//  parentCellTd.id = this.makeId(
//      rosegrid.ui.CellControl.IdFragment.PARENT_TD);  
};


/**
 * Update the DOM elements.
 */
rosegrid.ui.CellControl.prototype.updateDisplay = function() {
  var courseNameDiv = this.getElementByFragment(
      rosegrid.ui.CellControl.IdFragment.COURSE_NAME);
  courseNameDiv.innerHTML = this.getModel().getCourseName();
  var roomNumberDiv = this.getElementByFragment(
      rosegrid.ui.CellControl.IdFragment.ROOM_NUMBER);
  roomNumberDiv.innerHTML = this.getModel().getRoomNumber();  
//  var parentCellTd = this.getElementByFragment(
//      rosegrid.ui.CellControl.IdFragment.PARENT_TD); 
//  goog.style.setStyle(parentCellTd, 'background-color',
//      this.getModel().getCellBackgroundColor());
//  goog.style.setStyle(parentCellTd, 'color',
//      this.getModel().getCellTextColor()); 
  goog.style.setStyle(this.getElement(), 'background-color',
      this.getModel().getCellBackgroundColor());
  goog.style.setStyle(this.getElement(), 'color',
      this.getModel().getCellTextColor());
};
