
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.debug');
goog.require('rosegrid.PopupWindow');

goog.events.listen(window, goog.events.EventType.LOAD, function() {
	var body = document.body;
	var id = body.id;
	
	if (id == 'popup') {
		new rosegrid.PopupWindow(document.body);
	}
	
});
