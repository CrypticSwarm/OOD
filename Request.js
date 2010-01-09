require('./getter').grabInto(['./docs', './textDisplay'], GLOBAL);

doc('Request', 'Make a (ajax) request.', function(){
	group('public', function(){
		doc('initialize', 'The constructor', function(){
			arg('options', Object, 'Description', function(){
				key('method', String, 'The HTTP method to use (GET, POST, DELETE, ...).');
				key('onRequest', Function, 'Fired when the request begins.');
				key('url', String, 'The url to request');
				key('headers', Object, 'The HTTP headers sent to the backend.', function(){
					key('X-Requested-With', String, 'The HTTP X-Requested-With option used by the backend.');
				});
			});
		});
	});
	example(function(){
		var myRequest = new Request([options]);
	});
});

doc('Request.HTML', 'Send things to other things', function(){
	inherits('Request');
	group('public', function(){
		doc('initialize', null, function(){
			arg('options', Object, null, function(){
				key('newOpt', String, 'This is a new option', 'VALUE');
			});
			returns('Request.HTML', 'A new Request.HTML instance');
			exception('Error', 'description');
			alias('constructor');
			note('blah blah blah blah blah blah');
		});
		doc('send', 'send the request.', function(){
			arg('options', Object, 'Description', function(){
				key('method', String, 'The HTTP method to use (GET, POST, DELETE, ...).');
			});
		});
	});
});

textDisplay(Request);
