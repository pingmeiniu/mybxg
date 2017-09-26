/**
 * Created by acer on 2017/9/25.
 */
define(['jquery','template','util'], function ($,template,util) {
    util.setMenu('/course/course_add');
   var csId = util.qs('cs_id');
    $.ajax({
        url:'/api/course/lesson',
        type:'get',
        dataType:'json',
        data:{cs_id:csId},
        success: function (data) {
            //console.log(data)
            $("#lessonInfo").html(template("lessonTpl",data.result));
        }
    });
});