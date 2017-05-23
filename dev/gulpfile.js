var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csscomb = require('gulp-csscomb'),
    gcmq = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify");

gulp.task('cssComb', function() {
    return gulp.src('./style.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('./'))
        .pipe(notify('cssComb Success!'));
});
gulp.task('css', function() {
    return gulp.src('./style.scss')
        .pipe(sass().on('error', sass.logError)) // Turn scss file into css
        .pipe(gcmq())
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 5%']}))
        .pipe(cleanCSS())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('../css'))
        .pipe(notify('Css Success!'));
});


gulp.task('watch_cssComb', function() {
    gulp.watch('./style.scss', ['cssComb'])
});
gulp.task('watch_scss', function() {
    gulp.watch('./style.scss', ['css'])
    gulp.watch('./_media.scss', ['css'])
});


gulp.task('default', ['cssComb', 'css', 'watch_scss', 'watch_cssComb']);