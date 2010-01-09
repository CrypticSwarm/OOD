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
	var cur, toplevel;
	var ret = { 
		doc: function(what, desc, func){
			var prev = cur || this;
			if(prev === this) what += '.__doc__';
			cur = getFromPath(prev, what, true);
			if(prev === this) toplevel = cur;
			if(desc) cur.description = desc;
			func();
			if(prev === this) toplevel = null;
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
			if(desc) cur.description = desc;
			if(type) cur.type = type;
			if(func) func();
			cur = prev;
		},

		example: function(func){
			if(!cur.examples) cur.examples = [];
			cur.examples.push(('' + func).replace(/^function\s*\(\)\s*\{\s*/, '').replace(/\s*\}$/, ''));
		},

		inherits: function(paths) {
			paths = paths instanceof Array ? paths : [paths];
			paths.forEach(function(path){
				path += '.__doc__';
				var mixin = getFromPath(this, path, true);
				var copier = function(to, from){
					for(var p in from) {
						if(typeof from[p] == 'object') copier(getFromPath(to, p, true), from[p]);
						else to[p] = from[p];
					}
				};
				copier(toplevel, mixin);
			});
		}
	};
	ret.key = ret.arg;

	return ret;

})(), exports);
