
goog.require('goog.dom');
goog.require('goog.events');
goog.require('roseGrid.Popup');

goog.events.listen(window, goog.events.EventType.LOAD, function() {
	var body = document.body;
	var id = body.id;
	
	if (id == 'popup') {
		var popup = new roseGrid.Popup(document.body);
	}
	
});
