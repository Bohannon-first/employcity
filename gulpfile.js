const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const csso = require('gulp-csso');
const svgstore = require('gulp-svgstore');
const terser = require('gulp-terser');

// Sass-compiler
gulp.task('sass-compile-css', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(gulp.dest('./css'))
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('.'))
    // Css minify
    .pipe(gulp.dest('./css'))
    .pipe(gulp.src('./css/rSlider.css'))
    .pipe(csso())
    .pipe(rename('rSlider.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src('./js/main.js')
  .pipe(terser())
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('./js'))
  .pipe(browserSync.stream());
});

// Sprite
gulp.task('sprite', function () {
  return gulp.src('./img/icons-sprite/*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./img'));
});

// Перезагрузка браузера
gulp.task('refresh', function (done) {
  browserSync.reload();
  done();
});

// Запуск сервера + работа вотчера
gulp.task('server', function () {
  browserSync.init({
      server: './',
      notify: false,
      open: true,
      cors: true,
      ui: false
    });

    gulp.watch('scss/**/*.scss', gulp.series('sass-compile-css'));
    gulp.watch('css/*.css', gulp.series('refresh'));
    gulp.watch('*.html', gulp.series('refresh'));
    gulp.watch('js/*.js', gulp.series('refresh'));
  });

gulp.task('start', gulp.series('sass-compile-css', 'scripts', 'sprite', 'server'));
