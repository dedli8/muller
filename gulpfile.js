var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');
var htmlincluder = require('gulp-htmlincluder');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('server', function(){
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 7000
    });
});

gulp.task('html', function(){
    gulp.src('dev/**/*.html')
        .pipe(htmlincluder())
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: 1
        // }))
        .pipe(rename(function(path){
            path.dirname = ''
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src('dev/assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('move', function(){
    gulp.src('dev/assets/img/*.*')
        .pipe(rename(function(path){
            path.dirname = ''
        }))
        .pipe(gulp.dest('dist/img/'));
    gulp.src('dev/assets/fonts/*.*')
        .pipe(gulp.dest('dist/fonts/'));
    gulp.src('dev/assets/js/*.js')
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('sprite', function(){
    var sprite = gulp.src('dev/assets/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss',
            padding: 5,
            algorithm: 'binary-tree'
        }));

        sprite.img.pipe(gulp.dest('dist/img'));
        sprite.css.pipe(gulp.dest('dev/assets/scss/includes'));
});
gulp.task('pref', () =>
gulp.src('dist/styles.css')
    .pipe(autoprefixer({ grid: true, browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11']  }))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', function(){
    gulp.start(['server', 'move', 'html', 'css']);

    gulp.watch(['dev/**/*.html'], function(){
        gulp.start(['html']);
    });

    gulp.watch(['dev/**/*.scss'], function(){
        gulp.start(['css']);
    });
});