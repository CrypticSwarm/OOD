var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

docgen(puts, (process.ARGV[2] || ['Request', 'Request.HTML']), '../generators/' + (process.ARGV[3] || 'json'));
