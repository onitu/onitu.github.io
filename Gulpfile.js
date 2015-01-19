var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

gulp.task('html', function() {
  return gulp.src('html/**/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
});

gulp.task('css', function() {
  return gulp.src('css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('vendors', function() {
    return gulp.src('css/vendors/**/*', {base: '.'})
        .pipe(gulp.dest('dist/'))
});

gulp.task('fonts', function() {
    return gulp.src('css/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/css/fonts/'))
});

gulp.task('js', function() {
  return gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('img', function() {
  return gulp.src('img/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('server', function(next) {
  var connect = require('connect'),
      http = require("http")

  http.createServer(
    connect()
      .use(require("connect-livereload")())
      .use(require("serve-static")('dist/', {etag: false}))
  )
  .listen(8080);

  if(next) {
      next();
  }
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('html/**/*.jade', ['html']);
  gulp.watch('img/**/*', ['img']);
  gulp.watch('css/fonts/**/*', ['fonts']);


  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});


gulp.task("default", ['html', 'vendors', 'css', 'js', 'img', 'fonts', 'server', 'watch']);
