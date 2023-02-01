const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

const env = process.env.NODE_ENV;
const entryFile = './src/serve/**/*.js';
const targetDir = './dist/serve'
let build;

// 开发环境
function devTask () {
  console.log('运行 devTask ===>>>')
  return watch(entryFile, { ignoreInitial: false })
    .pipe(babel({
      babelrc: false,
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }))
    .pipe(gulp.dest(targetDir))
}

// 清洗代码
function cleanConfigTask () {

  return gulp.src(entryFile)
    .pipe(rollup({
      input: './src/serve/config/index.js',
      output: {
        format: 'cjs'
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      ]
    }))
    .pipe(gulp.dest(targetDir))
}

// 生产环境
function prodTask () {

  return gulp.src(entryFile)
    .pipe(
      babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs']
      })
    )
    .pipe(
      gulp.dest(targetDir)
    )
}

console.log('当前的运行环境===>>>', env);

if (env === 'development') {
  build = gulp.series(devTask);
}

if (env === 'production') {
  build = gulp.series(prodTask, cleanConfigTask);
}

exports.default = gulp.task('default', build);
