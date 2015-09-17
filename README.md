# Silverstripe boilerplate module

Simple boilerplate to help kick start a new Silverstripe module.

## Creating a new module
Quickly setup a new module skeleton by cloning this repository and deleting the .git folder.

To do this in one line, from the command line run:   
(*Replace <b><i>`MyModuleFolder`</i></b> with name of the folder where you want to create your new module.*)  

###Windows
**Using Composer**
<pre>cmd /V /C "set "SS_MODULE_DIR=<b><i>MyModuleFolder</i></b>" && composer require gdmedia/silverstripe-module-boilerplate && move silverstripe-module-boilerplate !SS_MODULE_DIR! && composer remove gdmedia/silverstripe-module-boilerplate && IF EXIST !SS_MODULE_DIR!\.git rmdir /q /s !SS_MODULE_DIR!\.git"</pre>
**Using GIT**
<pre>cmd /V /C "set "SS_MODULE_DIR=<b><i>MyModuleFolder</i></b>" && git clone https://github.com/guru-digital/silverstripe-module-boilerplate.git !SS_MODULE_DIR! && rmdir /q /s !SS_MODULE_DIR!\.git"</pre>

###\*nix 
**Using Composer**
<pre>SS_MODULE_DIR=<b><i>MyModuleFolder</i></b> && composer require --prefer-dist gdmedia/silverstripe-module-boilerplate && mv silverstripe-module-boilerplate $SS_MODULE_DIR && composer remove gdmedia/silverstripe-module-boilerplate && [ -d ${SS_MODULE_DIR}/.git ] && rm -r ${SS_MODULE_DIR}/.git</pre>
**Using GIT**
<pre>SS_MODULE_DIR=<b><i>MyModuleFolder</i></b> && git clone https://github.com/guru-digital/silverstripe-module-boilerplate.git $SS_MODULE_DIR && rm -rf ${SS_MODULE_DIR}/.git</pre>

## Grunt
You can use Grunt to quickly rename the boiler plate file names and place holders.

###grunt rename-project
To use, after installing with the steps above:
* Edit [`package.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/package.json) and update the values to suit your new module.
* Edit [`Gruntfile.js` - `lines 5 to 9`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/Gruntfile.js#L5-L9) and update the values to suit your new module.
* From the command line run:
(*Replace <b><i>`MyModuleFolder`</i></b> with name of the folder where you want to create your new module.*)
<pre>
cd <b><i>MyModuleFolder</i></b>
npm install
grunt rename-project
</pre>

This will:
* Replace all place holder values in all files with related values from [`package.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/package.json) and [`Gruntfile.js` - `lines 5 to 9`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/Gruntfile.js#L5-L9)
* Update [`composer.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/composer.json) and [`bower.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/bower.json) from the corresponding values in [`package.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/package.json)
* Rename the following files, replacing `MyModule` with the value of [`prefix` in `Gruntfile.js`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/Gruntfile.js#L8)
  * [assets\css\MyModuleCSS.css](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/assets\css\MyModuleCSS.css)
  * [assets\images\sitetree-images\MyModulePageIcon.png](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/assets\images\sitetree-images\MyModulePageIcon.png)
  * [assets\javascript\MyModuleJS.js](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/assets\javascript\MyModuleJS.js)
  * [code\Extension\MyModuleDataExtension.php](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/code\Extension\MyModuleDataExtension.php)
  * [code\Extension\MyModuleExtension.php](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/code\Extension\MyModuleExtension.php)
  * [code\PageTypes\MyModulePage.php](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/code\PageTypes\MyModulePage.php)

###grunt update_json
Running `grunt update_json` will update [`composer.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/composer.json) and [`bower.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/bower.json) from the corresponding values in [`package.json`](https://github.com/guru-digital/silverstripe-module-boilerplate/blob/master/package.json)

###grunt jshint
Running `grunt jshint` will run js hint over all non-minified javascript files in [`assets/javascript`](https://github.com/guru-digital/silverstripe-module-boilerplate/tree/master/assets/javascript)

###grunt uglify
Running `grunt uglify` will run minify javascript files in [`assets/javascript`](https://github.com/guru-digital/silverstripe-module-boilerplate/tree/master/assets/javascript)

###grunt cssmin
Running `grunt cssmin` will run minify CSS files in [`assets/css`](https://github.com/guru-digital/silverstripe-module-boilerplate/tree/master/assets/css)

###grunt default
Running `grunt default` will run the `update_json`, `jshint`, `uglify` and `cssmin` tasks one after another.


## Pull requests welcome!
If you have a class, file or anything else that may be handy to have in this boilerplate, submit an [issue]( https://github.com/guru-digital/silverstripe-module-boilerplate/issue) or [pull request]( https://github.com/guru-digital/silverstripe-module-boilerplate/pull)


