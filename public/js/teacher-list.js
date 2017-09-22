/**
 * Created by acer on 2017/9/19.
 */
define(['jquery','template','bootstrap'],function ($,template) {
    $.ajax({
        url:"/api/teacher",
        type:"get",
        dataType:"json",
        success: function (data) {
            $("#teacherInfo").html(template("teacherTpl",data));

            //禁用注销功能
            $(".eod").click(function () {
                var that = $(this);
                var tcId = $(this).parent().attr("data-id");
                var tcStatus = $(this).parent().attr("data-status");
                //console.log(tcId)
                $.ajax({
                   url:"/api/teacher/handle",
                    type:"post",
                    data:{tc_id:tcId,tc_status:tcStatus},
                    dataType:"json",
                    success: function (data) {
                        if(data.code==200){

                            //console.log(data);
                            that.parent().attr("data-status",data.result.tc_status);
                            if(data.result.tc_status==0){
                                that.text("注 销");
                            }else{
                                that.text("启 用");
                            }
                        }

                    }
                });
            });

            //查看讲师功能
            $(".preview").click(function () {
                //
                var tcId = $(this).parent().attr("data-id");
                $.ajax({
                   url:"/api/teacher/view",
                    type:"get",
                    data:{tc_id:tcId},
                    success: function (data) {
                        if(data.code==200){
                            //console.log(data)
                            $("#modalInfo").html(template("modalTpl",data));
                            //bootstrap中的方法，显示弹窗
                            $("#teacherModal").modal();
                        }
                    }
                });
            });
        }
    });
});