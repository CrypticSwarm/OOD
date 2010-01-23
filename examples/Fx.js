doc('Fx', 'The greatest animation class that ever existed.', function(){
	
	inherit([Chain, Event, Options]);
	
	var opts = doc('options', 'The Fx options.', function(){
		var body = function(){
			arg('item', Element, 'The element.', null);
		};
		key('onStart', Function, 'The callback function when the effect starts.', body, null);
		key('onCancel', Function, 'The callback function when the effect is cancelled', body, null);
		key('onComplete', Function, 'The callback function when the effect is complete.', body, null);
		key('duration', [Number, String], 'The duration as a whole number or an explict string.', function(){
			example('As a whole number in miliseconds.', function(){
				var fx = new Fx({
					duration: 1000 // 1 second
				});
			});
			example('As an explicit string.', function(){
				var fx = new Fx({
					duration: '60s' // 60 seconds, 1 minute
				});
			});
		}, '500ms');
		key('equation', String, 'The equation used as the step function to the effect.', function(){
			note('The equations are best explained graphically. See []() for examples.');
		});
		key('link', String, 'For successive calls to start an effect, how are the effects linked.', function(){
			doc('ignore', 'The call is ignored.');
			doc('cancel', 'The current effect is cancelled and the next effect continues.');
			doc('chain', 'Appends the new effect in a queue. As soon as the current effect is done, the next in line in the queue starts.');
		}, 'ignore');
	});
	
	group('protected', function(){
		
		doc('initialize', 'The Fx constructor.', function(){
			arg('options', Object, 'The Fx options.', opts, null);
		});
		
	});
	
	doc('start', 'Start the effect.', function(){
		arg('from', Number, 'The starting value.');
		arg('to', Number, 'The ending value.');
	});
	
	doc('cancel', 'Cancel, stop and reset, the effect.');
	
	doc('pause', 'Temporarily stop the effect.');
	
	doc('resume', 'Resume the effect from the last pause.');
	
	doc('complete', 'Complete the effect and end at the last value.');
	
	doc('step', 'Step to the next value.');
	
	group('protected', function(){	
		doc('getEquation', '...');
		
		// ...
	});
	
	key('setFPS', 'Set the Frames Per Seconds (FPS) of the all the effects.', function(){
		arg('value', Number, 'The FPS value.');
	});
	
	note('The FPS of all the effects is initially set at 60 frames per second.');
	
});