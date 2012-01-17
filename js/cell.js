/**
 * @fileOverview Control subclass that serves as an individual cell in the grid.
 *
 * @author David Fisher (fisherds@gmail.com)
 */

goog.provide('rosegrid.ui.Cell');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.ui.Control');


/**
 * Control that displays a single cell in the Rose grid.
 * @param {rosegrid.CellModel=} cellModel 
 * @param {goog.ui.ControlRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
rosegrid.ui.Cell = function(cellModel, renderer) {
  if (!renderer) {
    renderer = goog.ui.ControlRenderer.getCustomRenderer(goog.ui.ControlRenderer, 'rg-cell');
  }
  goog.base(this, null /* content */, renderer);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  
  if (!cellModel) {
    cellModel = {courseName: '', roomNumber: ''};
  }
  this.setModel(cellModel);
};
goog.inherits(rosegrid.ui.Cell, goog.ui.Control);

/**
 * @return {!rosegrid.CellModel}
 * @override
 */
rosegrid.ui.Cell.prototype.getModel;
 
/** @return {string} */
rosegrid.ui.Cell.prototype.getCourseName = function() {
  return this.getModel().courseName;
};
 
/** @return {string} */
rosegrid.ui.Cell.prototype.getRoomNumber = function() {
  return this.getModel().roomNumber;
};

/** @inheritDoc */
rosegrid.ui.Cell.prototype.createDom = function() {
  goog.base(this, 'createDom');
  goog.soy.renderElement(this.getElement(), rosegrid.templates.gridCell);
};

/** @inheritDoc */
rosegrid.ui.Cell.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

/** @inheritDoc */
rosegrid.ui.Cell.prototype.canDecorate = function() {
  return false;
}
