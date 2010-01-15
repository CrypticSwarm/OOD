var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

docgen(puts, '../examples/Request', '../generators/markdown');
