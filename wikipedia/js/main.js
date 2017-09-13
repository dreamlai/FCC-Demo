//维基百科API
var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';  
//创建搜索结果
function content(){
	var content1='<div class="thumbnail"><a href="" target="_blank"><img src="" title="loading..."></a></div>'
	var content2 = '<div class="detail"><a href="" target="_blank">loading...</a><p class="message"></p></div>'
	var cont= "<li>"+content1 + content2+"</li>";
	$(cont).appendTo("ul");
}
//ajax向后台获取数据
function wikipedia(api){
	   $.ajax({
	   	  url:api,
	  	   success:function(data){
	  	   	//获取不到结果时
	  	   	if(typeof(data.query) == "undefined"){
	  	   		$(".res").html("查无结果，请重新输入").show();
	  	   		return false;
	  	   	}
	  	   	//设置一个数组将pages里的id并插入数组中
	  	   	var con= [];
	  	   	for (var id in data.query.pages){
	  	   		con.push(id);
	  	   	}
	  	   	//获取结果数量并显示
	  	   	$(".res span").html(con.length);
			$(".res").show();
			//把搜索结果遍历出来
			$(con).each(function(index) {
				content();
				var page = data.query.pages[con[index]];
				var mes = page.extract;
				if(mes.length>150){
					mes=mes.slice(0,150)+"...";
				}
				var title= page.title;
				var href = "http://en.wikipedia.org/wiki/" + title;
				var li = $(".search-result ul li").eq(index);
				li.find(".detail a").html(title).attr("href",href);
				li.find(".detail p").html(mes);
				li.find(".thumbnail a").attr("href",href);
				li.find(".thumbnail a img").attr("title",title);
				try{
			                            var img = page.thumbnail.source;
			                     }catch(e){}
				li.find(".thumbnail a img").attr("src",img);
			});
			$(".loading").hide();
			$(".search-result").slideDown("slow");
			
   	  }
});
}
//搜索
$(".searchbtn").click(function() {
	var val = $("input[type=text]").val();
	if(val != ""){
		link = url+val;
		wikipedia(link);
		$(".logo").fadeOut();
		$(".search-result").hide();
		$(".search").animate({marginTop : "5px"},function(){
			$("img[src*=name]").fadeIn();
			$(".loading").show();
		});
		$("ul").empty();
		a = $("input[type=text]");
		focu(a);
	}else{
		$(".msg").show();
	}
	
});
//把键盘事件放入函数中
function focu(a) {
	a.keyup(function(event) {
		if(a.val() ==  ""){
			$(".search").animate({marginTop : "320px"},function(){
			$("img[src*=name]").fadeOut();
			$(".search-result").slideUp();
			$(".logo").fadeIn();
			$(".loading").hide();
			$(".res").hide();
		});
		}else{
			$(".msg").hide();
		}
		
	});
}
//标签加载完后给搜索框获取焦点
$(window).ready(function(){
	$("input[type=text]").focus();
	
});
//按回车键
$("input").keyup(function(event) {
	if(event.keyCode == 13){
			$(".searchbtn").trigger('click');
		}
});
$(".round").click(function(event) {
	location.href = "http://en.wikipedia.org/wiki/Special:Random";
});