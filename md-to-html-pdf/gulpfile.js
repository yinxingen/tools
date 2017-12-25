var gulp = require("gulp")
var markdown = require('gulp-markdown');
var mdpdf = require('gulp-markdown-pdf');
var jade = require("gulp-jade")

gulp.task("compileMDToHtml", function() {
    gulp.src("./md/*.md")
        .pipe(markdown())
        .pipe(gulp.dest("./html"))
})

gulp.task("compileMDToPdf", function() {
    gulp.src("./md/*.md")
        .pipe(mdpdf())
        .pipe(gulp.dest("./pdf"))
})
gulp.task("compileJadeToHtml", function() {
    gulp.src("./jade/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("./html"))
})

gulp.task("watch:md", function() {
    gulp.watch("./md/*.md", ['compileMDToHtml', 'compileMDToPdf'])
})

gulp.task("watch:jade", function() {
    gulp.watch("./jade/*.jade", ['compileJadeToHtml'])
})
gulp.task("default", ['compileMDToHtml', 'compileMDToPdf', 'compileJadeToHtml', 'watch:md', 'watch:jade'])