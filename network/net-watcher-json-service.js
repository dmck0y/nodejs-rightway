'use strict';

var fs = require('fs'),
	net = require('net'),
	filename = process.argv[2],

	server = net.createServer(function(connection) {
		var watcher;

		console.log('Subscriber connected.');
		connection.write(JSON.stringify({
			type:'watching',
			file: filename
		}) + '\n');

		watcher = fs.watch(filename, function() {
			connection.write( JSON.stringify({
				type: 'changed',
				file: filename,
				timestamp: Date.now()
			}) + '\n');
		});

		connection.on('end', function() {
			console.log('Subscriber disconnected.');
			watcher.close();
		});

	});

	if (!filename) {
		throw Error('No target filename was specified.');
	}

	server.listen(8124, function() {
		console.log('Listening for subscribers...');
	}); 