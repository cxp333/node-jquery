$(function(){
			
			class Page{
				constructor(options){
					this.pageCont = options.pageCont;
					this.list = options.list;
					this.url = options.url;
					this.num = options.num;
					this.index = options.index;
					this.load()
				}
				load(){
					var that = this;
					$.ajax({
						type:"get",
						url:this.url,
						success:function(res){
							that.res = res;
							that.createPage()
						
						},
						dataType:"json"
					})
				}
				display(){
					var str = "";
					for(var i=this.index * this.num;i<this.index * this.num + this.num;i++){
						if(i<this.res.length){
							str += `<li>
									<div class="img" data-id="${this.res[i].id}">
									<img src="${this.res[i].imgurl}">
									</div>
									<div class="detail">
										${this.res[i].pinming}
										<span class="price">特价$${this.res[i].yuanjia}</span>
									     <em  class="shopping-buy-btn" style="display:block;color:red">加入购物车</em>
									</div>
								</li>`;
						}
					}
					this.list.html(str)
					this.init();
				}
				init(){
					var that=this;
					that.goods=[];
					$("#list").on("click","em",function(){
						var goodsId=$(this).parent().siblings().attr("data-id");
		                    
						if(!$.cookie("goods")){

						that.goods.push({
							Id:goodsId,
							num:1
						})
						$.cookie("goods",JSON.stringify(that.goods))
					}else{

						that.goods = JSON.parse($.cookie("goods"));

						var onOff = false;
						for(var i=0;i<that.goods.length;i++){
							if(that.goods[i].Id == goodsId){
								that.goods[i].num++
								onOff = true;
							}
						}

						if(!onOff){
							that.goods.push({
								Id:goodsId,
								num:1
							})
						}
						$.cookie("goods",JSON.stringify(that.goods));
					}
					console.log($.cookie("goods"))
					})
					
				}
				createPage(){
					var that = this;
					this.pageCont.pagination(this.res.length,{
						items_per_page:this.num,
						current_page:this.index,
						callback:function(i){
							that.index = i;
							that.display();
						}
					})
				}
			}
			
			new Page({
				pageCont:$(".pagination"),
				list:$(".list").children("ul"),
			    url:"../shuju.json",
				num:20,
				index:0,
			})
			
		
			
			
		})
		