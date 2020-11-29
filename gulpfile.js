let project_folder = "public";
let sourse_filder = "dev";
let path = {
	build: {
		html: project_folder+"/",
		css: project_folder+"/css/",
		img: project_folder+"/images/",
		js: project_folder+"/js/",
	},
	src: {
		html: sourse_filder+"/*.pug",
		css: sourse_filder+"/scss/style.scss",
		img: sourse_filder+"/images/**/*.{jpg,png,svg}",
		js: sourse_filder+"/js/*.js",
	},
	watch: {
		html: sourse_filder+"/**/.pug",
		css: sourse_filder+"/**/*.scss",
		img: sourse_filder+"/images/**/*.{jpg,png,svg}",
		js: sourse_filder+"/js/*.js",
	},
	clean: "./"+project_folder + "/"
}
let { src , dest } = require("gulp"),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	css_clean = require("gulp-clean-css"), 
	rename = require("gulp-rename"),
	gulp_pug = require('gulp-pug'),
	sourcemaps = require('gulp-sourcemaps'),
	modernizr = require('gulp-modernizr');

function  browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./"+project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

function watchFiles(){
	gulp.watch([path.watch.html],pug);
	gulp.watch([path.watch.js],js);
	gulp.watch([path.watch.css],css);
	gulp.watch([path.watch.img],img);
}

function html() {
	return src(path.src.html)
	.pipe(fileinclude())
	.pipe(dest(path.build.html))
	.pipe(browsersync.stream())
}

function clean(params){
	return del(path.clean)
}

function css(){
	return src(path.src.css)
	.pipe(sourcemaps.init())
	.pipe(
		scss({
			outputStyle: "expanded"
		})
	)
	.pipe(
		group_media()
	)
	.pipe(
		autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		})
	)
	.pipe(dest(path.build.css))
	.pipe(css_clean())
	.pipe(
		rename({
			extname: ".min.css"
		})
	)
	.pipe(sourcemaps.write())
	.pipe(dest(path.build.css))
	.pipe(browsersync.stream())
}

function img(){
	return gulp.src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function pug(){
	return gulp.src(path.src.html)
		.pipe(gulp_pug())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function js(){
	return gulp.src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(
			modernizr()
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}


let build = gulp.series(clean, gulp.parallel(pug,css,img, js) )
let watch=gulp.parallel(build,  watchFiles, browserSync)

exports.pug = pug;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
