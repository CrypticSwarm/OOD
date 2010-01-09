require('./getter').grabInto(['./docs', './textDisplay'], GLOBAL);

Event = function(){};

doc('Request', 'Make a (ajax) request.', function(){
	group('public', function(){
		doc('initialize', 'The constructor', function(){
			arg('options', 'Description', Object, function(){
				key('method', 'The HTTP method to use (GET, POST, DELETE, ...).', String);
				key('onRequest', 'Fired when the request begins.', Function);
				key('url', 'The url to request', String);
				key('headers', 'The HTTP headers sent to the backend.', Object, function(){
					key('X-Requested-With', 'The HTTP X-Requested-With option used by the backend.', String);
				});
			});
		});
	});
	example(function(){
		var myHTMLRequest = new Request.HTML([options]);
	});
});

doc('Request.HTML', 'Send things to other things', function(){
	inherits('Request');
	group('public', function(){
		doc('initialize', null, function(){
			arg('options', null, Object, function(){
				key('newOpt', 'This is a new option', String);
			});
		});
		doc('send', 'send the request.', function(){
			arg('options', 'Description', Object, function(){
				key('method', 'The HTTP method to use (GET, POST, DELETE, ...).', String);
			});
		});
	});
});

textDisplay(Request);
