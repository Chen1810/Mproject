
let gulp = require("gulp");
let uglify = require("gulp-uglify"); //压缩模块
let babel = require("gulp-babel"); //ES6的编译模块
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");
let sass = require("gulp-sass"); //编译SCSS到CSS
let imagemin = require("gulp-imagemin");

gulp.task("buildJS",()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js")
		.pipe( gulp.dest("./dist/scripts/libs") )	
	//编译压缩复制 有点问题
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
            presets: ['env']
        }))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/scripts") )
})

gulp.task("buildCSS", ()=>{
	gulp.src("./src/styles/*.scss")
		// .pipe(cleancss())
		.pipe(sass().on('error',sass.logError))
		.pipe(sass())
		.pipe( gulp.dest("./dist/styles") )
	gulp.src("./src/css/*.css").pipe(cleancss()).pipe(gulp.dest("./dist/css"))
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/pages/*.*").pipe( gulp.dest("./dist/pages") );
})

gulp.task("buildStaticResource", ()=>{
	gulp.src("./src/static/fonts/*.*").pipe( gulp.dest("./dist/static/fonts") );
	gulp.src("./src/images/*.*").pipe( imagemin() ).pipe( gulp.dest("./dist/images") );
	gulp.src("./src/static/jsonp/*.*").pipe( gulp.dest("./dist/static/jsonp") );
})

gulp.task("watching", ()=>{
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/pages/*.*", ["buildHTML"]);
});

const webpack = require("webpack-stream");

gulp.task("webpackJS",()=>{
	webpack({
		mode: "development",  //模式
		entry: ["./src/webpack/app.js"],  //配置入口文件，打包时webpack从哪个文件开始读取
		output: {
		  	filename: 'app.js', //打包生产后的文件名称
		},
		module:{
				rules:  [
				{
					test: /\.js$/,   //匹配.js文件
					exclude: /(node_modules|bower_components)/,   //将node_modules里的JS排除
				  	use: {  //配置babel-loader用来编译ES6、7语法
						loader: 'babel-loader',  
						options: {
							presets: ['@babel/preset-env']
						}
				  	}
				},
				{
					test: /\.scss$/,   //匹配.js文件
				  	use: ["style-loader","css-loader","sass-loader"]
				},
			]
		}
	}).pipe(gulp.dest("./src/webpack/dist"))
})

//yintao01分支下的修改
gulp.task('webserver', ["watching"], function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true, //是否支持热部署
			port:8090,
			https: true,      //
			proxies : [
				{	
					source: '/abcdefg', 
					target: 'https://m.lagou.com/listmore.json'
				},
				{
					source: '/userinfo',
					target: 'https://nbrecsys.4paradigm.com/api/v0/recom/recall?requestID=pmKC7kYD&userID=u3FFkObPEe&sceneID=34'
					
				}
			]
		}));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS", "buildStaticResource"])