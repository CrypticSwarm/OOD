exports.copy = function(from, to){
  for(var p in from) to[p] = from[p];
};

exports.grabInto = function(what, into){
  what.forEach(function(item){
    exports.copy(require(item), into);
  });
};
