/**
 * Created by acer on 2017/9/24.
 */
define(['jquery','util','template'], function ($,util,template) {
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

            $("#firstType").change(function () {
                var cgId = $(this).val();
                $.ajax({
                    url:'/api/category/child',
                    type:'get',
                    dataType:'json',
                    data:{cg_id:cgId},
                    success: function (data) {
                        //console.log(data)
                        var tpl = '<option value="">请选择</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                        $("#seconeType").html(template.render(tpl,{list:data.result}));
                    }
                })
            });
        }
    });
});