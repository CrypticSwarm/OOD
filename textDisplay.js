var sys = require('sys');
var textDisplay = function(obj, indent){
  indent = indent || '';
  var type;
  for(var p in obj){
    type = typeof(obj[p]);
    if(textDisplay[type]) {
      sys.puts(indent + p + ':');
      textDisplay[type](obj[p], indent + '   ');
    }
    else sys.puts(indent + p + ': ' + obj[p]);
  }
};

textDisplay.object = function(obj, indent) {
	textDisplay(obj, indent);
};

exports.textDisplay = textDisplay;
