var fs = require('fs');
var PEG = require('pegjs');
var assert = require('assert');

parser_text = fs.readFileSync('parser.peg', encoding="ascii");

console.log(parser_text);


var parse = PEG.buildParser(parser_text).parse;

assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("( a b c )"),["a","b","c"]);
