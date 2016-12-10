/* eslint-disable */
var gulp = require('gulp');
var karma = require('karma'); 
var browserSync = require('browser-sync').create();

/**
 * setting up browserSync to our server directory,
 *  which our root directory in this case src
 */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: "./SpecRunner.html"
        }
    });
});

gulp.task('pageSync', () => {
    browserSync.init({
        server: {
            baseDir: './public',
            index: "./page.html"
        }
    });
});

/**
 * adding watch function to be able to reload our browser
 *  whenever changes are been made to js, html, and css files
 */
gulp.task('watch', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('public/*.css', browserSync.reload);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('src/*.js', browserSync.reload);
    gulp.watch('*.js', browserSync.reload);
    gulp.watch('spec/*.js', browserSync.reload);
    gulp.watch('public/src/*.js', browserSync.reload);
});
gulp.task('page',['pageSync'], ()=> {
    gulp.watch('public/*.css', browserSync.reload);
    gulp.watch('public/page.html', browserSync.reload);
});
gulp.task('coveralls', ['karma'], function() { // 2nd arg is a dependency: 'karma' must be finished first.  
    // Send results of istanbul's test coverage to coveralls.io.
    return gulp.src('gulpfile.js', { read: false }) // You have to give it a file, but you don't have to read it.
        .pipe(shell('cat coverage/lcov.info | node_modules/coveralls/bin/coveralls.js'));
});
