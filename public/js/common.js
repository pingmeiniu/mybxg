define(['jquery','template','cookie'],function ($,template) {
	//NProgress.start();
    //
	//NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//console.log("a");
	$("#logoutBtn").click( function () {
		//console.log("a");
		$.ajax({
			url:'/api/logout',
			type:'post',
			dataType:'json',
			success: function (data) {
				if(data.code==200){
					location.href='/main/login';
				}
			}
		});
	});
	var flag = $.cookie("PHPSESSID");
	if(!flag && location.pathname!='/main/login'){
		location.href="/main/login";
	}
	var loginInfo = $.cookie("loginInfo");
	loginInfo = loginInfo&&JSON.parse(loginInfo);
	var tpl ='<div class="avatar img-circle"><img src={{tc_avatar}}></div><h4>{{tc_name}}</h4>';
	var html = template.render(tpl,loginInfo);

	$(".aside .profile").html(html);
	/*$(".aside .profile div img").attr("src",loginInfo.tc_avatar);
	$(".aside .profile h4").text(loginInfo.tc_name);*/
});






