require(["../scripts/config.js"], function(){
	require(["jquery", "swiper","slider","cookie"], function( $, Swiper ,slider ,cookie ){
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: true,//可选选项，自动滑动
			loop: true,
			pagination: {
			    el: '.swiper-pagination',
			    clickable: true,
			},
			navigation: {
		      	nextEl: '.swiper-button-next',
		      	prevEl: '.swiper-button-prev',
		    },
		})
		$(".swiper-container").hover(function(){
			mySwiper.autoplay.stop();
		},function(){
			mySwiper.autoplay.start();
		})
		
		//简单验证邮箱或手机号
		$("#sub").click(function(){
			let str1 = $("#user").val();
			let str2 = $("#pass").val();
			let reg1 = /^1[0-9]{10}$/;
			let reg2 = /^[a-zA-Z0-9_]{3,20}@[a-z0-9A-Z]{2,9}\.[a-z]{2,5}$/;
			let reg3 = /^[0-9]{6}$/;
			if(str1.length !=0 && str2.length != 0){
				if((reg1.test(str1) || reg2.test(str1)) && reg3.test(str2)){
					$(".message i").css("display","none");
					alert("登陆成功！欢迎您！");
				}
				else{
					$(".message i").css("display","block");
					var str3 = '<i style="display:block;color:red;">请按照提示完成验证</i>';
					if($("#slider i").length == 0){
						$(".message p:nth-child(3)").append(str3);
					}
				}
			}else{
				$(".message i").css("display","block");
				var str3 = '<i style="display:block;color:red;">请按照提示完成验证</i>';
				if($("#slider i").length == 0){
					$(".message p:nth-child(3)").append(str3);
				}
			}
		})
		
		//滑块验证
		//$(".message p:nth-child(3) span:first-child")
	    $("#slider").slider({
	        width: 300, // width
	        height: 44, // height
	        sliderBg: "#E8E8E8", // 滑块背景颜色
	        color: "rgba(0, 0, 0, 0.54)", // 文字颜色
	        fontSize: 12, // 文字大小
	        bgColor: "#33CC00", // 背景颜色
	        textMsg: "请按住滑块，拖动到最右边", // 提示文字
	        successMsg: "验证通过", // 验证成功提示文字
	        successColor: "white", // 滑块验证成功提示文字颜色
	        time: 400, // 返回时间
	    });
	    // 还原
	    $("#reset1").click(function() {
	        $("#slider1").slider("restore");
	    });
		
	})
})
