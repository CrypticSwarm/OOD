var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

docgen(puts, '../examples/' + (process.ARGV[2] || 'Request'), '../generators/' + (process.ARGV[3] || 'markdown'));
