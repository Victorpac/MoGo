var 
  	gulp 			 = require('gulp'),
  	minifyCss 		 = require('gulp-clean-css'),
  	rename     		 = require('gulp-rename');


gulp.task('default', function () {
	return gulp.src('./css/main.css')
		.pipe(gulp.dest('./css/'))
		.pipe(minifyCss())
		.pipe(rename({
		    suffix: ".min"
		  }))
		.pipe(gulp.dest('./css/'));
		});