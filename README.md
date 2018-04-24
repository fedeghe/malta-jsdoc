---
[![npm version](https://badge.fury.io/js/malta-jsdoc.svg)](http://badge.fury.io/js/malta-jsdoc)
[![Dependencies](https://david-dm.org/fedeghe/malta-jsdoc.svg)](https://david-dm.org/fedeghe/malta-jsdoc)
[![npm downloads](https://img.shields.io/npm/dt/malta-jsdoc.svg)](https://npmjs.org/package/malta-jsdoc)
[![npm downloads](https://img.shields.io/npm/dm/malta-jsdoc.svg)](https://npmjs.org/package/malta-jsdoc)  
---  

This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin

Options : 
    - **d** : the folder where all documentation must be generated, relative to outdir.  
    - c : the path of the config.json for jsdoc, relative to template folder
    - t : absolute path for the template

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-jsdoc[outFolder:\"docs\"]
```
or in the .json file :
```
"app/source/index.js" : "public/js -plugins=malta-jsdoc[d:'docs']",
"app/source/index.ts" : "public/js -plugins=malta-typescript...malta-jsdoc[d:'docs']"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-jsdoc[d:"docs"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```