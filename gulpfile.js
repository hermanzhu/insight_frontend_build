var gulp = require('gulp')
var babel = require('gulp-babel')
var sass = require('gulp-sass')
var less = require('gulp-less')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var react = require('gulp-react')
var jsx = require('gulp-jsx')
var livereload = require('gulp-livereload')
var server = require('gulp-server-livereload')

var paths = {
	"js": ["src/scripts/**/*.js", "src/scripts/**/*.jsx"],
	"sass": ["src/scss/**/*.scss"]
}

gulp.task('scripts', () => {
	return gulp.src(paths.js)
		.pipe(react())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('builds/scripts'))
})

gulp.task('sass', () => {
	return gulp.src(paths.sass)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('builds/css'))
})

gulp.task('watch', () => {
	gulp.watch(paths.js, ['scripts'])
	gulp.watch(paths.sass, ['sass'])
})

gulp.task('webserver', () => {
	gulp.src('./')
		.pipe(server({
			livereload: true,
			directoryListing: true,
			port: 3333,
			defaultFile: "index.html"
		}))
})


gulp.task('default', ['webserver', 'watch'])