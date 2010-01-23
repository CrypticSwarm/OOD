doc('Request::HTML', 'Send things to other things', function(){
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
		doc('stab', 'Returns the value of first non throwing function.', function(){
			arg(Any, Function, 'Any number of Functions to call');
			returns(Any, 'The value of the first non throwing function.');
		});
		doc('send', 'send the request.', function(){
			arg('options', Object, 'Description', function(){
				key('method', String, 'The HTTP method to use (GET, POST, DELETE, ...).');
			});
		});
	});
});
