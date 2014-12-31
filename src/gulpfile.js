/**
*	Written by Tom Wilkins 31/12/14
*/

var gulp = require('gulp'),

	// loads all gulp plugins under the 'plugins' namespace
	plugins = require("gulp-load-plugins")({
		// include main-bower-files plugin
		pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
		replaceString: /\bgulp[\-.]/
	}),

	// global paths
	path = {
		dist: '../dist/',
		src: '',
		jsFolder: 'js/',
		sassFolder: 'scss/',
		imagesFolder: 'img/',
		bowerComponents: 'bower_components/',
		nodeModules: 'node_modules/'
	},

	// TODO find a better solution
	// development mode
	dev = false;

// sets the dev flag to true, used to allow live reload on development
gulp.task('setDevTrue', function(){
	dev = true;
});

// sets dev flag to false, used to stop live reload on build
gulp.task('setDevFalse', function(){
	dev = false;
});

// outputs errors to console and ends current gulp task
function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}

// minifies all of my JS files and concats into a single file
gulp.task('my-scripts', function(){
	gulp.src(path.src + path.jsFolder +'**/*.js')
		.pipe(plugins.concat('scripts.min.js'))
		.on('error', errorLog)
		.pipe(plugins.uglify())
		.on('error', errorLog)
		.pipe(gulp.dest(path.dist + 'js'))
		.pipe(plugins.if(dev, plugins.livereload()));
});

// minifies all vendor JS (bower components) and concats into single file
gulp.task('vendor-scripts', function(){
 	gulp.src(plugins.mainBowerFiles({
			bowerJson: path.src + 'bower.json',
			bowerDirectory: path.src + path.bowerComponents
		}))
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('vendor.min.js'))
		.pipe(plugins.uglify())
		.on('error', errorLog)
		.pipe(gulp.dest(path.dist + path.jsFolder))
		.pipe(plugins.if(dev, plugins.livereload()));
});

// Styles task
gulp.task('styles', function(){
	// compiles SASS and minifies it
	gulp.src(path.src + path.sassFolder + '**/*.scss')
		.pipe(plugins.rubySass({
			style: 'compressed'
		}))
		.on('error', errorLog)
		.pipe(plugins.rename({suffix: '.min'}))
		.on('error', errorLog)
		.pipe(plugins.autoprefixer('last 2 versions'))
		.on('error', errorLog)
		.pipe(gulp.dest(path.dist + 'css/'))
		.pipe(plugins.if(dev, plugins.livereload()));
});

// Image task
gulp.task('images', function(){
	gulp.src([path.src + path.imagesFolder + '**/*',
		'!' + path.src + path.imagesFolder + '{working,working/**/*}'])
		.pipe(plugins.cache(plugins.imagemin({
			optimizationLevel:5,
			progressive: true,
			interlaced:true
		})))
		.on('error', errorLog)
		.pipe(gulp.dest(path.dist + 'img/'));
});

// HTML task
gulp.task('html', function(){

	// minifies all html files
	var opts = {
		comments:true,
		spare:true
	};

	gulp.src([path.src + '**/*.html',
		'!' +path.src + path.bowerComponents+'**/*.html', 
		'!' +path.src + path.nodeModules+'**/*.html'])
	.pipe(plugins.minifyHtml(opts))
	.on('error', errorLog)
	.pipe(gulp.dest(path.dist))
	.on('error', errorLog)
	.pipe(plugins.if(dev, plugins.livereload()));
});

// PHP task
// does the same as HTML task
gulp.task('php', function(){
	var opts = {
		comments:true,
		spare:true
	};

	gulp.src([path.src + '**/*.php', 
		path.src + '!'+path.bowerComponents+'**/*.php', 
		path.src + '!'+path.nodeModules+'**/*.php'])
	.pipe(plugins.minifyHtml(opts))
	.on('error', errorLog)
	.pipe(gulp.dest(path.dist))
	.on('error', errorLog)
	.pipe(plugins.if(dev, plugins.livereload()));
});

// Watches files for changes and runs tasks
gulp.task('watch', function(){

	// start live reload server
	plugins.livereload.listen();
	// watch tasks
	gulp.watch(path.src + path.jsFolder+'**/*.js', ['my-scripts']);
	gulp.watch(path.src + path.bowerComponents+'**/*.js', ['vendor-scripts']);
	gulp.watch(path.src + path.sassFolder + '**/*.scss', ['styles']);
	gulp.watch(path.src + '**/*.html', ['html']);
	gulp.watch(path.src + '**/*.php', ['php']);
	gulp.watch(path.src + path.imagesFolder + '**/*', ['images']);
});

// deletes the distribution folder
gulp.task('clean', function(){
	gulp.src(path.dist, { read:false })
		.pipe(plugins.rimraf({force:true}))
		.on('error', errorLog);
});

gulp.task('build',['setDevFalse','clean','my-scripts', 'vendor-scripts', 'styles', 'images', 'html', 'php']);
gulp.task('dev', ['setDevTrue','clean','my-scripts', 'vendor-scripts', 'styles', 'images', 'html', 'php','watch']);
gulp.task('default', ['dev']);