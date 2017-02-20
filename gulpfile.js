// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');//压缩工具
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var mincss = require('gulp-minify-css');

// 检查脚本
gulp.task('lint', function() {
   gulp.src('libs/js/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('minjs', function() {
    gulp.src('libs/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('libs/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('libs/dist'));
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: '',
        port:8081,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('*.html').pipe(connect.reload());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('libs/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('libs/css'))
        .pipe(concat('common.css'))
        .pipe(gulp.dest('libs/css'))
        .pipe(rename('common.min.css'))
        .pipe(mincss())
        .pipe(gulp.dest('libs/css'));        
});

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    //前面是监听的文件，后面是调用的任务
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['libs/js/*.js'], ['minjs']);
    gulp.watch(['libs/scss/*.scss'], ['sass']);
    gulp.watch(['libs/dist/*.js'], ['html']);
    gulp.watch(['libs/css/common.min.css'], ['html']);
});

gulp.task('default', function(){
    gulp.run('watch', 'connect','sass', 'minjs');
})