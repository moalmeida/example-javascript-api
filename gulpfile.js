
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
  return gulp.src(['app/**/*.js', '!app/**/app.js', '!app/**/index.js', '!app/**/*.spec.js'])
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
      token: '27d208c2ecce424c8899b2cf96a6ff5d'
    }))
  ;
});

gulp.task('default', sequence(['lint', 'test'], 'codacy'));
