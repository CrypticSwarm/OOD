(function(){
	
var ood = {_tree: {}, _stack: []};

ood._stack.peek = function(){
	return ood._stack[ood._stack.length - 1];
};

ood._execute = function(fn, context){
	ood._stack.push(context);
	fn.call(context);
	ood._stack.pop();
};

ood.Doc = function(name, description, opt_fn, destructive){
	this.name = name;
	this.description = description;
	if (opt_fn) ood._execute(opt_fn, this);
};

ood.Arg = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	this.description = description;
	this.value = opt_fn_or_value;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this)
	this.optional = (opt_fn_or_value == null || this.value == null);
};

ood.Arg.append = function(context, Arg){
	if (!context.arguments) context.arguments = [];
	context.arguments.push(Arg);
	return Arg;
};

ood.Return = function(type, description){
	this.type = type;
	this.description = description;
};

ood.Example = function(description, example){
	this.description = description;
	this.example = example;
};

ood.Example.append = function(context, Example){
	if (!context.examples) context.examples = [];
	context.examples.push(Example);
	return Example;
};

ood.Key = function(name, type, description, opt_fn_or_value){
	this.name = name;
	this.type = type;
	this.description = description;
	this.value = opt_fn_or_value || null;
	if (typeof opt_fn_or_value == 'function') this.value = ood._execute(opt_fn_or_value, this)
};

ood.Key.append = function(context, Key){
	if (!context.keys) context.keys = [];
	context.keys.push(Key);
	return Key;
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

ood.Exception.append = function(context, Exception){
	if (!context.exceptions) context.exceptions = [];
	context.exceptions.push(Exception);
	return Exception;
};

ood.Alias = function(name){
	this.name = name;
};

ood.Alias.append = function(context, Alias){
	if (!context.aliases) context.aliases = [];
	context.aliases.push(Alias);
	return Alias;
};

ood.Note = function(message){
	this.message = message;
};

ood.Note.append = function(context, Note){
	if (!context.notes) context.notes = [];
	context.notes.push(Note);
	return Node;
};

ood.set = function(name, Doc){
	return ood._tree[name] = Doc;
};

ood.get = function(name){
	return ood._tree[name] || null;
};

ood.doc = function(name, description, opt_fn, opt_destructive){
	var current = ood._stack.peek();
	var Doc = new ood.Doc(name, description, opt_fn, opt_destructive);
	if (!current) {
		ood.set(name, Doc);
	} else {
		if (!current.docs) current.docs = {};
		current.docs[name] = Doc;
	}
	return Doc;
};

ood.arg = function(name, type, description, opt_fn_or_value, opt_destructive){
	return ood.Arg.append(ood._stack.peek(), new ood.Arg(name, type, description, opt_fn_or_value, opt_destructive));
};

ood.returns = function(type, description){
	return ood._stack.peek().returns = new ood.Return(type, description);
};

ood.example = function(description, example){
	return ood.Example.append(ood._stack.peek(), new ood.Example(description, example));
};

ood.key = function(name, type, description, opt_fn_or_value, opt_destructive){
	return ood.Key.append(ood._stack.peek(), new ood.Key(name, type, description, opt_fn_or_value, opt_destructive));
};

ood.group = function(name, context){
	var current = ood._stack.peek();
	if (!current.groups) current.groups = {};
	current.groups[name] = new ood.Group(name, context);
};

// TODO(ibolmo): Remove inherits.
ood.inherits = ood.inherit = function(from){
	if (!from) {
		
	} else {
		if (typeof from != 'array') from = [from];
		from = from.map(ood.get);
		var current = ood._stack.peek();
		if (!current.inherits) current.inherits = [];
		current.inherits.push.apply(current.inherits, from);
	}
};

ood.exception = function(type, description){
	return ood.Exception.append(ood._stack.peek(), new ood.Exception(type, description));
};

ood.alias = function(name){
	return ood.Alias.append(ood._stack.peek(), new ood.Alias(name));
};

ood.note = function(message){
	return ood.Note.append(ood._stack.peek(), new ood.Note(message));
};

ood.getTree = function(){
	return ood._tree;
};

var oodoc = {};
for (var prop in ood) if (/^(Any|[a-z])/.test(prop)) oodoc[prop] = ood[prop];

require('./utils/getter').copy(oodoc, exports);

})();

