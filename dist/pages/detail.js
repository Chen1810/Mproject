require(["../scripts/config.js"], function(){
	require(["jquery", "swiper","cookie"], function($,Swiper,cookie){
		
		//购物车下拉菜单
		$(".header-t-r ul li:nth-child(1)").hover(function(){
			$(this).find("p").show();
		},function(){
			$(this).find("p").hide();
		})
		
		//商品分类下拉菜单
		$(".header-b-c ul li.classify").hover(function(){
			$("li.classify #listmenu").css("display","block");
			$("#list1").css("display","block");
			$("#list1 ul li:nth-child(1) dl").css("display","block");
			$("#list1 ul li:nth-child(1)").siblings().find("dl").css("display","none");
			var list1 = $("#list1 ul li");
			for(let i=0;i<list1.length;i++){
				$(list1[i]).hover(function(){
					$(this).find("dl").show();
					$(this).siblings().find("dl").hide();
				},function(){
					$(this).find("dl").hide();
					$("#list1 ul li:nth-child(1) dl").css("display","block");
				})
			}
		},function(){
			$("li.classify #listmenu").hide();
			$("#list1").hide();
		})
		
		//使用场景下拉菜单
		$(".header-b-c ul li.usescene").hover(function(){
			$("li.usescene #listmenu").css("display","block");
			$("#list2").css("display","block");
			$("#list2 ul li:nth-child(1) dl").show();
			$("#list2 ul li:nth-child(1)").siblings().find("dl").hide();
			var list2 = $("#list2 ul li");
			for(var i=0;i<list2.length;i++){
				$(list2[i]).hover(function(){
					$(this).find("dl").show();
					$(this).siblings().find("dl").hide();
				},function(){
					$(this).find("dl").hide();
					$("#list2 ul li:nth-child(1) dl").show();
				})
			}
		},function(){
			$("li.usescene #listmenu").css("display","none");
			$("#list2").css("display","none");
		})
		
		//放大镜	
		$(function(){
			//鼠标进入和划出
			$("#smallImg").hover(function(){
				$("#smallCursor").show();
				$("#bigCursor").show();
			},function(){
				$("#smallCursor").hide();
				$("#bigCursor").hide();
			})
			$("#smallImg").on("mousemove", function(e){
				//大图小图的比例	
				$("#smallCursor").width( $("#bigCursor").width()/$("#bigImg").width()*$("#smallImg").width() );
				$("#smallCursor").height( $("#bigCursor").height()/$("#bigImg").height()*$("#smallImg").height() );
				
				var scale = $("#bigImg").height()/$("#smallImg").height();
				var _left = e.pageX - $(this).offset().left - $("#smallCursor").width()/2;
				var _top = e.pageY - $(this).offset().top - $("#smallCursor").height()/2;
				$("#smallCursor").css({
					left: Math.min(Math.max(0, _left), $("#smallImg").width()-$("#smallCursor").width()), 
					top:  Math.min(Math.max(0, _top), $("#smallImg").height()-$("#smallCursor").height())
				})
				$("#bigImg").css({
					left : -$("#smallCursor").position().left*scale,
					top : -$("#smallCursor").position().top*scale
				})
			})
		})
		
		//版本切换
		$(".detail-b-r ul li:nth-child(3) dl dd").click(function(){
			$(this).css({
                "background": "rgba(68,168,242,.1)",
                "border": "2px solid rgba(68,168,242,.5)",
            }).siblings().css({
            	"background": "rgba(255,255,255,1)",
            	"border": "1px solid #EEE",
            })
            $(".detail-b-r ul li:nth-child(3) dl dt").css("border","none");
		})
		//选择套装
		$(".detail-b-r ul li:nth-child(4) p").click(function(){
			$(this).css({
                "background": "rgba(68,168,242,.1)",
                "border": "2px solid rgba(68,168,242,.5)",
            }).siblings().css({
            	"background": "rgba(255,255,255,1)",
            	"border": "1px solid #EEE",
            })
            $(".detail-b-r ul li:nth-child(4) h3").css("border","none");
		})
		//产品概览与包装清单切换
		$(".list1 a.te").hover(function(){
			$('.list1 div:nth-child(2)').show();
			$(".list1 div:nth-child(3)").show();
			$(".list2 div:nth-child(2)").hide();
		})
		$(".list2 a.te").hover(function(){
			$(".list2 div:nth-child(2)").show();
			$(".list1 div:nth-child(2)").hide();
			$(".list1 div:nth-child(3)").hide();
		})
		
		//商品详情菜单scroll
		
		
		
		
		//回到顶部效果
		$('#top').hide();        //隐藏top按钮
        $(window).scroll(function(){
        	//698可以自己设定
            if($(this).scrollTop() > 698){
                $('#top').fadeIn();
           	}else{
                $('#top').fadeOut();
            }
         });
		$("#top").click(function(){
			$('html,body').animate({scrollTop:0},'slow');
		});
		
	
		//引用本地json数据
		//商品分类列表
		$.ajax({
			url:"../static/jsonp/user.json",
//			dataType: "json",
			success: function(data){
				//商品分类下拉菜单
				let str = '';
				for(let i=0;i<13;i++){
					str+=`<li class="${data[i].slug}">
					<a href="#">${data[i].product_title}<span>></span></a>
			 		</li>`
				}
				$("#list1 ul").append(str);
				
				//商品分类子菜单1
				let str1 = "";
				for(var i=0;i<5;i++){
					str1 += `<dd>
			<a href="#"><img src="${data[i].ean}" />
									<span>${data[i].product_title}</span></a>
							</dd>`
				}
				let dl1 = '<dl><dt>"御" Mavic 2 <a href="https://store.dji.com/cn/category/mavic-2?from=menu_products" style="color:#007AFF;">查看所有</a></dt></dl>';
				$("#list1 ul li:nth-child(1)").append(dl1);
				$("#list1 ul li:nth-child(1) dl").append(str1);
				//商品分类子菜单2
				let str2 = "";
				for(var i=0;i<3;i++){
					str2 += `<dd>
			<a href="#"><img src="${data[i].ean}" />
									<span>${data[i].variant_title}</span></a>
							</dd>`
				}
				let dl2 = '<dl class="item1"><dt>"御" Mavic 2 <a href="https://store.dji.com/cn/category/mavic-2?from=menu_products" style="color:#007AFF;">查看所有</a></dt></dl>';
				$("#list1 ul li:nth-child(1)").append(dl2);
				$("#list1 ul li:nth-child(1) dl.item1").append(str2);
				$("#list1 ul li:nth-child(2)").append(dl2);
				$("#list1 ul li:nth-child(2) dl.item1").append(str2);
				//商品分类子菜单3
				let str3 = "";
				for(var i=0;i<2;i++){
					str3 += `<dd>
			<a href="#"><img src="${data[i].ean}" />
									<span>${data[i].product_title}</span></a>
							</dd>`
				}
				let dl3 = '<dl class="item2"><dt>"御" Mavic 2 <a href="https://store.dji.com/cn/category/mavic-2?from=menu_products" style="color:#007AFF;">查看所有</a></dt></dl>';
				$("#list1 ul li:nth-child(1)").append(dl3);
				$("#list1 ul li:nth-child(1) dl.item2").append(str3);
			}
		})
		
		//使用场景列表
		$.ajax({
			url:"../static/jsonp/user.json",
			success: function(data){
				//使用场景列表下拉菜单
				let str = '';
				for(let i=0;i<5;i++){
					str+=`<li class="${data[i].slug}">
					<a href="#">${data[i].product_title}<span>></span></a>
			 		</li>`
				}
				$("#list2 ul").append(str);
				//使用场景列表下拉子菜单
				let str1 = "";
				for(var i=0;i<4;i++){
					str1 += `<dd>
			<a href="#"><img src="https://product4.djicdn.com/uploads/sku/covers/30934/small_beceb8fe-c7d6-41c9-9d36-e6b608c7f059.png" />
									<span>${data[i].product_title}</span></a>
							</dd>`
				}
				var dl1 = `<dl>
								<dt>
									<a href="#">
										<img src="https://stormsend1.djicdn.com/stormsend/uploads/fbea7f00-d356-0135-d3dd-12530322f90d/store-menu-scene-traveling-outdoor.jpg" />
										<p>旅行/户外</p>
									</a>
								</dt>${str1}
							</dl>`;
				var dl2 = `<dl>
					<dt>
						<a href="#">
							<img src="https://stormsend1.djicdn.com/stormsend/uploads/06650050-d357-0135-36b6-12528100fbe3/store-menu-scene-filming.jpg" />
							<p>影视拍摄</p>
						</a>
					</dt>${str1}
				</dl>`;
				$("#list2 ul li:nth-child(1)").append(dl1);
				$("#list2 ul li:nth-child(2)").append(dl2);
			}
		})
		
		//底部菜单列表
		$.ajax({
			url:"../static/jsonp/user.json",
			success: function(data){
				console.log(data);
				//商城热卖列表
				let str = '';
				for(let i=0;i<7;i++){
					str +=`<dd><a target="_blank" href="/cn/shop/mavic-series?from=footer_hot_mavic">${data[i].product_title}</a></dd>`
				}
				var dl = `<dl>
							<dt>${data[0].on_sale}</dt>${str}
						</dl>`
				$("#footer-m ul li:nth-child(1)").append(dl);
				//购买指南列表
				$("#footer-m ul li:nth-child(3)").append(dl);
				//商城项目列表
				let str1 = '';
				for(let i=2;i<10;i++){
					str1 +=`<dd><a target="_blank" href="/cn/shop/mavic-series?from=footer_hot_mavic">${data[i].product_title}</a></dd>`
				}
				var dl1 = `<dl>
							<dt>${data[1].on_sale}</dt>${str1}
						</dl>`
				$("#footer-m ul li:nth-child(2)").append(dl1);
				//大疆社区列表
				let str2 = '';
				for(let i=2;i<5;i++){
					str2 +=`<dd><a target="_blank" href="/cn/shop/mavic-series?from=footer_hot_mavic">${data[i].product_title}</a></dd>`
				}
				var dl2 = `<dl>
							<dt>${data[3].on_sale}</dt>${str2}
						</dl>`
				$("#footer-m ul li:nth-child(4)").append(dl2);
			}
		})
		
		//购物车对应切换
		$.ajax({
			url:"https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266&tdsourcetag=s_pcqq_aiomsg",
			dataType: "jsonp",
			success: function(data){
				console.log(data)
				let goodsid = $.cookie("goodsid");
				
				$(".detail-b-l #smallImg").css({
						"background":`url(https://openfile.meizu.com/group1/M00/06/C4/Cgbj0FvQPnmABVZHAAM7MXAlUiQ783.png)`,
						"background-size": "450px 300px",
					});
				$(".detail-b-l #bigImg").attr("src","https://openfile.meizu.com/group1/M00/06/C4/Cgbj0FvQPnmABVZHAAM7MXAlUiQ783.png");
				
				//获取cookie以及它的相关信息 渲染到页面中去
				for(var i=0;i<data.block_266[0].floorAllocations.length;i++){
					if(goodsid == data.block_266[0].floorAllocations[i].skuid){
						$(".detail-b-l #smallImg").css({
							"background":`url(${data.block_266[0].floorAllocations[i].img})`,
							"background-size": "450px 300px",
						});
						$(".detail-b-l #bigImg").attr("src",data.block_266[0].floorAllocations[i].img);
					}
				}
				
				//添加详情图片到ul中
				let str1 = '';
				for(let i=0;i<7;i++){
					str1+=`<li>
							<img src="${data.block_266[0].floorAllocations[i].img}" />
						</li>`
				}
				$(".detail-b-l ul").append(str1);
				
				//商品详情图片切换效果
				$(".detail-b-l ul li").click(function(){
					//将当前电极的li下标存到i中
					var i = $(this).index();
					//改变当前点击li的样式 清除其兄弟元素样式
					$(this).css({"border":"1px solid #007AFF","opacity":"1"}).siblings().css({"border":"1px solid #ccc","opacity":"0.5"});
					//将请求数据li的img的src 赋给box的img的src
					$(".detail-b-l #smallImg").css({
						"background":`url(${data.block_266[0].floorAllocations[i].img})`,
						"background-size": "450px 300px",
					});
					$(".detail-b-l #bigImg").attr("src",data.block_266[0].floorAllocations[i].img);
					
				})
			}
		})
		
	})
})

