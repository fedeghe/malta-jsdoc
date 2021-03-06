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

const path = require('path'),
	child_process = require('child_process');

function malta_doc(o, options) {

	options = options || {};

	const self = this,
		start = new Date(),
		outDir = path.dirname(o.name),
		inDir = path.dirname(self.tplPath),
		opts = [o.name],
        pluginName = path.basename(path.dirname(__filename));
        
    let msg;

	'd' in options && opts.push('-d', outDir + '/' + options.d);
	
	if ('c' in options) {
		opts.push('-c', inDir + '/' + options.c);
		self.listen(inDir + '/' + options.c);
	}
	't' in options && opts.push('-t', options.t);
/*
    
    -c, --configure <value>      The path to the configuration file. Default: path/to/jsdoc/conf.json
    -d, --destination <value>    The path to the output folder. Use "console" to dump data to the console. Default: ./out/
    -P, --package <value>        The path to the project's package file. Default: path/to/sourcefiles/package.json
    -R, --readme <value>         The path to the project's README file. Default: path/to/sourcefiles/README.md
    -t, --template <value>       The path to the template to use. Default: path/to/jsdoc/templates/default
*/
	return (solve, reject) => {
		try {
			const ls = child_process.spawn('jsdoc', opts);
			msg = 'plugin ' + pluginName.white() + ' wrote docs';
			ls.on('exit', code => {
				msg = 'plugin ' + pluginName.white() + ' wrote docs';
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
			ls.on('error', err =>  {
				msg = 'plugin ' + pluginName.white() + ' DIDN`T'.red() +' wrote docs';
				self.doErr(err, o, pluginName);
				err
                    ? reject(`Plugin ${pluginName} JsDoc error:\n${err}`)
                    : solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_doc.ext = ['js', 'coffee', 'ts'];
module.exports = malta_doc;