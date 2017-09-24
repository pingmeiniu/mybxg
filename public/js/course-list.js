/**
 * Created by acer on 2017/9/24.
 */
define(['jquery','util','template'], function ($,util,template) {
    util.setMenu(location.pathname);
    $.ajax({
        url:'/api/course',
        type:'get',
        dataType:'json',
        success: function (data) {
            //console.log(data)
            $("#courselistInfo").html(template("courselistTpl",data));
        }
    })
});