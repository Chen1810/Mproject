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

		

		//引用轮播图
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
		//鼠标划入轮播图停止 离开继续
		$(".swiper-container").hover(function(){
			mySwiper.autoplay.stop();
		},function(){
			mySwiper.autoplay.start();
		})
		//左右按钮背景效果
		$(".swiper-button-prev").hover(function(){
			$("#prev").fadeIn("normal");
		},function(){
			$("#prev").fadeOut("normal");
		})
		$(".swiper-button-next").hover(function(){
			$("#next").fadeIn("normal");
		},function(){
			$("#next").fadeOut("normal");
		})
		
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
		
		//搜索框功能
		$(".header-b-r div").on("blur","input",function(){
			var val = $(".header-b-r div input").val();
			$.ajax({
				type: "get",
				url:`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="${val}"`,
				dataType: "jsonp",
				jsonp: "cb",
				success:function(data){
					var str = "";
					for(var i = 0 ;i < data.s.length ; i++){
						str += "<li>"+data.s[i]+"</li>";
					}
					$(".search-res").html(str);
					$(".search-res").show();
					var list = $(".search-res li");
					for(var i=0;i<list.length;i++){
						$(list[i]).hover(function(){
							var item = $(this).html();
							$(".header-b-r div input").val(item);
						})
					}
					$(".header-b-r div").mouseleave(function(){
						$(".search-res").hide();
					})
					
				}
			})
			
		})
		
		
		
		
		
		
		
		//nav和news-t的数据
		$.ajax({
			url:"https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=266&tdsourcetag=s_pcqq_aiomsg",
			dataType: "jsonp",
			success: function(data){
				console.log(data)
				//nav数据填充
				let str = '';
				for(let i=0;i<data.block_266.length;i++){
					str+=`<li>
								<a href="https://store.dji.com/cn/shop/spark-series?from=menu_products">
									<img src="${data.block_266[0].floorAllocations[i].img}">
									<span>${data.block_266[0].floorAllocations[i].name}</span>
								</a>
							</li>`
				}
				$("nav.margin ul").append(str);
				//news-t数据填充
				let str1 = '';
				for(let i=0;i<3;i++){
					str1+=`<a href="./detail.html" target="_blank">
						<li data-id="${data.block_266[0].floorAllocations[i].skuid}">
							<img src="${data.block_266[0].floorAllocations[i].img}"/>
							<img src="${data.block_266[1].floorAllocations[i].img}"/>
							<img src="${data.block_266[2].floorAllocations[i].img}"/>
							<h2>灵眸 Osmo 口袋云台相机</h2>
							<div>
								<span>轻小便捷<i></i>超清画质<i></i>稳定拍摄</span>
							</div>
							<p>轻巧，便携，智能且配备独立屏幕，轻松拍摄，记录生活从此变得简单又好玩！</p>
							<span class="price">${data.skuInfo[i].skuPrice}</span>
						</li>
					</a>`
				}
				$("#news-t ul").append(str1);
				
				//点击加入购物车 存储cookie
				$("#news-t ul li").click(function(){
					$.cookie("goodsid",$(this).attr("data-id"))
				})
				//console.log($.cookie("goodsid"));
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



	})
})

