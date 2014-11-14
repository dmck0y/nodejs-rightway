var fs = require('fs');

fs.writeFile('target.txt', 'a witty msg', function(err) {
	if (err) {
		throw err;
	}
	console.log('File saved!');
});