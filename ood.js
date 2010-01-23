(function(){

var ood = {_gtree: {}};

ood.sandbox = new function(){
	ood._tree = {};
	ood._ftree = {};
};

ood._stack = [];

ood._stack.peek = function(){
	return ood._stack[ood._stack.length - 1];
};

ood._stack.seek = function(fn){
	var l = ood._stack.length, context = null;
	while (l--) if (fn(context = ood._stack[l])) break;
	return context;
};

ood._append = function(key, ctor, context, args){
	var Doc = {};
	if (!context[key]) context[key] = [];
	ood._execute(function(){
		ctor.apply(Doc, args);
		context[key].push(Doc);
		if (Doc.name) context[key][Doc.name] = Doc;
	}, {name: key});
	return Doc;
};

ood._execute = function(fn, context){
	ood._stack.push(context);
	fn.call(context);
	ood._stack.pop();
};

ood._getFromPath = function(root, path, force) {
	var context = root, paths = ((path === '...') ? [path] : path.split('.'));
	return paths.every(function(path){
		if (force && !(path in context)) context[path] = {};
		return context = context[path];
	}) && context || null;
};

ood._merge = function(Doc, key, value) {
	if (value == ood.inherit) value = null;
	if (value == null) {
		//already being inherited or mixed
		if (typeof Doc[key] != 'undefined') return;
		var path = [Doc.name, key];
		var parents = ood._stack.seek(function(context){
			if (context.inherits) return context;
			path.unshift(context.name);
		});
		parents = parents && parents.inherits || [];
		path = path.join('.');
		parents.some(function(parent){
			if (parent = ood.get(parent)) return value = ood._getFromPath(parent, path);
		});
	}
	Doc[key] = value;
};

ood.Doc = function(name, description, opt_fn, destructive){
	this.name = name;
	ood._merge(this, 'description', description);
	if (opt_fn) ood._execute(opt_fn, this);
	return this;
};

ood.Arg = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	ood._merge(this, 'description', description);
	this.value = opt_fn_or_value;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this);
	this.optional = (opt_fn_or_value == null || this.value == null);
};

ood.Return = function(type, description){
	this.type = type;
	this.description = description;
};

ood.Example = function(description, example){
	this.description = description;
	this.example = example;
};

ood.Key = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	ood._merge(this, 'description', description);
	this.value = opt_fn_or_value || null;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this)
};

ood.Group = function(name, context){
	this.name = name;
	this.context = context;
	ood._execute(context, this);
};

ood.Any = function(){
	return Array.prototype.slice.call(arguments);
};

ood.Exception = function(type, description){
	this.type = type;
	this.description = description;
};

ood.Alias = function(name){
	this.name = name;
};

ood.Note = function(message){
	this.message = message;
};

ood.set = function(name, Doc){
	return ood._ftree[name] = ood._tree[name] = ood._gtree[name] = Doc;
};

ood.get = function(name){
	return ood._gtree[name] || null;
};

ood.doc = function(name, description, opt_fn, opt_destructive){
	var Doc;
	var current = ood._stack.peek();
	var args = arguments;
	ood._execute(function(){
		Doc = !current && ood.get(name) ? ood.Doc.apply(ood.get(name), args) : new ood.Doc(name, description, opt_fn, opt_destructive);
	}, {name: 'docs'});
	if (!current) {
		ood.set(name, Doc);
	} else {
		if (!current.docs) current.docs = {};
		current.docs[name] = Doc;
	}
	return Doc;
};

ood.arg = function(name, type, description, opt_fn_or_value, opt_destructive){
	return ood._append('arguments', ood.Arg, ood._stack.peek(), arguments);
};

ood.returns = function(type, description){
	return ood._stack.peek().returns = new ood.Return(type, description);
};

ood.example = function(description, example){
	return ood._append('examples', ood.Example, ood._stack.peek(), arguments);
};

ood.key = function(name, type, description, opt_fn_or_value, opt_destructive){
	return ood._append('keys', ood.Key, ood._stack.peek(), arguments);
};

ood.group = function(name, context){
	var current = ood._stack.peek();
	if (!current.groups) current.groups = {};
	ood._execute(function(){
		current.groups[name] = new ood.Group(name, context);
	}, { name: 'groups'});
};

// TODO(ibolmo): Remove inherits.
ood.inherits = ood.inherit = function(from){
	if (!(from instanceof Array)) from = [from];
	var current = ood._stack.peek();
	if (!current.inherits) current.inherits = [];
	Array.prototype.push.apply(current.inherits, from);
};

ood.exception = function(type, description){
	return ood._append('exceptions', ood.Exception, ood._stack.peek(), arguments);
};

ood.alias = function(name){
	return ood._append('aliases', ood.Alias, ood._stack.peek(), [name]);
};

ood.note = function(message){
	return ood._append('notes', ood.Note, ood._stack.peek(), [message]);
};

ood.getTree = function(){
	return ood._tree;
};

ood.popTree = function(){
	var fileTree = ood._ftree;
	ood._ftree = {};
	return fileTree;
};

var oodoc = {};
for (var prop in ood) if (/^(Any|[a-z])/.test(prop)) oodoc[prop] = ood[prop];

require('./utils/getter').copy(oodoc, exports);

})();
