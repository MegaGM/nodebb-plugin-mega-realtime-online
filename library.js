/* ---------------------------------------------
* % Online status updater
* While user ACTUALLY on the site he has status 'online less than one minute ago'
* This module is the Pong answer for frontend (setInterval) Ping ( performs every 59 seconds )
* ---------------------------------------------*/
( function ( ) {
	'use strict';

	var db = require.main.require( './src/database' ),
		user = require.main.require( './src/user' ),
		SocketModules = require.main.require( './src/socket.io/modules' );

	var Plugin = {
		init: function ( params, callback ) {

			SocketModules.pingOnline = function ( socket, data, callback ) {
				if ( !socket.uid ) return;

				( function( socket ) {
					var callbackFix = function( ) { };
					user.getUserFields( socket.uid, [ 'status', 'lastonline' ], function( err, userData ) {
						var now = Date.now( );
						if ( err || userData.status === 'offline' ) return callback( err );

						user.setUserField( socket.uid, 'lastonline', now, callbackFix );
					});
				})( socket );

				( function( socket ) {
					var callbackFix = function( ) { };
					var now = Date.now( );
					db.sortedSetAdd( 'users:online', now, socket.uid, callbackFix );
				})( socket );

				callback( 'suka' );
			};

			callback( null );
		}
	};

	module.exports = Plugin;
})( );
