require('./getter').grabInto(['./docs'], GLOBAL);
var path = './';
exports.generateDocs = function(out, files, format){
	files = (files instanceof Array ? files : [files]);
	var output = require(format).output;
	files.forEach(function(file) {
		out('OUTPUTING ' + file + ' starting\n\n');
		require(path + file);
		getDoced().forEach(function(item) {
			output(out, item);
		});
		clearDoced();
	});
};
