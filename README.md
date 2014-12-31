BaseWebsite
===========

A base website template with integrated Bower and Gulp packages ready to use out-of-the-box. 


Setup
-----
Source files: src folder
Distribution files: dist folder

1) Open the src folder in terminal
2) Run 'npm install' to install the node_modules/
3) Run 'bower install' to install the bower_components/


General Workflow
----------------
1) Open the src folder in terminal
2) Run 'gulp' to build the distribution files, start live reload and watch for changes.
3) Type away! 

* You will have to set up your chosen webserver to look in the dist folder, read the other sections for more info or contact me!

* The file structure can be changed, however you may also need to change path variables in the gulpfile


Development
-----------
You should use the Gulp tasks to help during development.

See 'Gulp Packages/ Tasks' for a full list.

1) Open the src folder in terminal 
2) Run 'gulp' or 'gulp dev' which will build the dist folder, watch the html/ scss/ img/ js files for changes and re-build on change. This works well with livereload: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en


Building the distrubtion folder
-------------------------------
1) Open the src folder in terminal
2) Run 'gulp build' which will build the dist folder

Then you can drop the folder into your website sever.


Bower Packages
--------------
This project contains the following packges:
- Bourbon 4.1.0 (sass library)
- Neat 1.7.0 (sass layout library)
- Normalise.css 3.0.2
- jQuery 2.1.3
- Modernizr 2.8.3

You can of course remove any of these packages and add your own using the terminal or bower.json file.


Gulp Packages (installed via NPM: package.json)
-------------
For those of you who don't know, Gulp is a task runner.

These packages are installed through NPM and have been used in the gulpfile.js file:
- jshint 1.9.0
- imagemin 2.0.0
- autoprefixer 2.0.0
- uglify 1.0.2
- ruby-sass 0.7.1
- livereload 2.1.1
- cache 0.2.4
- concat 2.4.3
- filter 2.0.0
- if 1.2.5
- load-plugins 0.8.0
- minify-html 0.1.8
- rename 1.2.0
- rimraf 0.1.1
- strip-debug 1.0.2
- main-bower-files 2.4.1

* I have left off the 'Gulp' prefix


Gulp Tasks
----------
I have written a few useful tasks in the gulpfile.js, however they are not set in stone! Feel free to go poking around and improve it ^^.

Top level tasks (ones you'll probably be using most)
- 'gulp' : runs the following tasks: 'clean','my-scripts', 'vendor-scripts', 'styles', 'images', 'html', 'php','watch'.
- 'gulp dev' : runs the same tasks as 'gulp'
- 'gulp build' : runs the same tasks as 'gulp' but disables the live reloading feature.

Individual tasks
- 'clean' : deletes the dist folder
- 'my-scripts' : concatinates and minifies all .js files in the 'js/' folder into a single file '/dist/js/scripts.min.js'
- 'vendor-scripts' : concatinates and minfies all "main" JS files from Bower Component Packages into a single file '/dist/js/vendor.min.js'
- 'styles' : compiles all .scss files in the /scss/ folder (should only be one), compresses it and puts it in '/dist/css/'
- 'images' : optmises all the images and moves to dist folder
- 'html/php' : minifies files and moves to dist folder
- 'watch' : watches all files for changes and runs live reload after a change


My Setup
--------
Personally I am running an Apache2 local server with virtual hosts set up so I can develop in browser using 'mysite.local' with the virtual host directory pointing to the dist folder.

/etc/apache2/extra/httpd.vhosts.conf:

NameVirtualHost *
<VirtualHost *:80>
    ServerName mysite.local
    ServerAlias www.mysite.local
    DocumentRoot "/path/to/mysite/dist"
    ErrorLog "/private/var/log/apache2/mysite-error_log"
    CustomLog "/private/var/log/apache2/mysite-access_log" common
    ServerAdmin tom@wilkins.co.uk
    <Directory "/path/to/mysite/dist/">
       Order allow,deny
       Allow from all
       # New directive needed in Apache 2.4.3:
       Require all granted
    </Directory>
</VirtualHost>

/etc/hosts:

127.0.0.1 mysite.local www.mysite.local
