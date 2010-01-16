doc('doc', 'Function to help ease documentation. Used to document functions.', function(){
	arg('name', String, 'The name of the what you are documenting');
	arg('description', String, 'A brief description of what is being documented');
	arg('func', Function, 'Function to be called that will generate the inner scope');
	arg('destructive', Boolean, 'Whether it should clobber any existing subobjects');
	returns(Object, 'The doc object that was generated.');
});

doc('arg', 'Used to add arguments nested inside a doc function', function(){
	arg('name', String, 'The name of the what you are documenting');
	arg('type', [String, Function], 'The arguments type');
	arg('description', String, 'A brief description of what is being documented');
	arg('func', Function, 'Function to be called that will generate the inner scope');
	arg('destructive', Boolean, 'Whether it should clobber any existing subobjects');
	returns(Object, 'The doc object that was generated.');
});

doc('key', 'Used to add key:value pairs for a subobject, or available values for an object', function(){
	inherits('arg');
});

doc('group', 'Groups entries into logical sections.', function(){
	arg('name', String, 'The name of the group.');
});

doc('inherits', 'Denotes that currently documented object inherits from another. If available will merge in parents documentation.', function(){
	arg('parent', [String, Object], ' Either a path to an object, or an object. ', function(){
		note('Tend to use the String representation so that the object is required to be present when generating documentation.  This allows the ability to leave out the parents documentation, and generate only new or overriden items.');
	});
});


doc('Any', 'A semantic helper.  It is used in situations as the name of an arg where the function can take *Any* number of additional args. Or when the type of an arg can be *Any* type.', function() {

});

doc('alias', 'Defines an aliased name for what is currently being documented.', function(){
	arg('aliasedName', 'The name that the currently documented function is aliased as.');
	example('forEach aliased as each', function(){
		doc('forEach', 'Iterates through an array calling the function on each iteration and passing the current item, index, and array to the function', function(){
			//The rest of the documentation.
			alias('each');
		});
	});

});

[	{ name: 'returns', desc: 'the return value of the function'},
	{ name: 'exception', desc: 'the exception the function could throw'}].forEach(function(item) {

	doc(item.name, item.desc, function(){
		arg('type', [String, Function], 'The string representation or the constructor function that ', item.desc + ' is an instanceof.');
		arg('description', String, 'The description of ' + item.desc, '');
	});

});

doc('note', 'Adds on things to take note of in the current documentation context.', function(){
	arg('message', String, 'The message that is being noted.');
});

doc('example', 'Adds on examples into the current documentation context.', function(){
	arg('description', String, 'A brief description about the example.');
	arg('example', Function, 'The function with all the example code inside.');
	note('The code inside the example arg function will not be executed.');
});
