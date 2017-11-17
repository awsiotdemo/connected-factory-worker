/**
* @author Sonam Dwivedi
*
* @email sonam.dwivedi59@yahoo.com
*
* @description "Build process"
*
*/

'use strict'

const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const gulpCache = require('gulp-cache')
const minifyHtml = require('gulp-htmlmin')
const less = require('gulp-less')
const uglify = require('gulp-uglify')
const usemin = require('gulp-usemin')
const rename = require('gulp-rename')
const LessCleanCSS = require('less-plugin-clean-css')
const cleancss = new LessCleanCSS({
    advanced: true
})
const path = require('path')
const currentEnv = process.env.NODE_ENV || 'development'
const themeName = process.env.BRAND_NAME || "main"

if (currentEnv === 'production') {
    gulp.task('default', ['clean-dirs']);
} else {
    gulp.task('default', ['less-development']);
}

gulp.task('clearGulpCahce', function(done) {
    return gulpCache.clearAll(done);
});

gulp.task('client-build', ['clearGulpCahce'], function() {
    checkPathDelete('./src/build');
    return gulp.src('./src/client/**/*')
        .pipe(gulp.dest('./src/build/'))
});

gulp.task('less-css', ['client-build'], function() {
    return gulp.src('./src/build/less/' + themeName + '.less')
        .pipe(less({
            plugins: [cleancss],
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(rename("main.css"))
        .pipe(gulp.dest('./src/build/css'));
});

gulp.task('usemin', ['less-css'], function() {
    return gulp.src('./src/build/index.html')
        .pipe(usemin({
            js: []
        }))
        .pipe(gulp.dest('./src/build/'));
});

gulp.task('minify-js', ['usemin'], function() {
    return gulp.src('./src/build/javascripts/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/build/javascripts/'))
});

gulp.task('minify-html', ['minify-js'], function() {
    return gulp.src('src/build/**/*.html')
        .pipe(minifyHtml({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('src/build/'))
});

gulp.task('clean-dirs', ['minify-html'], function() {
    del(['./src/build/javascripts/**/module.js', './src/build/javascripts/**/controllers']);
    del(['./src/build/js/**', './src/build/less/**', './src/build/javascripts/scripts/**'], {
        force: true
    });
});

const checkPathDelete = function(pathLocation) {
    fs.exists(pathLocation, function(pathContainsDir) {
        if (pathContainsDir)
            del.sync([pathLocation], {
                force: true
            });
    });
}

gulp.task('less-development', function() {
    del.sync(['./src/client/css/**']);

    return gulp.src('./src/client/less/' + themeName + '.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(rename("main.css"))
        .pipe(gulp.dest('./src/client/css/'));
});