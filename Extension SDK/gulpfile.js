'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'dev',
  dist: 'dist'
};

require('require-dir')('./gulp');

gulp.task('default', function () {
    gulp.start('build');
});
