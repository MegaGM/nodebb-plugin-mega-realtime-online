/* ---------------------------------------------
 * % Online status updater
 * While user ACTUALLY on the site he has status 'online less than one minute ago'
 * This module is the Pong answer for frontend (setInterval) Ping ( performs every 59 seconds )
 * ---------------------------------------------*/
(function() {
	'use strict';

	var db = require.main.require('./src/database'),
		user = require.main.require('./src/user'),
		SocketModules = require.main.require('./src/socket.io/modules');

	var Plugin = {
		init: function(params, callback) {

			SocketModules.pingOnline = function(socket, data, callback) {
				console.log('SocketModules.pingOnline', data, socket.uid);
				if (!socket.uid) return;

				var callbackFix = function() {},
					now = Date.now();

				(function(socket) {
					user.getUserFields(socket.uid, ['status', 'lastonline'], function(err, userData) {
						if (err || userData.status === 'offline') return;

						user.setUserField(socket.uid, 'lastonline', now, function(err) {
							if (err) return;
							db.sortedSetAdd('users:online', now, socket.uid, function(err) {
								if (err) return;
								callback('suka');
							});
						});
					});
				})(socket);
			};

			callback(null);
		}
	};

	module.exports = Plugin;
})();