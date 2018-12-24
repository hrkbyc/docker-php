const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const url = "./html/";

var errorHandler = function(error) {
  notifier.notify({
    message: error.message,
    title: error.plugin
  });
};

gulp.task('serve', () => {
  browserSync.init({
      proxy: "localhost:80"
  });
});

gulp.task('sass', () => {
  // scssファイルからcssファイルを書き出し
  return gulp.src( url + "sass/*.scss")
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest("./html/css/"))
  .pipe(notify('Sassをコンパイルしました！'));
});

gulp.task('minify-css', function() {
  // cssファイルを圧縮
  return gulp.src(["./html/css/*.css", "!./html/css/*.min.css"])
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({extname: '.min.css'}))
  .pipe(gulp.dest(url + 'css'))
  .pipe(notify('cssを圧縮しました！'));
});

gulp.task('js', function() {
  return gulp.src(["./html/js/**/*.js", "!./html/js/*.min.js"])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest('./html/js/min/'));
});

gulp.task('watch', () => {

  // scssファイルが変更されたらsassタスクを実行
  gulp.watch(url + "sass/*.scss", ['sass']);

  // cssファイルが変更されたらminify-cssタスクを実行
  gulp.watch([url + "css/*.css", "!./html/css/*.min.css"], ['minify-css']);

  // jsファイルが変更されたらjsタスクを実行
  gulp.watch([url + "js/*.js", "!./html/js/*.min.js"],['js']);

  // phpファイルとcssファイルが変更されたら、ブラウザをリロード
  gulp.watch([url + "*.php", url + "css/*.css", url + "js/*.js"]).on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'watch']);
