/*
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
 * @param {rosegrid.ui.CellRenderer=} renderer
 * @constructor
 * @extends {goog.is.Control}
 */
rosegrid.ui.Cell = function(cellModel, renderer) {
  goog.base(this, null /* content */, renderer);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
  //this.setSupportedState(goog.ui.Component.State.DISABLED, false);
  
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
rosegrid.ui.Cell.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  // Override the superclass click listener
};

goog.ui.registry.setDefaultRenderer(rosegrid.ui.Cell, rosegrid.ui.CellRenderer);

goog.ui.registry.setDecoratorByClassName(rosegrid.ui.CellRenderer.CSS_CLASS, 
    function() { return new rosegrid.ui.Cell(); });
