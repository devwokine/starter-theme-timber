const SITE_URL = 'http://project.dev.wokine.com';

const gulp = require('gulp')
const del = require('del')
const gutil = require('gutil')
const newer = require('gulp-newer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const sourcemaps = require('gulp-sourcemaps')
const rollup = require('rollup-stream')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer');
const babel = require ('rollup-plugin-babel')
const nodeResolve = require ('rollup-plugin-node-resolve')
const commonjs = require ('rollup-plugin-commonjs')
const uglifyRollUp = require ('rollup-plugin-uglify')

const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

const imagemin = require('gulp-imagemin')

const browserSync = require('browser-sync').create()

/*
 * Nettoyage
 */
gulp.task('clean', (cb) => del('build/**', cb))


/*
 * Compilation des styles CSS
 */
gulp.task('build:css', () => {
  return gulp.src(['./assets/sass/app.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', function (error) {
        console.error('' + error.messageFormatted);
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 1%']
    }))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({basename: 'app.min'}))
    .pipe(gulp.dest('build/css'))
    //.pipe(browserSync.stream());
})

/*
 * Compilation du JS
 */
 gulp.task('build:js', () => {
   return rollup({
     input: './assets/js/app.js',
     format: 'umd',
     sourcemap: true,
     plugins: [
       nodeResolve({ jsnext: true, main: true, browser: true}),
       commonjs(),
       babel({
          presets: ["es2015-rollup"]
        }),
        uglifyRollUp()
     ]
   }).on('error', function(e) {
      console.error(e.stack);
      this.emit('end');
    })
   .pipe(source('app.min.js'))
   .pipe(buffer())
   .pipe(sourcemaps.init({loadMaps: true}))
   .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
 });

/*
 * Minification des images
 */
gulp.task('build:img', () => {
  return gulp.src('assets/images/**')
    .pipe(newer('build/img'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
})

/*
 * Copie des fontes
 */
gulp.task('build:font', () => {
  return gulp.src('assets/fonts/**')
    .pipe(newer('build/fonts'))
    .pipe(gulp.dest('build/fonts'))
})

/*
 * BrowserSync
 */
gulp.task('browserSync', function() {
  	browserSync.init({
       proxy: SITE_URL
    });
})

/*
 * Compilation automatique au changement des fichiers
 * Livereload est activé
 */
gulp.task('watch', ['browserSync', 'build:css', 'build:js', 'build:img'], () => {
  gulp.watch('assets/sass/**/*.scss', ['build:css'])
  gulp.watch('assets/js/**/*.js', ['build:js'])
  gulp.watch('assets/images/**/*', ['build:img'])
  gulp.watch(['*.php', './views/**/*.twig']).on("change", browserSync.reload);
})

/*
 * Compilation de tous les assets
 */
gulp.task('build', [
  'build:css',
  'build:js',
  'build:img',
  'build:font'
])

/*
 * Tâche par défaut
 */
gulp.task('default', ['watch'])
