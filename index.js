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
		pluginName = path.basename(path.dirname(__filename)),
		i,
		doErr = function (e) {
			console.log(('[ERROR on ' + o.name + ' using ' + pluginName + '] :').red());
			console.dir(e);
			self.stop();
		};

	if ('config' in options) {
		opts.push('-c', inDir + '/' + options.config);
		self.listen(inDir + '/' + options.config);
	}

	return function (solve, reject){
		try {
			var ls = child_process.spawn('jsdoc', opts);
			msg = 'plugin ' + pluginName.white() + ' wrote docs';
			ls.on('exit', function (code) {
				msg = 'plugin ' + pluginName.white() + ' wrote docs';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			doErr(err);
		}
	};
}
malta_doc.ext = ['js', 'coffee', 'ts'];
module.exports = malta_doc;