var fs        = require('fs'),
    path      = require('path'),
    sourceMap = require('source-map')

// file output by Webpack, Uglify, etc.
var GENERATED_FILE = path.join('minified/src', 'lib.js.map')

// line and column located in your generated file (e.g. source of your error
// from your minified file)
var GENERATED_LINE_AND_COLUMN = {line: 1, column: 300}

var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString()
var smc = new sourceMap.SourceMapConsumer(rawSourceMap)

// should see something like:
// { source: 'original.js', line: 57, column: 9, name: 'myfunc' }
smc.then(consumer => consumer.originalPositionFor(GENERATED_LINE_AND_COLUMN)).then(console.log)
