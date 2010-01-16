doc('Class', 'The base Class of the MooTools framework.', function(){
	
    arg('params', [Function, Object], 'The function constructor or an object with properties that apply to the class.', function(){
        key('Extends', Class, 'The parent class for this subclass.');
        key('Implements', [Array, Object, Class], 'Implements is similar to Extends, except that it adopts properties from one or more other classes without inheritance. Useful when implementing a default set of properties in multiple Classes. The Implements property should come after Extends but before all other properties.');
        key('protected ...', Function, 'Any property that starts with protected keyword will prevent access from outside of the class or subclasses.', function(){
            example('...', function(){});
        });
        key('linked ...', Function, 'Any property that starts with linked keyword will be copied into the property with no other changes.', function(){
            example('...'. function(){});
        });
    });

    returns(Class, 'The created class.');
    
    doc('implement', 'Implements the passed in properties into the base Class prototypes, altering the base Class.', function(){
        note('The same as creating a new Class with the Implements property, but handy when you need to modify existing classes.');
        arg('properties', Object, 'The properties to add to the base Class.');
        example('Include method into the class.', function(){
            var Animal = new Class({
                initialize: function(age){
                    this.age = age;
                }
            });
            Animal.implement({
                setName: function(name){
                    this.name = name;
                }
            });
            var myAnimal = new Animal(20);
            myAnimal.setName('Micia');
            alert(myAnimal.name); //alerts 'Micia'
        });
    });
    
    example('Class', function(){
        var Cat = new Class({
            initialize: function(name){
            this.name = name;
        }});
        
        var myCat = new Cat('Micia');
        alert(myCat.name); //alerts 'Micia'
        
         var Cow = new Class({
            initialize: function(){
                alert('moooo');
            }});
        });
    });

    example('Extends', function(){
        var Animal = new Class({
            initialize: function(age){
            this.age = age;
        }});
        
        var Cat = new Class({
            Extends: Animal,
                initialize: function(name, age){
                    this.parent(age); //will call initalize of Animal
                    this.name = name;
        }});
        
        var myCat = new Cat('Micia', 20);
        alert(myCat.name); //Alerts 'Micia'.alert(myCat.age); //Alerts 20.
    });

    example('Implements', function(){
        var Animal = new Class({
            initialize: function(age){
            this.age = age;
        }});
        
        var Cat = new Class({
            Implements: Animal,
            setName: function(name){
            this.name = name
        }});
        
        var myAnimal = new Cat(20);
        myAnimal.setName('Micia');
        alert(myAnimal.name); //Alerts 'Micia'.
    });
});