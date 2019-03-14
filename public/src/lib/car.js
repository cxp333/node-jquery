	class Car {
			constructor() {
				this.url = "../shuju.json";
				this.load()
				this.remove()
			}
			load() {
				var that = this;
				$.ajax({
					url: this.url,
					type: "get",
					success: function(res) {
						that.res = res;
					 
						that.getCookie();
						
					},
					dataType: "json"
				})
			}
			getCookie() {
				this.goods =JSON.parse($.cookie("goods")) 
				
				this.display()
			}
			display() {
			
				var str = ""
				for (var i = 0; i < this.res.length; i++) {
					for (var j = 0; j < this.goods.length; j++) {
						if (this.res[i].id== this.goods[j].Id) {
							str +=
								`<tr ">
										<td><input type="checkbox"></td>
										<td><img src="${this.res[i].imgurl}"/></td>
										<td>${this.res[i].pingming}</td>
										<td>${this.res[i].yuanjia}</td>
										<td><input type="number" value="${this.goods[j].num}" min="1"></td>
										<td><em data-index="${this.res[i].id}">删除</em></td>
									</tr>`
						}
					}
				}
				
				$("tbody").html(str);
				
			}
			remove() {
				var that = this;
				$("tbody").on("click", "em", function() {
					var id = $(this).attr("data-index");
					$(this).parent().parent().remove()

					that.changeCookie(id, function(i) {
						that.goods.splice(i, 1)
					})
				})
			 }
			init() {
				var that = this;
				$("tbody").on("change", "input", function() {
					
					var id = $(this).parent().next("td").children("em").attr("data-index");
					var val = $(this).val();

					that.changeCookie(id, function(i) {
						that.goods[i].num = val
					})
				})
			}
			changeCookie(id, callback) {
				for (var i = 0; i < this.goods.length; i++) {
					if (this.goods[i].Id== id) {
						callback(i)
					}
				}
				$.cookie("goods", JSON.stringify(this.goods))
			}
		

}
		new Car()