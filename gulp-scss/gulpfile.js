const gulp = require("gulp")
const concat = require('gulp-concat')
const cleanCss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const webserver = require("gulp-webserver")

gulp.task('server', function() {
    gulp.src('./')
        .pipe(webserver({
            host: 'localhost',
            port: 9000,
            livereload: true,
            directoryListing: false
        }))
})


const sass = require('gulp-sass')
gulp.task('sass', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('index.css'))
        // .pipe(cleanCss({ compatibility: 'i8' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("./build/css"))
})

const webpack = require('gulp-webpack')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
gulp.task('packjs', function() {
    gulp.src('./src/js/index.js')
        .pipe(webpack({
            output: {
                filename: 'index.js'
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: "babel-loader",
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./build/js"))
})



gulp.task('watch:sass', function() {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
})

gulp.task('watch:js', function() {
    gulp.watch('./src/js/**/*.js', ['packjs'])
})



gulp.task('default', ['sass', 'watch:sass', 'packjs', 'watch:js', 'server'])