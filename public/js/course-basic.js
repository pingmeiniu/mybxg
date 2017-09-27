/**
 * Created by acer on 2017/9/24.
 */
define(['jquery','util','template','validate','form','state'], function ($,util,template) {
    util.setMenu('/course/course_add');
    var csId = util.qs('cs_id');
    var flag = util.qs('flag');
    $.ajax({
        url:'/api/course/basic',
        type:'get',
        dataType:'json',
        data:{cs_id:csId},
        success: function (data) {
            if(flag){
                data.result.operate="编辑课程";
            }else{
                data.result.operate="保存课程";
            }
            //console.log(data)
            $("#courseInfo").html(template("courseTpl",data.result));

            // 根据一级分类的ID查询所有的二级分类数据
            $("#firstType").change(function () {
                var cgId = $(this).val();
                $.ajax({
                    url:'/api/category/child',
                    type:'get',
                    dataType:'json',
                    data:{cg_id:cgId},
                    success: function (data) {
                        //console.log(data)
                        var tpl = '<option value="">请选择</option>{{each result}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                        $("#secondType").html(template.render(tpl,data));
                    }
                })
            });

            $("#basicForm").validate({
                sendForm:false,
                valid: function () {
                    $(this).ajaxSubmit({
                        url:'/api/course/update/basic',
                        type:'post',
                        dataType:'json',
                        data:{cs_id:csId},
                        success: function (data) {
                            //console.log(data)
                            if(data.code==200){
                                location.href='/course/course_picture?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }
            })
        }
    });
});