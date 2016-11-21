This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin

Options : 
    - **outFolder** : the folder where all documentation must be generated, relative to outdir.  
    - config : the path of the config.json for jsdoc, relative to template folder

Sample usage:  

    malta app/source/index.js public/js -plugins=malta-jsdoc[outFolder:\"docs\"]

or in the .json file :

    "app/source/index.js" : "public/js -plugins=malta-jsdoc[outFolder:\"docs\"]",
    "app/source/index.ts" : "public/js -plugins=malta-typescript...malta-jsdoc[outFolder:\"docs\"]"

or in a script : 

    var Malta = require('malta');
    Malta.get().check([
        'app/source/index.js',
        'public/js',
        '-plugins=malta-jsdoc[outFolder:\"docs\"]',
        '-options=showPath:false,watchInterval:500,verbose:0'
        ]).start(function (o) {
            var s = this;
            console.log('name : ' + o.name)
            console.log("content : \n" + o.content);
            'plugin' in o && console.log("plugin : " + o.plugin);
            console.log('=========');
        });
