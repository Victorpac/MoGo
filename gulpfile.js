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
<<<<<<< HEAD
		.pipe(gulp.dest('./css/'));
=======
		.pipe(gulp.dest('./css/'))
		.pipe(livereload());
});


gulp.task('default', function () {
	livereload.listen();
	gulp.watch(['./css/main.css'], gulp.series('action'));
>>>>>>> origin/gh-pages
});