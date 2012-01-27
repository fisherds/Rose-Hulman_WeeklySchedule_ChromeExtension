/**
 * @fileOverview Control subclass that serves as an individual cell in the grid.
 *
 * @author David Fisher (fisherds@gmail.com)
 */

goog.provide('rosegrid.ui.CellControl');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');
goog.require('goog.string');
goog.require('rosegrid.model.Cell');


/**
 * Control that displays a single cell in the Rose grid.
 *
 * @param {rosegrid.model.Cell=} cellModel 
 * @param {goog.ui.ControlRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
rosegrid.ui.CellControl = function(cellModel, renderer) {

  /**
   * Div that holds the contents in the top of the cell.
   * @type {Element}
   */
  this.courseNameDiv;
  
  /**
   * Div that holds the contents in the bottom of the cell.
   * @type {Element}
   */
  this.roomNumberDiv;
  
  /**
   * td tag that holds this cell control.
   * @type {Element}
   */
  this.parentCellTd;
  
  if (!renderer) {
    renderer = goog.ui.ControlRenderer.getCustomRenderer(goog.ui.ControlRenderer, 'rg-cell');
  }
  goog.base(this, null /* content */, renderer);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  
  if (!cellModel) {
    //cellModel = {courseName: '', roomNumber: ''};
    cellModel = new rosegrid.model.Cell();
    // TODO: Log a warning if this default property is used.
  }
  this.setModel(cellModel);
};
goog.inherits(rosegrid.ui.CellControl, goog.ui.Control);


/**
 * @return {!rosegrid.model.Cell}
 * @override
 */
rosegrid.ui.CellControl.prototype.getModel;


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.createDom = function() {
  goog.base(this, 'createDom');
  goog.soy.renderElement(this.getElement(), rosegrid.templates.gridCell);
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.courseNameDiv = goog.dom.getElementsByTagNameAndClass('div', 'course-name', this.getElement())[0];
  this.roomNumberDiv = goog.dom.getElementsByTagNameAndClass('div', 'room-number', this.getElement())[0];
  //this.parentCellTd = this.getElement().parentNode;
  
  this.updateDisplay();
};


/**
 * Update the cell with new model object properties and update the DOM elements.
 * @param {Object=} cellModelProperties Cell model with new properties.
 */
rosegrid.ui.CellControl.prototype.updateDisplay = function(cellModelProperties) {
/*  if (cellModelProperties) {
    if (!goog.string.isEmptySafe(cellModelProperties.courseName)) {
      this.getModel().courseName = cellModelProperties.courseName;
    }
    if (!goog.string.isEmptySafe(cellModelProperties.roomNumber)) {
      this.getModel().roomNumber = cellModelProperties.roomNumber;
    }
  }*/
  this.getModel().setProperties(cellModelProperties);

  this.courseNameDiv.innerHTML = this.getModel().courseName;
  this.roomNumberDiv.innerHTML = this.getModel().roomNumber;
};


/** @inheritDoc */
rosegrid.ui.CellControl.prototype.canDecorate = function() {
  return false;
};
