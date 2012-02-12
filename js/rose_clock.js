
/**
 * @fileoverview Gets the offset for the Rose clock vs the real time.  Uses
 * JSONP to call setRoseClockOffset with the offset value.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('rosegrid.RoseClock');

goog.require('goog.array');

/**
 * Use static {@code getInstance} method to get the singleton instance.
 * @constructor
 */
rosegrid.RoseClock = function() {
  
  /**
   * Number of seconds fast or slow that the Rose bell clock is running vs the
   * network time.  Network time + offset = Rose Clock.  So positive values
   * mean that the Rose clock is running fast.
   * @type {number} 
   */
  this.offsetSeconds = 0;
  

  var jsonpUrl = 'http://www.mobacdesign.com/rosegrid/clock_offset_jsonp.json';
  //var url = '../tests/clock_offset_jsonp.json';
  this.scriptEl = goog.dom.createDom('script', {id: 'clock-jsonp-script'});
  this.scriptEl.src = jsonpUrl;
};
goog.addSingletonGetter(rosegrid.RoseClock);
goog.exportSymbol('rosegrid.RoseClock', rosegrid.RoseClock);

/**
 * 
 */
rosegrid.RoseClock.prototype.updateOffset = function() {
  goog.dom.appendChild( goog.dom.getElement('popup'), this.scriptEl);
};

/**
 * This is the function that the JSONP script will call.
 */
rosegrid.RoseClock.prototype.setOffsetJsonp = function (newOffset) {
  this.offsetSeconds = newOffset.offset;
  goog.dom.getElement('popup').removeChild(
      goog.dom.getElement('clock-jsonp-script'));
  window.console.log("The real new time has been set as " + newOffset.offset);
};
