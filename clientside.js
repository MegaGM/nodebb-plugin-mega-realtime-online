/* ---------------------------------------------
 * nodebb-plugin-mega-realtime-online
 * Fix that force client-side NodeBB to ping server-side every 59 seconds
 * ---------------------------------------------*/

$(document).ready(function() {
	app.pingOnline = function() {
		socket.emit('modules.pingOnline', {client: 'meow'}, function() {
			console.log('socket.emit.pingOnline args: ', arguments);
			setTimeout(app.pingOnline, 3 * 1000);
		});
	};
	app.pingOnline();
});