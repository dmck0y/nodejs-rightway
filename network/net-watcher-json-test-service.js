'use strict';

var net = require('net'),
	server = net.createServer(function(c){
		console.log('Subscriber connected');

		c.write(
			'{"type" : "changed", "file" : "targ'
		);

		var timer = setTimeout(function(){
			c.write('et.txt", "time-stamp" : 1358175758495}' + "\n");
			c.end();
		}, 1000);

		c.on('end', function(){
			clearTimeout(timer);
			console.log('Subscriber disconnected');
		});
	});

server.listen(8124, function(){
	console.log('Test server listening for subscribers...');
});