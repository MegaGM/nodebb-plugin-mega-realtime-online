/* ---------------------------------------------
 * nodebb-plugin-mega-realtime-online
 * Fix that force client-side NodeBB to ping server-side every 59 seconds
 * ---------------------------------------------*/

$(document).ready(function () {
	app.ping = function () {
		socket.emit('plugins.ping', {}, function (err, data) {
			if (err) return console.log(err);
			// if (err) return console.log('realtime-online stopped', err);
			setTimeout(app.ping, 2 * 1000);
		});
	};
	app.ping();
});
