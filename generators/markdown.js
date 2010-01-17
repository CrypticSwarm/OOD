exports.output = function(obj) {
	var mainHeader = '===============================',
		subHeader = '----------------------------',
		name = obj.name, 
		returnString = '';

	var nth = function(n) { 
		return function(){ 
			return arguments[n]; }; };
	var first = nth(0);
	var link = function() { return '[' + arguments[0] + '][]'; };

	var header = function(key, obj){
		returnString += 'Class: ' + key + ' {#' + key + '}\n';
		returnString += mainHeader + '\n';
		if (!obj.meta) return;
		if (obj.meta.description) returnString += '\n' + obj.meta.description + '\n';
		if (obj.meta.parent) list('### Extends', obj.meta.parent, link, '* '); 
		if (obj.meta.examples) list('### Syntax', obj.meta.examples, first, '\t');
		body(obj.body);
	};

	var body = function(obj){
		for (var key in obj) {
			if (typeof obj[key] == 'object') {
				if (!obj[key].body && !obj[key].defaults) group(key, obj[key]);
			}
		}
	};

	var group = function(key, obj){
		var methods = [];
		for (var p in obj) {
			if (typeof obj[p] == 'object') {
				if (obj[p].body) methods.push({ key: p, obj: obj[p] });
			}
		}
		list('### ' + key, methods, method, '');
	};

	var collect = function(key, obj) {
		var collection = [];
		for (var p in obj) {
      if (typeof obj[p] == 'object') {
        if (obj[p][key]) collection.push({ key: p, obj: obj[p] });
      }
    }
		return collection;
	};

	var method = function(keyobj){
		var key = keyobj.key, obj = keyobj.obj, args = collect('meta', obj.body);
		returnString += name + ' Method: ' + key + ' {#' + name + ':' + key + '}\n';
		returnString += subHeader + '\n';
		if (obj.meta.description) returnString += '\n' + obj.meta.description + '\n\n';
		if (obj.meta.examples) list('### Syntax', obj.meta.examples, first, '\t');
		if (args.length > 0) list('### Arguments', args, function(o){ 
			var req = o.obj.defaults ? 'optional' : 'required';
			return o.key + ' - ' + typeAndDescription(o.obj.meta, req); 
		}, '* ');
		if (obj.meta.exceptions) list('### Exceptions', obj.meta.exceptions, typeAndDescription, '* ');
		if (obj.meta.returns) list('### Returns', [obj.meta.returns], typeAndDescription, '* ');
		return '';
	};

	var list = function(heading, list, displayfunc, prefix) {
		returnString += heading + '\n\n';
		list.forEach(function(item, num){
			var disp = displayfunc(item);
			returnString += ( prefix == null ? num + 1 : prefix) + disp + '\n';
		});
		returnString += '\n';
	};

	var typeAndDescription = function(obj, opt) {
		var type = obj.type;
		if (type instanceof Function) ('' + type).replace(/function\s*(.*)\s*\(/, function(){ type = arguments[1] });
		if (opt) type += ' (' + opt + ')';
		return '(*' + type + '*) ' + obj.description;
	};

	header(obj.name, obj.doc);
	return returnString;
};
