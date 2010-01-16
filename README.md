Intro
=====
This pad is a running sum of ideas on how to write an Object-Oriented based (reference) documentation. Hence forth called as OOD (wip).

We'll be basing design decisions from looking at other work as well as creating a functional design for MooTools 2.0 code.

Resources
=========
 * http://gist.github.com/271929 - Sample code input and output.
 * http://crypticswarm.com/jsdoctor.html - Class doc stub generator (works in FF)
 * http://etherpad.com/eTWXP8TWgq - This README's Etherpad

Requirements
=============
 * **Quick to write**
 * Flexible to change and source/mootools feature requirements
 * Easy to make new output formats
 * Extensible. Easy to add new types of input (Class, ART.Sheet, etc...)
 * Easy to express (decoupled) arguments in descriptions

Doc Specifications
==================
_What should be recorded so that docs can be understood by beginners, intermediate, advanced._

 * Public, private, protected methods
 * Class, inheritance, Mixins, overloading?
 * Argument type, required and optional, any number of args, argument signature (for functions or objects with expected keys)
 * Signature
 * Events supported
 * Throws
 * Nested arguments (Options)
 * Example(s)
 * Note(s) -- for deprecation or for tips, for example
 * Aliasing
 * Element setter/getters

OOD File Examples
=================

### [Class/Class.js](blob/master/examples/Class.js)
### [Request/Request.js](blob/master/examples/Request.js)

OOD Spec Examples
=================

### Regular (helper) Functions

**nil**

    doc('nil', 'Returns the {0} if not null, nil, or undefined.', function(){
       arg('item', Any, 'The object to test against being null.');
       returns([Any, null], 'The {0} or null');
       example('Returns null for undefined', function(){
           nil(undefined); // null
        });
        example('Returns the {0} if not null.', function(){
            nil('mootools rocks'); // 'mootools rocks'
        });
        // ... maybe other examples
    });

### Aliasing

**Object.forEach/each**

    doc('Object', '...', function(){
        // ...
        
        doc('forEach', '...', function(){
            arg('func', Function, 'The function to call on each item', function(){
                arg('value', Any, 'The value.');
                arg('key', String, 'The key.');
            });
            alias('each');
        });
    });

### Types

**Number**

    doc('Number', 'Extensions to the Number object types.', function(){
        note('See Also: [MDC Number](...)');
        note('Every Math method is mirrored in the Number object, both as prototype and generic.');
        
        key('random', Function, 'Return a random number between the {0} and {1}.', function(){
            arg('min', Number, 'Lower bound.');
            arg('max', Number, 'Upper bound.');
            returns(Number, 'The random number.');
            example('...');
        });
        
        // ...
        
        doc('limit', 'Constrain the number within a {0} and {1} limit.', function(){
            arg('min', Number, 'Lower bound.');
            arg('max', Number, 'Upper bound.');
            returns(Number, 'The same number or the {0} if the number is < than {0}, or the {1} if the number is > the {1}.');
            example('...');
        });
        
        // ...
        
        group('generated', function(){
            note('The following functions come from the Math::* equivalent. The arguments to the function is like the equivalent Math::* except the first argument is the number for non-generics.');
            
            example('', function(){
                (-1).abs(); // 1
                (0.5).ceil(); // 1
                Number.max(2, 3); // 3
            });
            
            ['abs', 'acos', 'asin', 'atan', ..., 'sqrt', 'tan'].each(function(op){
                doc(op, 'Applies the Math::' + op + 'method a this number.');
                key(op, Function, 'Same as the Math::' + op + ' function.');
            });
        });
    });

**Element**

    doc('Element', 'Super-duper Element type.', function(){
        arg('item', [String, Element], 'An CSS3 (see note) selector string to build an Element, or an HTML element.', null);
        arg('props', Object, 'A style/value object that the element should be set.', null);        
        
        note('...');
        
        doc('hasClass', 'If the element has the {0}.', function(){
            arg('className', String, 'The class name to test.');
            example(...);
        });
        
        // ...
    });

**Table**

    doc('Table', 'LUA-Style table implementation', function(){
        // inherits(Type); <-- a stretch?
        
        doc('set', 'Set a {1} to the {0}.', function(){
            arg('key', String, 'The key.');
            arg('value', Any, 'The value.');
        });
        
        // ...
    });

### class, class (instance) methods

