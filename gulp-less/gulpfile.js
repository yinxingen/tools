var gulp = require("gulp")
var less = require("gulp-less")
    //css前缀兼容
var auto = require("gulp-autoprefixer")

var minify = require("gulp-clean-css")

gulp.task("compile:less", function() {
    gulp.src("./less/**/*.less")
        .pipe(less())
        .pipe(auto({
            grid: true,
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(minify())
        .pipe(gulp.dest("./css//min/"))
})

gulp.task('watch', function() {
    gulp.watch("./less/**/*.less", ['compile:less'])
})

gulp.task("default", ['compile:less', 'watch'])