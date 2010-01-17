doc('Fx::Morph', 'Morph Element styles.', function(){
	
	inherit(Fx);
	
	group('protected', function(){
		
		doc('initialize', 'Fx.Morph constructor.', function(){
			arg('element', Element, 'The element to morph.');
			arg('options', Object, 'The Fx.Morph options.', function(){
				inherit();
			}, null);
		});
		
	});
	
	doc('start', 'Start the Element morph effect.', function(){
		arg('style', [String, Object], 'The style or object with style and to value pair.');
		arg('to', [String, Number, Array], 'The to value (string or a number), or an Array with the first item as the from and the second item as the to value.', null);
		// ...
	});
	
	doc('toElement', function(){
		returns(Element, 'The element being morphed.');
	});
	
});

doc('Element.set', null, function(){
	arg('{0}', null, function(){
		key('fx', Object, 'Update the Element Fx.Morph options.');
	});
});

doc('Element.get', null, function(){
	arg('{0}', null, function(){
		key('fx', null, null, function(){
			returns(Fx.Morph, 'The Fx.Morph instance.');
		});
	});
});

doc('Element.morph', 'Morph the element.', function(){
	arg('styles', Object, 'An object with style and to/from value pairing.');
	returns(this);
});

doc('Element.tween', 'Create transition an Element style between the {1} and to {0}.', function(){
	arg('style', String, 'The Element style to tween.');
	arg('from', [String, Number], 'The {1} (or {2}, if {2} is not included) value.');
	arg('to', [String, Number], 'The {2} value.', null);
});
