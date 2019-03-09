var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify"),
    zip = require('gulp-zip'),
    livereload = require('gulp-livereload');

// HTML TASK
gulp.task('html', function () {

    return gulp.src('project/html/**/*.*')
            .pipe(pug({pretty: true}))
            .pipe(concat('index.html'))
            .pipe(gulp.dest('dist'))
            .pipe(livereload());
});

// CSS Task
gulp.task('css', function () {

    return gulp.src('project/css/**/*.*')
            .pipe(sourcemaps.init())
            .pipe(sass({outputstyle: 'compressed'}))
            .pipe(prefix('last 2 versions'))
            .pipe(concat('style.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'))
            .pipe(livereload());
});

// Compress Task
gulp.task('compress', function () {

    return gulp.src('dist/**/*.*')
            .pipe(zip('design.zip'))
            .pipe(gulp.dest('.'))
            .pipe(notify('Files Is Compressed'))
});

// Watch Task
gulp.task('watch', function () {

    require('./server.js');
    livereload.listen();
    gulp.watch('project/html/**/*.*', gulp.series('html'));
    gulp.watch('project/css/**/*.*', gulp.series('css'));
    gulp.watch('dist/**/*.*', gulp.series('compress'));
});

// Default Task
gulp.task('default', gulp.series('watch'))