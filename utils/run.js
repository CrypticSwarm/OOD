var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

var example = process.ARGV[1] || 'Request';
var generator = process.ARGV[2] || 'markdown';

docgen(puts, '../examples/' + example, '../generators/' + generator);
