var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var ngannotate = require('gulp-ng-annotate');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var del = require('del');
var inject = require('gulp-inject');

var paths = {
  sass: ['./scss/**/*.scss', './src/app/**/*.scss', './src/css/*.scss', './src/app/components/**/*.scss'],
  templatecache: ['./src/app/**/*.html' ],
  scripts: ['./src/app/**/*.js', '!./src/lib/**/*.js'],
  fonts: ['./src/lib/ionic/**/*.*'],
  cordova: ['./src/lib/ngCordova/**/*.*'],
  images: ['./src/img/*.*'] ,   
    html: [
    './src/app/**/*.html',
    '!./src/index.html',
    '!./src/lib/**/*.html',
    './src/lib/ionic/**/*.eot','./src/lib/ionic/**/*.svg' ,'./src/lib/ionic/**/*.ttf', '     ./src/lib/ionic/**/*.woff'
  ],
    index: './src/index.html',
    libs: ['./src/lib/**/*.js', './src/lib/ionic/**/*.css'],
    build: './www/'
};

gulp.task('templatecache', function (done) {
    gulp.src(paths.templatecache)
      .pipe(templateCache({
        module: 'whatsPupIonic',
        standalone: false,
        root: 'app'
      }))
      .pipe(gulp.dest('./www/app'))
      .on('end', done);
});

gulp.task('clean', function () {
    return del([
      paths.build
    ]);
});

gulp.task('copy-fonts', function(){
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./www/lib/ionic/'));
})

gulp.task('copy-cordova', function(){
  return gulp.src(paths.cordova)
    .pipe(gulp.dest('./www/lib/ngCordova/'));
})

gulp.task('copy-images', function(){
  return gulp.src(paths.images)
    .pipe(gulp.dest('./www/img/'));
})

// we dont need to copy the html because that is inside the templates.js
/*gulp.task('copy',  function () {
    gulp.src(paths.html)
        .pipe(gulp.dest('www/'));
});*/

gulp.task('inject', ['package'], function(){
  var target = gulp.src('./www/index.html');
  var sources = gulp.src(['./www/app/templates.js']);
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./www'));
})

gulp.task('usemin', function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngannotate(), uglify() ]
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('build', ['inject']);
gulp.task ('package', ['sass', 'templatecache', 'usemin', 'copy-fonts', 'copy-cordova', 'copy-images']);
gulp.task('default', ['sass', 'templatecache']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

 gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templatecache, ['templatecache']);
  });

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
