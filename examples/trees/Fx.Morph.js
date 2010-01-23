
// ----- Fx.Morph ------

Fx.Morph.__doc__ = {

	name: 'Fx::Morph',
	
	description: 'Morph Element styles.',
	
	inherits: [Fx],
	
	groups: {
	
		protected: {
		
			docs: {
				initialize: (Fx.Morph.prototype.options.__doc__ = {
					
					name: 'initialize',
					
					description: 'Fx.Morph constructor.',
					
					arguments: [{
						name: 'element',
						type: Element,
						description: 'The element to morph.'
					}, {
						name: 'options',
						type: Object,
						description, 'The Fx.Morph options.',
						optional: true
					}]
					
				})
			}
		
		}
	
	},
	
	docs: {
		start: (Fx.Morph.prototype.start.__doc__ = {
			
			name: 'start',
			
			description: 'Start the Element morph effect.',
			
			arguments: [{
				name: 'style',
				type: [String, Object],
				description: 'The style or object with style ...'
			}, {
				name: 'to',
				type: [String, Number, Array],
				description: 'The value to (string ...).'
			}]
			
		}),
		
		toElement: (Fx.Morph.prototype.start.__doc__ = {
			
			name: 'toElement',
			
			returns: {
				type: Element,
				description: 'The element being morphed.'
			}
			
		})
	}

};



Element.prototype.set.__doc__.arguments[0].body.keys.fx = {
	name: 'fx',
	type: Object,
	description: 'Update the Element Fx.Morph options.'
};

Element.prototype.get.__doc__.arguments[0].body.keys.fx = {
	name: 'fx',
	returns: {
		type: Fx.Morph,
		description: 'The element being morphed.'
	}
};

Element.prototype.morph.__doc__ = {
	name: 'Element.morph',
	description: 'Morph the element.',
	arguments: [{
		name: 'styles',
		type: Object,
		description: 'An object with style and to/from value pairing.'
	}],
	returns: {
		type: Element,
		description: 'The Element instance.'
	}
};

Element.prototype.tween.__doc__ = {
	name: 'Element.tween',
	description: 'Create transition an Element ...',
	arguments: [{
		name: 'style',
		type: String,
		description: 'The Element style to tween.'
	}, {
		name: 'from',
		type: [String, Number],
		description: 'The from (or to, if to is not included) value.'
	}, {
		name: 'to',
		type: [String, Number],
		description: 'The to value.',
		optional: true
	}]
};





