//把需要的js存放在config(配置).js中,设置回调函数
require(["../scripts/config.js"],function(){
	//fontscroll无回调函数 传参为undefined 可不设置
	require(["common","jquery","swiper","fontscroll"],function(com,jq,swiper){
		console.log("index ok");
	})
})
