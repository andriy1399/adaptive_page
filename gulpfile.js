'use strict';


// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
// const cssnano = require('gulp-cssnano');

// const rename = require("gulp-rename");
// const image = require('gulp-image');
// const browserSync = require('browser-sync').create();


// let paths = {
//     styles:{
//         src: 'app/styles/**/*.scss',
//         dest: 'build/css'
//     },
//     html:{
//         src: 'app/**/*.html',
//         dest: 'build/'
//     },
//     images:{
//         src: 'app/image/*.*',
//         dest: 'build/img'
//     },
//     fonts:{
//         src: 'app/fonts/**/*.ttf',
//         dest: 'build/fonts'
//     }
// }


// function browser(done) {
//     browserSync.init({
//         server: {
//             baseDir: './build'
//         },
//         port: 3000,
//         notify: false
//     })
//     done();
// }


// function browserSyncReload(done){
//     browserSync.reload();
//     done();
// }



// function styles(){
//     return gulp.src(paths.styles.src)
//         .pipe(sass().on('error',sass.logError))
//         .pipe(cssnano())
//         .pipe(autoprefixer({browsers: ['last 3 versions' , '> 1%' , 'ie 8', 'ie 7']}))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest(paths.styles.dest))
//         .pipe(browserSync.stream())
// }






// function html(){
//     return src(paths.html.src)
//         .pipe(gulp.dest(paths.html.dest))
//         .pipe(browserSync.stream())
// }


// function images(){
//     return src(paths.images.src)
//         .pipe(image())
//         .pipe(gulp.dest(paths.images.dest))
//         .pipe(browserSync.stream())
// }

// function fonts(){
//     return src(paths.fonts.src)
//         .pipe(gulp.dest(paths.fonts.dest))
//         .pipe(browserSync.stream())
// }

// function watch(){
//     gulp.watch(paths.styles.src,styles);
//     gulp.watch(paths.html.src,html);
//     gulp.watch(paths.images.src,images);
//     gulp.watch(paths.fonts.src,fonts);
//     gulp.watch('./app/*.html', gulp.series(browserSyncReload));
// }


// const build = gulp.parallel(styles,html,images,fonts);
// gulp.task('build',build);
// gulp.task('default',gulp.parallel(watch,browser,build))



//---------------------------------------------------------------------


const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

const rename = require("gulp-rename");
const image = require('gulp-image');
const browserSync = require('browser-sync').create();


const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },

    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    },
    images: {
        src: 'app/image/*.*',
        dest: 'build/img'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    }
};


function browser(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
    done();
};


function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}


function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream())
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream())
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browserSync.stream())
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.images.src, images);
    gulp.watch('./app/*.html', gulp.series(browserSyncReload));
}


const build = gulp.parallel(styles, html, images, fonts);

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, browser, build));