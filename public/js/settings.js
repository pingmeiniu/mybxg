/**
 * Created by acer on 2017/9/22.
 */
define(['jquery','template','uploadify','region'], function ($,template) {
    $.ajax({
        url:'/api/teacher/profile',
        type:'get',
        dataType:'json',
        success: function (data) {
            if(data.code==200){
                //console.log(data)
                $("#settingsInfo").html(template("settingsTpl",data.result));

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

                $("#pcd").region({
                    url:'/public/assets/jquery-region/region.json'
                });
            }
        }
    });
});