**Options**

    doc('Options', 'The Options class.', function(){
    
        group('public', function(){ // <-- unnecessary, but valid
            doc('setOption', 'Set a specifc key/value in the options.', function(){
                arg('key', String, 'They option to set.');
                arg('value', Object, 'The value to set.');
                returns(this);
            });
    
            doc('setOptions', 'Set multiple key/value in the options.', function(){
                arg('options', Object, 'The key/value object to set.');
                note('Key/value pairs that are Event options are automatically bound to the class events.', function(){
                    var MyClass = new Class({
                        Implements: [Events, Options],
                        options: {
                            onEvent: function(){
                                alert('Event!');
                            }
                        },
                        initialize: function(options){
                             this.setOptions(options); 
                        }
                    });
                new MyClass().fireEvent('onEvent');
                });
                returns(this);
            });
        });
        
        // ...
        
        example('Typical usage', function(){
            var MyClass = new Class({
                
                Implements: Options,
                
                initialize: function(options){
                     this.setOptions(options);   
                }
            
            });
        });
    
    });

### Class Inheritance

**Request.HTML**

    doc('Request.HTML', 'Make a (ajax) request.', function(){
    
        inherits(Request);
    
    });

### Class instance variables

Example:

    var MyClass = new Class({
        
        options: {
            a: 1,
            b: true
        },
        
        'protected initialize': function(){},
        
        instance: 'variable',
        
        'private method': function(){}
        
    });

    doc('MyClass', 'A random class', function(){
        
        group('protected', function(){
            doc('initialize', 'MyClass constructor', function(){
                // ...
            });
        });
        
        doc('options', 'The class options.', function(){
            key('a', Number, 'A number.', 1);
            key('b', Boolean, 'A boolean.', true);
        });
        
        doc('instance', String, 'An instance variable', 'variable');
        
        group('private', function(){
            doc('method', 'MyClass method description.', function(){
                // ...
            });
        });
        
    });

### Class Options

_Option A_

    doc('Request', 'Make a (ajax) reques', function(){
        doc('someProp', 'asdfasdfasd', function(){
            key('name', String, 'the name', 'Mootools');
        });
        
        doc('options', 'Request options.', function(){
            key('update', Element, 'The element to update.', false);
            // ...
        });
    });
    
    doc('Other', 'Example', function(){
        doc('someProp', 'asdfasdfasd', function(){
            key('drink', String, 'the drink', 'Tea');
        });
    });

    doc('Request::HTML', 'Make a (ajax) request.', function(){
        
        inherits(Request);
        
        doc('someProp', Object, 'ADSEDA', function(){
            key('food', String, 'tasty food', 'Pizza');
        }, true);  //replaces sub object so docs { food: pizza } instead of {name: mootools, food: pizza};
        inherits(Other);
        //Order matters now {food: pizza, drink: tea}
        
        group('protected', function(){
            doc('initialize', 'Request.HTML constructor.', function(){
                arg('options', Object, 'The Request.HTML options.', function(){
                    key('update', Element, 'The element to update.', false);
                    // ...
                    key('filter', Function, 'A callback function to filter the elements', false);
                });
            });
        });
        
    });

_Option B_

    doc('Request::HTML', 'Make a (ajax) request.', function(){
        
        inherits(Request);
        
        var opts = doc('options', 'Request.HTML options.', function(){
             key('update', Element, 'The element to update.', false);
             // ...
             key('filter', Function, 'A callback function to filter the elements', false);
        });
        
        group('protected', function(){
            doc('initialize', 'Request.HTML constructor.', function(){
                arg('options', 'The request.HTML options.', opts);
            });
        });
        
    });

### (Class) Mixins

**Fx**

    doc('Fx', 'The greatest animation class that ever existed.', function(){
    
        inherits(Chain, Events, Options);
    
    });

### static method/variable in a class

**ART.Sheet**

    doc('ART::Sheet::defineStyle', 'Define a stylesheet-like style.', function(){
        arg('selectors', [String, Array], 'A single, or multiple, selector string(s).');
        arg('style', Object, 'The key/value map of the styles.');
        
        example('', function(){
            ART.Sheet.defineStyle('button', {
                    'font': 'moderna',
                    'font-size': 11,
                    // ...
                    'shadow-color': hsb(0, 0, 100, 0.6)
            });
        });
    });
    
**Make belief example**

    Bob.ate = 5; //donuts
    
    doc('Bob', 'Is a hungry guy', function(){
        key('ate', Number, 'The number of donuts Bob has eaten.');
    });
    
