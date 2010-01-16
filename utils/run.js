var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

var example = process.ARGV[2] || 'Request';
var generator = process.ARGV[3] || 'markdown';

docgen(puts, '../examples/' + example, '../generators/' + generator);
