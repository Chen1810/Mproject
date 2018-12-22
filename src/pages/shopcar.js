require(["../scripts/config.js"], function(){
	require(["jquery", "swiper","cookie"], function($,Swiper,cookie){
		//购物车
		class Shop{
				constructor(options){
					this.cont = options.cont;
					this.url = options.url;
					this.load();
				}
				load(){
					var that = this;
					$.ajax({
						url:this.url,
						success:function(res){
							that.res = res;
							that.display();
						}
					})
				}
				display(){
					var str = "";
					for(var i=0;i<8;i++){
						str += `<li class="box" index="${this.res[i].slug}">
									<img src="${this.res[i].ean}">
									<h4>${this.res[i].variant_title}</h4>
									<span>${this.res[i].price_cents}</span>
									<button>加入购物车</button>
								</li>`
					}
					this.cont.html(str);
					this.addEvent();
				}
				addEvent(){
					var that = this;
					this.cont.on("click","button",function(){
						that.id = $(this).parent().attr("index");
						that.setCookie();
					})
				}
				setCookie(){
					this.goods = JSON.parse($.cookie("goods")) || [];
					if(this.goods.length < 1){
						this.goods.push({
							id:this.id,
							num:1,
						})
					}else{
						var that = this;
						var onOff = true;
						$.each(this.goods,function(index,value){
							if(value.id == that.id){		//发现重复
								that.goods[index].num++;	//数量增加
								onOff = false;				//改变状态
							}
						})
						if(onOff){	//true		//状态未改变，说明未发现重复，那就是新的 
							this.goods.push({
								id:this.id,
								num:1,
							})
						}
					}
					$.cookie("goods",JSON.stringify(this.goods))
					console.log(JSON.parse($.cookie("goods")))
				}
			}
			new Shop({
				url:"../static/jsonp/user.json",
				cont:$("#main-b ul"),
			})

		class Car{
			constructor(options){
				this.url = options.url;
				this.tbody = options.tbody;
				this.getCookie();
				this.load();
			}
			getCookie(){
				this.goods = JSON.parse($.cookie("goods"));
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
						that.res = res;
						that.display()
					}
				})
			}
			display(){
				var str = "";
				var pay = 0;
				$.each(this.res, (key,item)=>{
					$.each(this.goods, (index,value)=>{
						if(item.slug == value.id){
							var purchase = parseInt(`${value.num}`)*parseInt(`${item.original_price_cents}`);
							pay += purchase;
							str += `<tr>
										<td><input type="checkbox" name="check" id="check" value="" /></td>
										<td><img src="${item.ean}"/>${item.variant_title}</td>
										<td class="price">${item.original_price_cents}</td>
										<td>
											<button id="less">-</button>
											<input type="text" name="num" id="num" value="${value.num}" />
											<button id="add">+</button>
										</td>
										<td class="purchase">${purchase}</td>
										<td class="del" index="${value.id}"><em>删除</em></td>
									</tr>`
						}
					});
				});        
				this.tbody.html(str);
				this.addEvent();
				$(".sum-r p:nth-child(1) span:nth-child(2)").html(pay);
			}
			addEvent(){
				var that = this;
				$(".buy").show();
				$(".sum").show();
				this.tbody.on("click","em",function(){
					$(this).parent().parent().remove()
					//找到点击的货号
					that.id = $(this).parent().attr("index");
					//删除
					var pay = $(".sum-r p:nth-child(1) span:nth-child(2)").html()
					var n2 = $(this).parent().siblings(".purchase").html()
					var n3 = parseInt(pay)-parseInt(n2);
					$(".sum-r p:nth-child(1) span:nth-child(2)").html(n3);
					
					that.setCookie(function(i){
						that.goods.splice(i,1)
					})
				})
				
				this.tbody.on("click","#less",function(){
					//获取添加到购车的商品id
					that.id = $(this).parent().siblings(".del").attr("index");
					//获取当前input框的value值
					var num = $(this).siblings("#num").val();
					//点击数量减少 至少为1
					if(num>1){
						num--;
					}else{
						num=1;
					}
					//获取减少后的value值
					$(this).siblings("#num").val(num);
					//将值赋给numb 方便设置cookie
					var numb = $(this).siblings("#num").val();
					
					var n1 = $(this).parent().siblings(".purchase").html();
					
					var price = $(this).parent().siblings(".price").html();
					var purchase = numb*price;
					
					$(this).parent().siblings(".purchase").html(purchase);
					
					var n2 = $(this).parent().siblings(".purchase").html();
					
					var pay = $(".sum-r p:nth-child(1) span:nth-child(2)").html();
					
					var n3 = parseInt(pay) - parseInt(n1) + parseInt(n2);
					$(".sum-r p:nth-child(1) span:nth-child(2)").html(n3);
					
					//修改
					that.setCookie(function(i){
						that.goods[i].num = numb;
					})
				})
				this.tbody.on("click","#add",function(){
					that.id = $(this).parent().siblings(".del").attr("index");
					var num = $(this).siblings("#num").val();
					num++;
					$(this).siblings("#num").val(num);
					var numb = $(this).siblings("#num").val();
					var n1 = $(this).parent().siblings(".purchase").html();
					var price = $(this).parent().siblings(".price").html();
					var purchase = numb*price;
					$(this).parent().siblings(".purchase").html(purchase);
					var n2 = $(this).parent().siblings(".purchase").html();
					var pay = $(".sum-r p:nth-child(1) span:nth-child(2)").html();
					var n3 = parseInt(pay) - parseInt(n1) + parseInt(n2);
					$(".sum-r p:nth-child(1) span:nth-child(2)").html(n3);
					
					that.setCookie(function(i){
						that.goods[i].num = numb;
					})
				})
				
			}
			setCookie(callback){
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						callback(i);
						break;
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
			}
		}
		
		new Car({
			url:"../static/jsonp/user.json",
			tbody:$(".tab tbody"),
		})
			
	})
})

