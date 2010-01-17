Class.__doc__ = {
	
	name: 'Class',
	
	description: 'The base Class of ...',

	arguments: [{
		name: 'params',
		type: [Function, Object],
		description: 'The function..',
		body: {
			keys: [{
				name: 'Extends',
				type: Class,
				description: 'The parent ..'
			}, {
				name: 'Implements',
				type: [Array, Object, Class],
				description: 'Implements ..'
			}, {
				name: 'protected ...',
				type: Function,
				description: 'Any property ...',
				examples: [{
					description: '...',
					example: function(){
					
					}
				}]
			}, {
				name: 'linked ...',
				type: Function,
				description: 'Any property ...',
				examples: [{
					description: '...',
					example: function(){
						
					}
				}]
			}]
		}
	}],
	
	returns: {
		type: Class,
		description: 'The type of class.'
	}
	
	docs: {
		implement: (Class.prototype.implement.__doc__ = {
			
			notes: [{
				description: 'The same as creating a ...'
			}],
			
			arguments: [{
				name: 'properties',
				type: [Object],
				description: 'The properties ...'
			}],
			
			examples: [{
				description: 'Include method into the class',
				example: function(){
				// ...
				}
			}]
			
		})
	},
	
	examples: [{
		description: 'Class',
		example: function(){
			// ...
		}
	}, {
		description: 'Extends',
		example: function(){
			// ...
		}
	}, {
		description: 'Implements',
		example: function(){
			// ...
		}
	}],
	
	notes: []

}
