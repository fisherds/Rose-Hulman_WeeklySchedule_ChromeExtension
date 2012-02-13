
/**
 * @fileOverview Container that hold the Cell Controls in the table.  Primary
 * purpose is to maintain references to the 40 cell controls, so that they can
 * all be updated and to reduce the number of listeners.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.ui.TableContainer');

goog.require('goog.dom');
goog.require('goog.ui.Container');
goog.require('rosegrid.model.Week');
goog.require('rosegrid.ui.CellControl');


/**
 * Container for the cell controls.
 *
 * @param {rosegrid.model.Week} weekModel 
 * @param {goog.ui.ContainerRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Container}
 */
rosegrid.ui.TableContainer = function(weekModel, renderer) {
  goog.base(this, null /* content */, renderer);
  this.setModel(weekModel);
};
goog.inherits(rosegrid.ui.TableContainer, goog.ui.Container);


/** enum {string} */
rosegrid.ui.TableContainer.IdFragment = {
  PERIOD_NUMBER_ROW: 'pnr',
  PERIOD_TIMES_ROW: 'ptr'
};


/**
 * Change the return type of the getModel method.
 * @return {!rosegrid.model.Week}
 * @override
 */
rosegrid.ui.TableContainer.prototype.getModel;


// *****************************************************************************
//   goog.ui.Component Life cycle methods
// *****************************************************************************
/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.createDom = function() {
  goog.base(this, 'createDom');
};


/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.canDecorate = function() {
  return true;
};


/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.decorateInternal = function() {
  goog.base(this, 'decorateInternal');
  
  // Create all the cell controls.
  var cellControlClass = goog.getCssName('rg-cell');
  var cellControlTds = goog.dom.getElementsByClass(cellControlClass);
  for (var i = 0; i < cellControlTds.length; i++) {
    var cellControlTd = cellControlTds[i];
    var cellControl = new rosegrid.ui.CellControl(
        this.getModel().getCellModelForNumericIndex(i));
    cellControl.render(cellControlTd);
    this.addChild(cellControl, false);
  }
  
};


/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  // Clean up anything from createDom / decorateInternal.
};


/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.updateDisplay();
};


/** @inheritDoc */
rosegrid.ui.TableContainer.prototype.exitDocument = function() {
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
rosegrid.ui.TableContainer.prototype.addIds_ = function(element) {
  // TODO: Add the ids to the 
};


/**
 * Update the DOM elements.
 */
rosegrid.ui.TableContainer.prototype.updateDisplay = function() {
  // Loop through all the children and call updateDisplay on them.
  

  // Initialize course table
  this.forEachChild(function(child,index) {
    child.updateDisplay();
  });
//  for (var i = 0; i < this.getChildCount(); i++) {
//    this.getChildAt(i).updateDisplay();
//  }
  
};
