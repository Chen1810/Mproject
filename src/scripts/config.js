//设置requirejs的配置文件
requirejs.config({
	//浏览器中基本路径为："https://xxxxxx/scripts/"
	baseUrl : "../scripts/",
	//设置每个js对应的key value
	//有链接关系的都需要设置
	paths : {
		"jquery" : "jquery-1.9.0",
		"swiper" : "swiper",
		"common" : "common",
		"fontscroll" : "fontscroll",
		"a" : "a",
		"b" : "b",
	}
});