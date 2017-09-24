/**
 * Created by acer on 2017/9/24.
 */
define(['jquery','util','form'], function ($,util) {
    util.setMenu(location.pathname);
    $("#courseBtn").click(function () {
        $("#courseForm").ajaxSubmit({
            url:'/api/course/create',
            type:'post',
            dataType:'json',
            success: function (data) {
                //console.log(data)
                if(data.code==200){
                    location.href='/course/course_basic?cs_id='+data.result.cs_id;
                }
            }

        })
    });
});