const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const minifyCss = require('gulp-minify-css');
const minifyJs = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const revts = require('gulp-rev-timestamp');
const runSequence = require('run-sequence');

gulp.task('minify-css', () => {
  return gulp.src('.tmp/styles/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles'));
});

function toPromise(x) {
  return new Promise((resolve, reject) => x.on('error', reject).on('end', resolve));
}

gulp.task('style', function () {
  return Promise.all(
    [
      toPromise(gulp.src('app/styles/**/*.css')
        .pipe(gulp.dest('.tmp/styles'))),
      toPromise(gulp.src('app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.tmp/styles')))
    ]
  )
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


gulp.task('html', ['styles-dist'], () => {
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

const replace = require('gulp-string-replace');

gulp.task('build-index', function () {
  const time = new Date().getTime();
  gulp.src('./app/index.html')
    .pipe(replace(/@@hash/g, function () {
      return time;
    }))
    .pipe(replace(/<head>/g, function () {
      return '<head>\n<base href="dist/"/>';
    }))
    .pipe(gulp.dest('./'))

});

gulp.task('build', ['html', 'images', 'fonts', 'minify-css', 'minify-js', 'extras', 'build-index'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
