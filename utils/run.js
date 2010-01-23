var docgen = require('./DocumentGen').generateDocs;
var puts = require('sys').puts;

docgen(puts, (process.ARGV[2] && process.ARGV[2].split(',') || ['Request', 'Request.HTML']), '../generators/' + (process.ARGV[3] || 'json'));