**[Keyboard.Extras](http://goo.gl/yViR)**

__Option A__

    doc('Keyboard', 'A keyboard interface.', function(){
        
        doc('initialize', 'Constructor', function(){
            // ...
        });
        
        // ....
        
        key('getActiveShortcuts', Function, 'Returns the active shortcuts.', function(){
            arg('keyboard', Keyboard, 'An optional active keyboard.', Keyboard.manager);
            returns(Array, 'A list of active shortcuts');
            example(...); 
        });
        
    });

__Options B__

    doc('Keyboard::getActiveShortcuts', 'Returns the active shortcuts.', function(){
        arg('keyboard', Keyboard, 'An optional active keyboard.', Keyboard.manager);
        returns(Array, 'A list of active shortcuts');
        example(...);
    });

### Options in a class

**Request**

    doc('Request', 'Make a (ajax) request.', function(){
        
        var opts = doc('options', Object, 'Description', function(){
            key('method', String, 'The HTTP method to use (GET, POST, DELETE, ...).');
            key('onRequest', Event, 'Fired when the request begins.');
            key('url', String, 'The url to request');
            // ...
            key('headers', Object, 'The HTTP headers sent to the backend.', function(){
                key('X-Requested-With', String, 'The HTTP X-Requested-With option used by the backend.');
            });
            // ...
        });
        
        group('public', function(){
            doc('initialize', 'The constructor', function(){
                arg('options', Object, 'Description', opts);
                
                // or cooler
                
                arg('options', Object, 'Description', this.options);
                // ...
            });
        });
     
    });

## Any number of arguments

**Function::stab**

    doc('Function::stab', 'For each function passed, return the results of the first non exception raising call.', function(){
        arg(Any, Function, 'Many function arguments to attempt to call.');
        
    });

## Events supported

**Fx**

    doc('Fx', '...', function(){
        
        group('events', function(){
            doc('onStart', 'Fired when the start method is called.');
            doc('onComplete', 'Fired when ...');
            // ...
        });
        
    });

## Throws

**Json::decode**

    doc('JSON', 'JSON encoder/decoder', function(){
        // ...
        
        key('decoder', Function, 'Decode a JSON string into a JavaScript object.', function(){
            arg('string', String, 'The JSON string.');
            arg('secure', Boolean, 'Whether the string should pass a security/sanity check.', function(){
                example(...);
            });
            exception(Error, 'Thrown if {1} and {0} is not secure, or if {@secure} and {0} is not secure.');
        });
        
    });

### Callback argument

**Element.addEvent**

    doc('Element', '...', function(){
        doc('addEvent', 'Add an event listener.', function(){
            arg('event', ...);
            arg('fn', Function, 'The callback function.', function(){
                arg('event', Event, 'A crossbrowser Event object.');
            });
        });
    });

### Overloading (Function.overloadPair)

    doc('Storage', '...', function(){
        doc('store', 'Store by key the value (or an object of key/value pairs) into the storage instance.', function(){
            arg('key', [String, Object], 'A single key or an object with key/value pairs to set to the storage.');
            arg('value', Any, 'The value to set.', null);
        });
    });

### Overloading (Function.overloadList)

    doc('Event', 'Transforms browser events in a cross-browser object.', function(){
        doc('get', 'Get a single or multiple event property values.', function(){
            arg('key', String, 'A single key to get the value from the Event.');
            arg(Any, String, 'Additional keys to get.', null);
        });
    });

### Element setter/getters
    // Element.js
    doc('Element', '...', function(){
        // ...
        doc('set', 'Element setter', function(){
            arg('property', [String, Object], 'A string key or object with key/value of properties to set.', function(){
                group('values', 'Values have specific purpose', function(){
                    doc('html', "Set the Element's HTML.");
                    dpc('text', "Set the Element's text.");
                });
                // ...
            });
            
            arg('value',  Any, 'The value to set.', null);
        });
        // ...
    });
    
    // Fx.js
    
    // ... in Fx.js ...

_Option A_

    doc('Element', null, function(){
        doc('set', null, function(){
             arg('{0}', null, null, function(){
                 group('values', null, function(){
                     doc('fx', 'Set the Fx instance.');
                 });
             });
        });
    });

_Option B_

    doc("Element.set('fx')", 'Set the Fx instance.');

OOD Method Signatures
====================

Template:

### arg
`Doc arg(name:String, type:(Type, Array<Type>), description:String, opt_fn:Function|opt_default_value:Mixed)`

### key
`Doc key(name:String, type:(Type,Array<Type>) description:String, opt_fn:Function|opt_default_value:Mixed)`

### doc
`Doc doc(name:String, description:String, opt_fn:Function, opt_overwrite:Boolean)`

### group
`Doc group(name:String, fn:Function)`

### inherits
`inherits(constructor:Type)`

### returns
`Doc returns(type:(Doc, Type), opt_description:String)`
// returns(this); <-- indicates that the method is using: `returns this;`

### Any
`Array<Type> Any(opt_var_Type)`

### alias
`alias(doc:String)`

### exception
`Doc exception(Type, description:String)`

### note
`note(message:String)`

### example
`Doc example(description:String, fn:Function)`
