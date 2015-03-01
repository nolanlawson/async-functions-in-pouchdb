'use strict';

var inputFile = "./lib/index.js";
var outputFile = "./dist/async-functions-in-pouchdb.js";
var standalone = "AsyncFunctionsInPouchDB";

var browserify = require("browserify");
var babelify = require("babelify");
var fs = require('fs');

browserify({ standalone: standalone }).transform(babelify.configure({
    experimental: true,
    optional: ["runtime"]
  }))
  .require(inputFile, { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream(outputFile));
