var getter = require('./getter');
var ood = require('../ood');
getter.copy(ood, GLOBAL);

exports.generateDocs = function(out, files, format, sandbox){
	files = (files instanceof Array ? files : [files]);
	var output = require(format).output;
	files.forEach(function(file) {
		out('OUTPUTING ' + file + ' starting\n\n');
		if(sandbox) ood.sandbox();
		require('../examples/' + file);
		out(output(popTree()));	
	});
};
