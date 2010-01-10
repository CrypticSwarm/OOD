exports.output = function(out, obj) {
	var mainHeader = '===============================',
		subHeader = '----------------------------',
		name = obj.name;

	var nth = function(n) { 
		return function(){ 
			return arguments[n]; }; };
	var first = nth(0);
	var link = function() { return '[' + arguments[0] + '][]'; };

	var header = function(key, obj){
		out('Class: ' + key + ' {#' + key + '}');
		out(mainHeader);
		if (!obj.meta) return;
		if (obj.meta.description) out('\n' + obj.meta.description + '\n');
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

	var method = function(keyobj){
		var key = keyobj.key, obj = keyobj.obj;
		out(name + ' Method: ' + key + ' {#' + name + ':' + key + '}');
		out(subHeader);
		if (obj.meta.description) out('\n' + obj.meta.description + '\n');
		if (obj.meta.examples) list('### Syntax', obj.meta.examples, first, '\t');
		if (obj.meta.exceptions) list('### Exceptions', obj.meta.exceptions, typeAndDescription, '* ');
		if (obj.meta.returns) list('### Returns', [obj.meta.returns], typeAndDescription, '* ');
		return '';
	};

	var list = function(heading, list, displayfunc, prefix) {
		out(heading + '\n');
		list.forEach(function(item, num){
			out(( prefix == null ? num + 1 : prefix) + displayfunc(item));
		});
		out('');
	};

	var typeAndDescription = function(obj, opt) {
		var type = obj.type;
		if (type instanceof Function) type.replace(/function\s(.*)\s\(/, function(){ type = arguments[0] });
		if (opt) type += ' (' + opt + ')';
		return '(*' + type + '*) ' + obj.description;
	};

	header(obj.name, obj.doc);
};
