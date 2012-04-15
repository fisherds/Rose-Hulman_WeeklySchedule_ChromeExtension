/**
 * @fileoverview Instantiates the appropriate JavaScript objects for each html
 * page based on the id of the body element.
 *   
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.Main');

goog.require('goog.debug');
goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('rosegrid.PopupController');



/**
 * Loads the appropriate objects based on the body id.
 * @constructor
 */
rosegrid.Main = function() {
  // Initialize the logger.
  // Most common log levels: severe, warning, info, fine
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);
  
  var bodyEl = /** @type {!Element} */ (document.body);
  var bodyId = bodyEl.id; 
  if (bodyId == 'rosegrid-popup') {
    this.logger.info("Load the popup window.");
    new rosegrid.PopupController(bodyEl);
  } else if (bodyId == 'rosegrid-background') {
    this.logger.info("Load the background page.");
    // TODO: Create a background controller.
  }
};


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
rosegrid.Main.prototype.logger = goog.debug.Logger.getLogger('rosegrid.Main');


// Kick off the construction of controller JavaScript objects.
goog.events.listen(window, goog.events.EventType.LOAD, function() {
  new rosegrid.Main();
});
