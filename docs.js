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
			var prev = cur || this, adjust = prev, noDoc = false;
			//don't hijack the variable if it is top level and already exists
			adjust = (prev === this && getFromPath(prev, what)) || (noDoc = true && getFromPath(prev, what, true));
			if(noDoc) {
				adjust.description = desc;
				cur = adjust;
			}
			else cur = adjust.__doc__ = {description: desc };
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
