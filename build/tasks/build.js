var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var typescript = require('gulp-tsb');

var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-api', function() {
  if (!typescriptCompiler) {
    typescriptCompiler = typescript.create(require('../../tsconfig.json')
      .compilerOptions);
  }
  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean', ['build-api'],
    callback
  );
});
