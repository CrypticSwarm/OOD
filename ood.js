(function(){

var ood = {_gtree: {}};
ood.sandbox = function(){
	ood._tree = {};
	ood._ftree = {};
};
ood.sandbox();

ood._stack = [];

ood._stack.peek = function(){
	return ood._stack[ood._stack.length - 1];
};

ood._stack.seek = function(fn){
	var l = ood._stack.length, context = null;
	while (l--) if (fn(context = ood._stack[l])) break;
	return context;
};

ood._execute = function(fn, context){
	ood._stack.push(context);
	fn.call(context);
	ood._stack.pop();
};

ood._getFromPath = function(path, force) {
	var tokens = path === '...' ? [path] : path.split('.'),
		obj = this;
		return tokens.every(function(part){
			var isGood = true;
				if(typeof obj[part] != 'undefined') obj = obj[part];
				else if(force) obj = obj[part] = {};
				else isGood = false;
			return isGood;
	}) ? obj : null;
};

ood._inheritable = function(key, value) {
	if(value === null || value == ood.inherit) {
		//already being inherited or mixed
		if(typeof this[key] != 'undefined') return;
		ood._execute(function(){
			var path = [key];
			var parents = ood._stack.seek(function(context){
				if (context.inherits) return context;
				path.unshift(context.name);
			});
			parents = parents && parents.inherits || [];
			path = path.join('.');
			parents.some(function(parent){
				var parentTree = ood.get(parent);
				if(parentTree) value = ood._getFromPath.call(parentTree, path);
				return value;
			});
		}, this);
	}
	this[key] = value;
};

ood.Doc = function(name, description, opt_fn, destructive){
	this.name = name;
	ood._inheritable.call(this, 'description', description);
	if (opt_fn) ood._execute(opt_fn, this);
};

ood.Arg = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	ood._inheritable.call(this, 'description', description);
	this.value = opt_fn_or_value;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this)
	this.optional = (opt_fn_or_value == null || this.value == null);
};

ood._append = function(key, construct, context, args){
	var Obj = {};
	if(!context[key]) context[key] = [];
	ood._execute(function(){
		construct.apply(Obj, args);
		context[key].push(Obj);
		if(Obj.name) context[key][Obj.name] = Obj;
	}, {name: key});
	return Obj;
};

ood.Arg.append = function(context, args){
	return ood._append('arguments', ood.Arg, context, args);
};

ood.Return = function(type, description){
	this.type = type;
	this.description = description;
};

ood.Example = function(description, example){
	this.description = description;
	this.example = example;
};

ood.Example.append = function(context, args){
	return ood._append('examples', ood.Example, context, args);
};

ood.Key = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	this.description = description;
	this.value = opt_fn_or_value || null;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this)
};

ood.Key.append = function(context, args){
	return ood._append('keys', ood.Key, context, args);
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

ood.Exception.append = function(context, args){
	return ood._append('exceptions', ood.Exception, context, args);
};

ood.Alias = function(name){
	this.name = name;
};

ood.Alias.append = function(context, args){
	return ood._append('aliases', ood.Alias, context, args);
};

ood.Note = function(message){
	this.message = message;
};

ood.Note.append = function(context, args){
	return ood._append('notes', ood.Note, context, args);
};

ood.set = function(name, Doc){
	return ood._ftree[name] = ood._tree[name] = ood._gtree[name] = Doc;
};

ood.get = function(name){
	return ood._gtree[name] || null;
};

ood._get = function(name){
	return ood._tree[name] || null;
};

ood.doc = function(name, description, opt_fn, opt_destructive){
	var current = ood._stack.peek();
	var Doc;
	ood._execute(function(){
		Doc = new ood.Doc(name, description, opt_fn, opt_destructive);
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
	return ood.Arg.append(ood._stack.peek(), [name, type, description, opt_fn_or_value, opt_destructive]);
};

ood.returns = function(type, description){
	return ood._stack.peek().returns = new ood.Return(type, description);
};

ood.example = function(description, example){
	return ood.Example.append(ood._stack.peek(), [description, example]);
};

ood.key = function(name, type, description, opt_fn_or_value, opt_destructive){
	return ood.Key.append(ood._stack.peek(), [name, type, description, opt_fn_or_value, opt_destructive]);
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
//		from = from.map(ood._get);
	var current = ood._stack.peek();
	if (!current.inherits) current.inherits = [];
	Array.prototype.push.apply(current.inherits, from);
};

ood.exception = function(type, description){
	return ood.Exception.append(ood._stack.peek(), [type, description]);
};

ood.alias = function(name){
	return ood.Alias.append(ood._stack.peek(), [name]);
};

ood.note = function(message){
	return ood.Note.append(ood._stack.peek(), [message]);
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
