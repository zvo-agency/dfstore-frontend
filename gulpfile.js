var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var bs = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var ftp = require('gulp-ftp');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var include = require("gulp-include");  
var pump = require('pump');

var target = {
	sassSrc       : 'src/scss/**/*.scss',
	sassWww       : 'www/app/css/',
	jsSrc         : 'src/js/**/*.js',
  jsMainSrc     : 'src/js/main.js',
	jsWww         : 'www/app/js/',
	htmlSrc       : 'src/html/pages/*.html',
	htmlWww       : 'www/',
	htmlWatchSrc  : 'src/html/**/*.html',
	fontsSrc      : 'src/fonts/**/*',
	fontsWww      : 'www/app/fonts/',
	imgSrc        : 'src/img/**/*',
	imgWww        : 'www/app/img/',
	filesSrc      : 'src/files/**/*',
	filesWww      : 'www/app/files/'
};

gulp.task('sass', function () {
	gulp.src(target.sassSrc)
		//.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(target.sassWww))
		.pipe(bs.stream())
		.pipe(notify({message: 'SCSS processed!'}));
});

gulp.task('html', function () {
	gulp.src(target.htmlSrc)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
	  	}))
		.pipe(gulp.dest(target.htmlWww))
		.pipe(bs.stream())
});

gulp.task('js', function () {
	gulp.src(target.jsMainSrc)
     .pipe(sourcemaps.init())
    .pipe(include())
      .on('error', console.log)
     .pipe(sourcemaps.write())
		.pipe(gulp.dest(target.jsWww))
		.pipe(bs.stream())
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src(target.jsMainSrc),
        uglify(),
        gulp.dest(target.jsWww)
    ],
    cb
  );
});

gulp.task('fonts', function () {
	gulp.src(target.fontsSrc)
		.pipe(gulp.dest(target.fontsWww))
		.pipe(bs.stream())
});

gulp.task('img', function () {
	gulp.src(target.imgSrc)
		.pipe(gulp.dest(target.imgWww))
		.pipe(bs.stream())
});

gulp.task('files', function () {
	gulp.src(target.filesSrc)
		.pipe(gulp.dest(target.filesWww))
		.pipe(bs.stream())
});

gulp.task('bs', function() {
	bs.init({
		server: {
			baseDir: "www/"
		}
	});
	gulp.watch(target.sassSrc, ['sass']);
	gulp.watch(target.htmlSrc, ['html']);
	gulp.watch(target.htmlWatchSrc, ['html']);
	gulp.watch(target.jsSrc, ['js', 'compress']);
	gulp.watch(target.fontsSrc, ['fonts']);
	gulp.watch(target.imgSrc, ['img']);
	gulp.watch(target.filesSrc, ['files']);
} );



gulp.task('default', function() {
    gulp.run('sass', 'html', 'js', 'compress', 'fonts', 'img', 'files', 'bs');
});
