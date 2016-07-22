/* ---------------------------------------------
 * nodebb-plugin-mega-realtime-online
 * Fix that force client-side NodeBB to ping server-side every 59 seconds
 * ---------------------------------------------*/

$(document).ready(function() {
	app.pingOnline = function() {
		socket.emit('plugins.pingOnline', {}, function(err, data) {
			if (err) return console.log('nodebb-plugin-mega-realtime-online has been just stopped');
			setTimeout(app.pingOnline, 5 * 1000);
			console.log('pingOnline');
		});
	};
	app.pingOnline();
});
