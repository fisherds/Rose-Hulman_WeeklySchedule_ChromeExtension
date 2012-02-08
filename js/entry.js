
goog.provide('rosegrid.entry');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.debug');
goog.require('rosegrid.PopupWindow');

goog.events.listen(window, goog.events.EventType.LOAD, function() {
	if (document.body.id == 'popup') {
		new rosegrid.PopupWindow();
	}
});
