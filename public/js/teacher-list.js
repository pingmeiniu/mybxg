/**
 * Created by acer on 2017/9/19.
 */
define(['jquery','template'],function ($,template) {
    $.ajax({
        url:"/api/teacher",
        type:"get",
        dataType:"json",
        success: function (data) {
            $("#teacherInfo").html(template("teacherTpl",data));
        }
    });
});