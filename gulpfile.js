const { src, dest, series } = require('gulp');
const zip = require('gulp-zip');

function build(cb) {
  return src('src')
    .pipe(zip('super_tsheets.zip'))
    .pipe(dest('dist'))
}

exports.build = series(build);