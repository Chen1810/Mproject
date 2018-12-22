require(["../scripts/config.js"], function(){
	require(["jquery", "swiper","slider","cookie"], function($, Swiper, slider,cookie){
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
		
		//选择手机注册
		$(".chose a:nth-child(1)").click(function(){
			$(".phone").css("display","block");
			$(".email").css("display","none");
		})
		//选择邮箱注册
		$(".chose a:nth-child(2)").click(function(){
			$(".email").css("display","block");
			$(".phone").css("display","none");
		})
		//注册验证
		class Regsiter{
			constructor(){
				this.sub = $("#sub");
				this.next = $("#next");
				this.user = $("#user");
				this.email = $("#email");
				this.pass = $("#pass");
				this.rpass = $("#rpass");
				this.addEvent()
			}
			addEvent(){
				var that = this;
				this.next.on("click",function(){
					that.userV = that.user.val();
					that.setCookie();
				})
				this.sub.on("click",function(){
					that.emailV = that.email.val();
					that.passV = that.pass.val();
					that.rpassV = that.rpass.val();
					that.setCookie();
				})
			}
			setCookie(){
//				读取初始cookie,用来查看是否是第一次注册
				if($.cookie("infos")){
					this.infos = JSON.parse($.cookie("infos"))
				}else{
					this.infos = []
				}
//				如果第一次注册,之前没有,那么length小于1
				if(this.infos.length < 1){
					this.infos.push({
						user:this.userV,
						email:this.emailV,
						pass:this.passV,
						rpass:this.rpassV,
						onoff:1
					})
				}else{
//					之前已经注册过
					var that = this;
					var onOff = true;
					$.each(this.infos,function(index,value){
						if(value.user == that.userV || value.email == that.emailV){		//发现重复
							alert("用户名重复");
							onOff = false;				//改变状态
						}
					})
					if(onOff){
						this.infos.push({
							user:this.userV,
							email:this.emailV,
							pass:this.passV,
							rpass:this.rpassV,
						})
					}
				}
				$.cookie("infos",JSON.stringify(this.infos))
			}
		}
		new Regsiter()
		
		//滑块验证
		//$(".message p:nth-child(3) span:first-child")
	    $(".phone #slider").slider({
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
		
		$(".email #slider").slider({
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