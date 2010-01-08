require('./getter').grabInto(['./docs', './textDisplay'], GLOBAL);

Event = function(){};

doc('Request', 'Make a (ajax) request.', function(){
    group('public', function(){
        doc('initialize', 'The constructor', function(){
            arg('options', 'Description', Object, function(){
                key('method', String, 'The HTTP method to use (GET, POST, DELETE, ...).');
                key('onRequest', Event, 'Fired when the request begins.');
                key('url', String, 'The url to request');
                key('headers', Object, 'The HTTP headers sent to the backend.', function(){
                    key('X-Requested-With', String, 'The HTTP X-Requested-With option used by the backend.');
                });
            });
        });
        example(function(){
            var myHTMLRequest = new Request.HTML([options]);
        });
    });
});

textDisplay(Request);