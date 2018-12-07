let gulp = require("gulp");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");
let sass = require("gulp-sass");//编译scss到css

gulp.task("copy",()=>{
	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
})

gulp.task("buildJS",()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js")
	.pipe(gulp.dest("./dist/scripts/libs"))
	//编译压缩复制
	gulp.src("./src/scripts/*.js")
	.pipe(babel({
		presets:['env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/scripts"));
})

gulp.task("buildCSS",()=>{
	gulp.src("./src/**/*.scss")
	//.pipe(cleancss())
	.pipe(sass())
	.pipe(gulp.dest("./dist"))
})

gulp.task("buildHTML",()=>{
	gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"))
})
//处理静态资源
gulp.task("buildStaticResource",()=>{
	gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist"));
})

//gulp.watch("./src/**/*.scss",["buildCSS"]);
//添加监听事件,修改src中的html css js时 dist中对应项同时发生变化
gulp.task("watching",()=>{
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/**/*.js",["buildJS"]);
	gulp.watch("./src/**/*.html",["buildHTML"]);
})

gulp.task("webserver",["watching"],()=>{
	gulp.src("dist").pipe(webserver({
		livereload:true,
		https:true,
		port:8090,
		proxies:[
			{
				source:"/abcdefg",
				target:"https://m.lagou.com/listmore.json",
			}
		]
	}))
})

gulp.task("build",["buildJS","buildHTML","buildCSS","buildStaticResource"])

