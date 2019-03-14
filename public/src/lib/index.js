

	$("#delete").click(function() {
		$(".top-t").hide()
		$("html").animate({
			scrollTop: 0
		})

	})
	$("#nav").find("li").hover(function() {
		$(this).css("background", "#aaa").children(".quan").stop().slideDown().parent().siblings().css("background",
			"#ccc").children(".quan").stop().slideUp();
	}, function() {
		$(this).css("background", "#F2F2F2").children(".quan").stop().slideUp()
	})

	var oText = document.getElementById("text");
	var oSea = document.getElementById("search");
	var oUl = document.getElementById("baidu");
	oText.onkeyup = function() {
		var val = this.value;

		oSea.style.display = val ? "block" : "none";
		var os = document.createElement("script");
		os.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=xiaolong&_=1499584946110";
		document.body.appendChild(os); //当前节点中添加一个子节点
		document.onclick = function() {

			oSea.style.display = "none"
		}

	}

	function xiaolong(json) {
		oUl.innerHTML = '';
		json.s.forEach(function(data) {
			var oLi = document.createElement("li");
			oLi.innerHTML = "<a  href='https:www.baidu.com/s?wd=" + data + "'>" + data + "</a>";
			oUl.appendChild(oLi);
		}); //数组专门遍历
	}

	$(function() {
		var mySwiper = new Swiper('.swiper-container', {
			autoplay: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,

			},
		})

	});


	var $nav = $(".zuolan");

	$(window).scroll(function() {
		/** ==============================滚动到一定距离，显示楼层导航================================ */
		var scrollTop = $(this).scrollTop();
		if (scrollTop >= 1000) {
			$nav.fadeIn(500);
		} else {
			$nav.fadeOut(500);
		}

		/** ==============================根据滚动距离计算当前楼层，改变导航================================ */
		var index = Math.floor((scrollTop - 1500) / 850);
		console.log(index);
		$(".zuolan li").stop().eq(index).not('.last').addClass("active");
		$(".zuolan li").stop().eq(index).siblings().removeClass("active");
	})

	/** ==============================单击楼层导航，页面滚动到指定楼层================================ */
	$(".zuolan li:not('.last')").click(function() {
		//改变楼层导航样式
		$(this).addClass("active");
		$(this).siblings().removeClass("active");

		var index = $(this).index();
		var _top = $(".list").eq(index).position().top - 300;
		$("html").animate({
			scrollTop: _top
		});
	})

	/** ==============================回到顶部================================ */
	$(".zuolan li:last").click(function() {
		$("html").animate({
			scrollTop: 0
		}, 500);
	})

	$('#delete').on('click', function() {
		$('.top-t').hide()
		$('html,body').animate({

			scrollTop: 0
		})
	});

	$(function() {
		$(".list-t1").on("mouseenter", "li", function() {
			$(this).stop().animate({
				height: 350
			}, 100);
			$(this).stop().siblings('li').removeClass('selected'); // 删除其他li的边框样式
			$(this).addClass('selected');
		})

		$(".list-t1 li").mouseleave(function() {
			$(this).stop().animate({
				height: 279
			});

		})
	});


	// 倒计时
	var olimited = document.querySelector(".limited")

	var now = new Date(); //当前时间
	console.log(now)

	var end = new Date(2019, 2, 6, 23, 23, 59); //结束的时间：年，月，日，分，秒（月的索引是0~11）

	/*两个时间相减,得到的是毫秒ms,变成秒*/
	var balance = Math.floor(end - now) / 1000;

	document.cookie = "balance=259200"
	setInterval(function() {
		if (balance == 0) {
			balance = 259200
		} else {
			balance--
		}
		var day = parseInt(balance / 3600 / 24);
		var hour = parseInt((balance - day * 3600 * 24) / 3600);
		var min = parseInt((balance - day * 3600 * 24 - hour * 3600) / 60);
		var sec = Math.round(balance - day * 3600 * 24 - hour * 3600 - min * 60);
		olimited.innerHTML = "距离本期结束" + day + "天" + hour + "小时" + min + "分钟" + sec + "秒";
	}, 1000);

	function setCookie(key, value, day) {
		var d = new Date();
		d.setDate(d.getDate() + day);
		document.cookie = key + "=" + value + ";expires=" + d;
	}

	// 删：设置过去的日期就是删除
	function removeCookie(key) {
		setCookie(key, "asdad", -1)
	}

	// 查：根据名字，返回值
	function getCookie(key) {
		var arr = document.cookie.split("; ");
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].split("=")[0] == key) {
				return arr[i].split("=")[1]
			}
		}
		return "";
	}







