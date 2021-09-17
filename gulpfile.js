var 
  	gulp 			 = require('gulp'),
  	minifyCss 		 = require('gulp-clean-css'),
  	livereload		 = require('gulp-livereload'),
  	rename     		 = require('gulp-rename');


gulp.task('action', function () {
	gulp.src('./css/main.css')
		.pipe(gulp.dest('./css/'))
		.pipe(minifyCss())
		.pipe(rename({
		    suffix: ".min"
		  }))
		.pipe(gulp.dest('./css/'))
		.pipe(livereload());
});


gulp.task('default', function () {
	livereload.listen();
	gulp.watch(['./css/main.css'], gulp.series('action'));
});