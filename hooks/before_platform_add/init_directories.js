//#!/usr/bin/env node
//
///**
// * On a fresh clone, the local platforms/ and plugins/ directories will be
// * missing, so ensure they get created before the first platform is added.
// */
//var fs = require('fs');
//var path = require('path');
//
//var platformsDir = path.resolve(__dirname, '../../platforms');
//var pluginsDir = path.resolve(__dirname, '../../plugins');
//
//try {
//  fs.mkdirSync(platformsDir, function (err) {
//    if (err) { console.error(err); }
//  });
//} catch(ex) {}
//
//try {
//  fs.mkdirSync(pluginsDir, function (err) {
//    if (err) { console.error(err); }
//  });
//} catch(ex) {}

#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var jshint = require('jshint').JSHINT;
var async = require('async');

var foldersToProcess = [
		'js'
];

foldersToProcess.forEach(function(folder) {
		processFiles("www/" + folder);
});

function processFiles(dir, callback) {
		var errorCount = 0;
		fs.readdir(dir, function(err, list) {
				if (err) {
						console.log('processFiles err: ' + err);
						return;
				}
				async.eachSeries(list, function(file, innercallback) {
						file = dir + '/' + file;
						fs.stat(file, function(err, stat) {
								if(!stat.isDirectory()) {
										if(path.extname(file) === ".js") {
												lintFile(file, function(hasError) {
														if(hasError) {
																errorCount++;
														}
														innercallback();
												});
										} else {
												innercallback();
										}
								} else {
										innercallback();
								}
						});
				}, function(error) {
						if(errorCount > 0) {
								process.exit(1);
						}
				});
		});
}

function lintFile(file, callback) {
		console.log("Linting " + file);
		fs.readFile(file, function(err, data) {
				if(err) {
						console.log('Error: ' + err);
						return;
				}
				if(jshint(data.toString())) {
						console.log('File ' + file + ' has no errors.');
						console.log('-----------------------------------------');
						callback(false);
				} else {
						console.log('Errors in file ' + file);
						var out = jshint.data(),
						errors = out.errors;
						for(var j = 0; j < errors.length; j++) {
								console.log(errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' +
errors[j].evidence);
						}
						console.log('-----------------------------------------');
						callback(true);
				}
		});
}
