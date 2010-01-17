require('./getter').grabInto(['../ood'], GLOBAL);

exports.generateDocs = function(out, files, format){
	files = (files instanceof Array ? files : [files]);
	var output = require(format).output;
	files.forEach(function(file) {
		out('OUTPUTING ' + file + ' starting\n\n');
		require(file);
		getDoced().forEach(function(item) {
			out(output(item));
		});
		clearDoced();
	});
};
