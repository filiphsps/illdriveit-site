var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug');
    browserSync = require('browser-sync').create(),

    output = './www/';

gulp.task('scss', function () {
    return gulp
        .src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output + 'css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('views', function buildHTML() {
    return gulp
        .src('./views/*.pug')
        .pipe(pug({
            // Your options in here. 
        }))
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['serve'], function() {
    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch('./views/**/*.pug', ['views'])
});
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'www'
        },
    })
})

gulp.task('default', ['scss', 'views'], function() {
    
});