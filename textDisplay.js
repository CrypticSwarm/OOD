var sys = require('sys');
var $type = require('./type').$type;
var textDisplay = function(obj, indent){
  indent = indent || '';
  var type;
  for(var p in obj){
    type = $type(obj[p]);
    if(textDisplay[type]) {
      sys.puts(indent + p + ':');
      textDisplay[type](obj[p], indent + '   ');
    }
    else sys.puts(indent + p + ': ' + obj[p]);
  }
};

textDisplay.object = function(obj, indent) {
  if(obj instanceof Array) obj.forEach(function(item){ textDisplay(obj, indent); });
  else textDisplay(obj, indent);
};

exports.textDisplay = textDisplay;