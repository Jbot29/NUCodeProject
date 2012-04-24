var fs = require('fs');
var PEG = require('pegjs');
var assert = require('assert');

parser_text = fs.readFileSync('parser.peg', encoding="ascii");

console.log(parser_text);


var parse = PEG.buildParser(parser_text).parse;

// basic tests
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );


//white space tests
assert.deepEqual( parse("( a b c )"),["a","b","c"]);
assert.deepEqual( parse("(\na b c)"),["a","b","c"]);

//Quote tests
assert.deepEqual( parse("'test"),["quote","test"]);
assert.deepEqual( parse("'(1 2 3)"), ["quote",["1","2","3"]]);

//comments
assert.deepEqual( parse(";; comment"), []);