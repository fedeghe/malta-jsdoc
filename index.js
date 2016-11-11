require('malta').checkExec('jsdoc');
// this is somehow a special case cause jsdoc is meant to be used only as console tool
// then:
// - we cannot test with require
// - we do not need to require, it's (hopefully) installed
// - we need to lauch it as a new process
// 
// var deps = ['jsdoc'];
// deps && deps.length && require('malta2').checkDeps(deps);


// 
// http://usejsdoc.org/

var path = require('path'),
	fs = require('fs'),
	child_process = require('child_process');

function malta_doc(o, options) {

	options = options || {};

	var self = this,
		start = new Date(),
		msg,
		dir = path.dirname(o.name),
		outFolder = dir + '/ ' + options.outFolder,
		inDir = path.dirname(self.tplPath),
		opts = [o.name, '-d', outFolder],
		i;

	if ('config' in options) {
		opts.push('-c', inDir + '/' + options.config);
		self.listen(inDir + '/' + options.config);
	}

	// for (i in options) opts.push('-'+i, options[i]);

	return function (solve, reject){
		var ls = child_process.spawn('jsdoc', opts);
		msg = 'plugin ' + path.basename(__filename) + ' wrote docs';

		ls.stdout.on('data', function(data) {
			self.log_debug(data + "");
		});

		ls.stderr.on('error', function (data) {
			self.log_err('stderr: ' + data);
		});

		solve(o);
		self.notifyAndUnlock(start, msg);
		ls.exit();
	};
}
malta_doc.ext = ['js', 'coffee', 'ts'];
module.exports = malta_doc;