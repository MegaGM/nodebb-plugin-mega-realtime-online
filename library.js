/* ---------------------------------------------
 * % Online status updater
 * While user ACTUALLY on the site he has status 'online less than one minute ago'
 * This module is the Pong answer for frontend (setInterval) Ping ( performs every 59 seconds )
 * ---------------------------------------------*/
(function () {
	'use strict';

	let Promise = require('bluebird'),
		db = Promise.promisifyAll(require.main.require('./src/database')),
		user = Promise.promisifyAll(require.main.require('./src/user')),
		SocketPlugins = require.main.require('./src/socket.io/plugins');

	let Plugin = {
		init: function (params, callback) {
			SocketPlugins.ping = function (socket, data, callback) {
				// TODO: debug
				// console.log('ping', data, socket.uid);
				if (!socket.uid)
					return callback(new Error('you\'re anonymous'));

				let now = Date.now();
				// make user "online"
				Promise.join(
					user.setUserFieldAsync(socket.uid, 'lastonline', now),
					db.sortedSetAddAsync('users:online', now, socket.uid),
					() => callback(null)
				);
			};

			// return control flow to NodeBB
			callback(null);
		}
	};

	module.exports = Plugin;
})();
