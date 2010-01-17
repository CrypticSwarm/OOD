exports.output = function(obj){
	var returnString = '';

	var textDisplay = function(obj, indent){
		indent = indent || '';
		var type;
		for(var p in obj){
			type = typeof(obj[p]);
			if(textDisplay[type]) {
				returnString += indent + p + ':\n';
				textDisplay[type](obj[p], indent + '   ');
			}
			else returnString += indent + p + ': ' + obj[p] + '\n';
		}
	};

	textDisplay.object = function(obj, indent) {
		textDisplay(obj, indent);
	};
	returnString += obj.name + ' Documentation\n';
	textDisplay(obj.doc);
	return returnString;
};
