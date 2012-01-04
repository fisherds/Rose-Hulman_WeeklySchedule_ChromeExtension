
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.debug');
goog.require('roseGrid.Popup');

goog.events.listen(window, goog.events.EventType.LOAD, function() {
	var body = document.body;
	var id = body.id;
	window.console.log("entry id=" + id);
	
	if (id == 'popup') {
		var popup = new roseGrid.Popup(document.body);
		window.console.log("entry id=popup");
	}
	
});
