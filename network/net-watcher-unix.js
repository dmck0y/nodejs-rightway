'use strict';

var fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],

	server = net.createServer(function(connection) {
		var watcher;

		console.log('Subscriber connected.');
		connection.write("Now watching '" + filename + "' for changes...\n");

		watcher = fs.watch(filename, function() {
			connection.write("File '" + filename + "' changed: " + Date.now() + "\n");
		});

		connection.on('end', function() {
			console.log('Subscriber disconnected.');
			watcher.close();
		});

	});

	if (!filename) {
		throw Error('No target filename was specified.');
	}

	server.listen('/tmp/watcher.sock', function() {
		console.log('Listening for subscribers...');
	}); 