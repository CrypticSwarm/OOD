var getFromPath = function(obj, path, force) {
	var tokens = path.split('.');
	return tokens.every(function(part){
		var isGood = true;
		if(obj[part]) obj = obj[part];
		else if(force) obj = obj[part] = {};
		else isGood = false;
		return isGood;
	}) ? obj : null;
};

require('./getter').copy((function(){
	var cur;
	var ret = { 
		doc: function(what, desc, func){
			var prev = cur || this;
			cur = getFromPath(prev, what, true);
			//don't hijack the variable if it is top level and already exists
			if(prev === this) {
				if(!cur.__doc__) cur.__doc__ = {};
				cur = cur.__doc__;
			}
			cur.description = desc;
			func();
			cur = prev;
		},

		group: function(name, func){
			var prev = cur;
			cur = getFromPath(prev, name, true);
			func();
			cur = prev;
		},

		arg: function(name, desc, type, func){
			var prev = cur;
			cur = getFromPath(prev, name, true);
			cur.description = desc;
			cur.type = type;
			if(func) func();
			cur = prev;
		},

		example: function(func){
			if(!cur.examples) cur.examples = [];
			cur.examples.push(('' + func).replace(/^function\s*\(\)\s*\{\s*/, '').replace(/\s*\}$/, ''));
		}
	};
	ret.key = ret.arg;

	return ret;

})(), exports);
