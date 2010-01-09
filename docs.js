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
			var prev = cur || this, ret, meta;
			if(prev === this) what += '.__doc__';
			ret = getFromPath(prev, what, true);
			meta = getFromPath(ret, 'meta', true);
			cur = getFromPath(ret, 'body', true);
			if(prev === this) toplevel = ret;
			if(desc) meta.description = desc;
			func();
			if(prev === this) toplevel = null;
			cur = prev;
			return ret;
		},

		group: function(name, func){
			var prev = cur, ret;
			ret = cur = getFromPath(prev, name, true);
			func();
			cur = prev;
			return ret;
		},

		arg: function(name, desc, type, defaults){
			var prev = cur, ret, meta;
			ret = cur = getFromPath(prev, name, true);
			meta = getFromPath(cur, 'meta', true);
			if(desc) meta.description = desc;
			if(type) meta.type = type;
			if(defaults instanceof Function) {
				cur = getFromPath(cur, 'defaults', true);
				defaults();
			}
			else if(defaults) cur.defaults = defaults;
			cur = prev;
			return ret;
		},

		example: function(func){
			var meta = getFromPath(cur, 'meta', true);
			if(!meta.examples) meta.examples = [];
			meta.examples.push(('' + func).replace(/^function\s*\(\)\s*\{\s*/, '').replace(/\s*\}$/, ''));
			return meta.examples;
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
			return toplevel;
		},

		returns: function(type, description) {
			var meta = getFromPath(cur, 'meta', true);
			meta.returns = { type: type, description: description };
		},

		Any: function(){
			return Array.prototype.slice.call(arguments);
		},

		exception: function(type, description){
			var meta = getFromPath(cur, 'meta', true);
			if(!meta.exceptions) meta.exceptions = [];
			meta.exceptions.push({type: type, description: description});
			return meta.exceptions;
		},

		alias: function(name) {
			var meta = getFromPath(cur, 'meta', true);
			if(!meta.aliases) meta.aliases = [];
			meta.aliases.push(name);
			return meta.exceptions;

		}

	};
	ret.key = ret.arg;
	ret.doc.alias = function(to, from){

	};

	return ret;

})(), exports);
