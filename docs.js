require('./getter').copy((function(){
  var cur;
  var ret = {
    doc: function(what, desc, func){
      var prev = cur || this;
      cur = prev[what] = { description: desc };
      func();
      cur = prev;
    },

    group: function(name, func){
      var prev = cur;
      cur = prev[name] = {};
      func();
      cur = prev;
    },

    arg: function(name, desc, type, func){
      var prev = cur;
      cur = prev[name] = {
        description: desc,
        type: type
      };
      if(func) func();
      cur = prev;
    },

    example: function(func){
      if(!cur.examples) cur.examples = [];
      cur.examples.push(('' + func).replace(/^function\s*\(\)\s*\{\s*/, '').replace(/\s*\}$/, ''));
    }
  };
  ret.key = function(name, type, desc, func){
    ret.arg(name, desc, type, func);
  };

  return ret;

})(), exports);