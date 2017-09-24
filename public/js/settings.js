/**
 * Created by acer on 2017/9/22.
 */
define(['jquery','template','ckeditor','uploadify','region','validate','form','datepicker','language'], function ($,template,CKEDITOR) {
    $.ajax({
        url:'/api/teacher/profile',
        type:'get',
        dataType:'json',
        success: function (data) {
            if(data.code==200){
                //console.log(data)
                $("#settingsInfo").html(template("settingsTpl",data.result));
                //上传头像功能
                $("#upfile").uploadify({
                    width : 120,
                    height : 120,
                    buttonText : '',
                    itemTemplate : '<span></span>',
                    swf : '/public/assets/uploadify/uploadify.swf',
                    uploader : '/api/uploader/avatar',
                    fileObjName : 'tc_avatar',
                    onUploadSuccess : function(a,b){
                        var obj = JSON.parse(b);
                        $('.preview img').attr('src',obj.result.path);
                    }
                });
                //三级联动
                $("#pcd").region({
                    url:'/public/assets/jquery-region/region.json'
                });
                //个人介绍富文本
                CKEDITOR.replace('editor',{
                    toolbarGroups : [
                        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
                    ]
                });

                //更新个人资料表单提交
                $("#settingsForm").validate({
                    sendForm:false,
                    valid: function () {
                        var p = $("#p").children("option:selected").text();
                        var c = $("#c").children("option:selected").text();
                        var d = $("#d").children("option:selected").text();
                        var hometown = p+"|"+c+"|"+d;

                        // 更新富文本内容
                        for(var instance in CKEDITOR.instances){
                            CKEDITOR.instances[instance].updateElement();
                        }

                        $(this).ajaxSubmit({
                            url:'/api/teacher/modify',
                            type:'post',
                            dataType:'json',
                            data:{tc_hometown:hometown},
                            success: function (data) {
                                //console.log(data);
                                if(data.code==200){
                                    location.reload();
                                }
                            }

                        })
                    }

                })
            }
        }
    });
});