'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  sdk: '../../Extension SDK/',
  appPath: 'src/',
  appStructFile: 'construct.json',
  templatePath: 'app_templates/'
};

gulp.appName = 'StarterPack';

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
