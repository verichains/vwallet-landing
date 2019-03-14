const gulp = require( 'gulp');
const gulpLoadPlugins = require( 'gulp-load-plugins');
const browserSync = require( 'browser-sync');
const del = require( 'del');
const minifyCss = require( 'gulp-minify-css');
const minifyJs = require( 'gulp-uglify');
const imagemin = require( 'gulp-imagemin');
const pngquant = require( 'imagemin-pngquant');
const sass = require( 'gulp-sass');
const babel = require('gulp-babel');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('minify-css', () => {
  return gulp.src('.tmp/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('style', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.tmp/styles'));
  gulp.src('app/styles/**/*.css')
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('styles-dist', function () {
  gulp.src('app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minify-js', () => {
  return gulp.src('app/scripts/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minifyJs().on('error', console.log))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('html', ['styles-dist', 'scripts'], () => {
  const assets = $.useref.assets({searchPath: ['app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('serve', ['style'], () => {
  browserSync({
    open: false,
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/styles/**/*.css',
    'app/images/**/*',
    'app/fonts/**/*',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['style', reload]);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['html', 'images', 'fonts', 'minify-css', 'minify-js', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
