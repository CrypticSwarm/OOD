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
	var cur, toplevel, meta;
	var addArrayToMeta = function(key, func){
		return function(){
			if(!meta[key]) meta[key] = [];
			meta[key].push(func.apply(this, arguments));
			return meta[key];
		};
	};
	var resetCurWrap = function(func) {
		return function() {
			var prev = cur || this, 
				metaPrev = meta,
				ret = func.apply(this, arguments);
			cur = prev;
			meta = metaPrev;
			return ret;
		};
	};
	var first = function(){ return arguments[0]; };

	var ret = { 
		doc: function(what, desc, func){
			var prev = cur || this, ret;
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

		group: resetCurWrap(function(name, func){
			var ret;
			ret = cur = getFromPath(cur, name, true);
			func();
			return ret;
		}),

		arg: resetCurWrap(function(name, type, desc, defaults){
			var ret = cur = getFromPath(cur, name, true);
			meta = getFromPath(cur, 'meta', true);
			if(desc) meta.description = desc;
			if(type) meta.type = type;
			if(defaults instanceof Function) {
				cur = getFromPath(cur, 'defaults', true);
				defaults();
			}
			else if(defaults) cur.defaults = defaults;
			return ret;
		}),

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

		example: addArrayToMeta('example', function(func){
			return ('' + func).replace(/^function\s*\(\)\s*\{\s*/, '').replace(/\s*\}$/, '');
		}),

		returns: function(type, description) {
			meta.returns = { type: type, description: description };
		},

		exception: addArrayToMeta('exceptions', function(type, description){
			return {type: type, description: description};
		}),

		alias: addArrayToMeta('aliases', first),

		note: addArrayToMeta('notes', first),

		Any: function(){
			return Array.prototype.slice.call(arguments);
		},

	};
	ret.key = ret.arg;

	return ret;

})(), exports);
