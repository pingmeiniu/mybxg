/**
 * Created by acer on 2017/9/25.
 */
define(['jquery','template','util','bootstrap','form','state'], function ($,template,util) {
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

            //添加课时操作
            $("#addLesson").click(function () {
                $("#modalInfo").html(template("modalTpl",{operate:"添加课时"}));
                $("#chapterModal").modal();

                $("#addBtn").click(function () {
                   $("#addForm").ajaxSubmit({
                       url:'/api/course/chapter/add',
                       type:'post',
                       dataType:'json',
                       data:{ct_cs_id:csId},
                       success: function (data) {
                           //console.log(data)
                           location.reload();
                       }
                   })
                });
            });
            //编辑课时操作
            $(".editLesson").click(function () {
                var ctId = $(this).attr("data-ctId");

                $.ajax({
                    url:'/api/course/chapter/edit',
                    type:'get',
                    dataType:'json',
                    data:{ct_id:ctId},
                    success: function (data) {
                        //console.log(data)
                        data.result.operate="编辑课时";
                        $("#modalInfo").html(template("modalTpl",data.result));
                        $("#chapterModal").modal();

                        $("#addBtn").click(function () {
                            $("#addForm").ajaxSubmit({
                                url:'/api/course/chapter/modify',
                                type:'post',
                                dataType:'json',
                                data:{ct_cs_id:csId,ct_id:ctId},
                                success: function (data) {
                                    //console.log(data)
                                    location.reload();
                                }
                            })
                        });

                    }
                })
            });
        }
    });
});