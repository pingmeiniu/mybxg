/**
 * Created by acer on 2017/9/21.
 */
define(['jquery','template','util','datepicker','language','validate','form'],function ($,template,util) {
   var tcId = util.qs('tc_id');
    if(tcId){
        $.ajax({
           url:'/api/teacher/edit',
            type:'get',
            dataType:'json',
            data:{tc_id:tcId},
            success: function (data) {
                data.result.operate='编辑讲师';
                $("#teacherInfo").html(template("teacherTpl",data.result));
                //submitForm('/api/teacher/update');
                submitForm('/api/teacher/update');
            }
        });
    }else{
        $("#teacherInfo").html(template("teacherTpl",{operate:"添加讲师"}));
        submitForm('/api/teacher/add');
    }

    function submitForm(url){
        $("#teacherForm").validate({
            sendForm:false,
            valid: function () {
               $(this).ajaxSubmit({
                   url:url,
                   type:"post",
                   dataType:"json",
                   //data:$("#teacherForm").serialize(),
                   success: function (data) {
                       //console.log(data);
                       if(data.code==200){
                           location.href="/teacher/teacher_list";
                       }
                   }
               });
            },
            description:{
                tcName:{
                    required:'用户名不能为空'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'密码必须是6位数字'
                },
                tcJoinDate:{
                    required:'日期不能为空'
                }
            }
        });
    }
});