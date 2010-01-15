exports.output = function(out, obj){

	var textDisplay = function(obj, indent){
		indent = indent || '';
		var type;
		for(var p in obj){
			type = typeof(obj[p]);
			if(textDisplay[type]) {
				out(indent + p + ':');
				textDisplay[type](obj[p], indent + '   ');
			}
			else out(indent + p + ': ' + obj[p]);
		}
	};

	textDisplay.object = function(obj, indent) {
		textDisplay(obj, indent);
	};
	out(obj.name + ' Documentation');
	textDisplay(obj.doc);
};
