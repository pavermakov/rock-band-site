var gulp = require("gulp");
var sass = require("gulp-sass");
var rigger = require('gulp-rigger');
var browserSync = require('browser-sync');

// compile .scss files
gulp.task('sass',function(){
	return gulp.src('sass/*.scss')
		.pipe(rigger())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'))
});

// browser synchronization
gulp.task('browserSync',function(){
	browserSync({
		server:{
			baseDir:"."
		}
	})
});

// watch file changes
gulp.task('watch',['browserSync','sass'],function(){
	// compile .scss files on changes
	gulp.watch('sass/**/*.scss',['sass']);
	// reload page when .html, .css or .js files change
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('css/*.css', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});
