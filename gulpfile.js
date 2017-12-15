/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
const codacy = require('gulp-codacy');
const sequence = require('gulp-sequence');

gulp.task('lint', () => {
    return gulp.src(['app/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('istabul-hook', () => {
  return gulp.src(['app/**/*.js', '!app/app.js', '!app/index.js', '!app/**/*.spec.js'])
    .pipe(istanbul({
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
});

gulp.task('test', ['istabul-hook'], () => {
    return gulp.src(['app/**/*.spec.js'])
         .pipe(jasmine({
           verbose: true,
         }))
         .pipe(istanbul.writeReports())
});

gulp.task('codacy', () => {
  return gulp.src(['coverage/lcov.info'], { read: false })
    .pipe(codacy({
      token: 'eaa023a763ca449eb03c596a47935cd8'
    }))
  ;
});

gulp.task('default', sequence(['lint', 'test'], 'codacy'));
