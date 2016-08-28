var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    tsc = require('gulp-typescript'),
    tscProj = tsc.createProject('tsconfig.json'),
    //tslint = require('gulp-tslint'),
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
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('typescript', function () {
    var sourceTsFiles = ['./ts/**/*.ts', './typings/'];
    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tscProj));

        tsResult.dts
            .pipe(gulp.dest(output + 'js'));

        return tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(output + 'js'));
});

gulp.task('views', function buildHTML() {
    return gulp
        .src('./views/**/index.pug')
        .pipe(pug({
            //TODO
        }))
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('assets', function () {
    gulp.src(['static/**/*'])
    .pipe(gulp.dest(output + 'assets'));
});

gulp.task('watch', ['scss', 'typescript', 'assets', 'serve'], function() {
    gulp.watch('./scss/**/*.scss', ['scss', 'assets'])
        .on('error', function() {});
    gulp.watch('./ts/**/*.*', ['typescript', 'assets'])
        .on('error', function() {});
    gulp.watch('./views/**/*.pug', ['views', 'assets'])
        .on('error', function() {});
});
gulp.task('serve', function() {
    browserSync.init({
        server: output
    })
})

gulp.task('default', ['scss', 'views'], function() {
    
});