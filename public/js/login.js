/**
 * Created by acer on 2017/9/19.
 */
define(['jquery','cookie'],function ($) {
    $('#loginBtn').click(function(){
        $.ajax({
            type : 'post',
            url : '/api/login',
            data : $('#loginForm').serialize(),
            dataType : 'json',
            success : function(data){
                //console.log(data.result)
                if(data.code == 200){
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
//                    console.log($.cookie());
                    // 登录成功，跳转到主页面
                    location.href = '/main/index';
                }
            }
        });
        return false;// 阻止默认行为
    });
});