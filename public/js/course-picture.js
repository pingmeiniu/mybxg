/**
 * Created by acer on 2017/9/25.
 */
define(['jquery','template','util','uploadify','jcrop','form'], function ($,template,util) {
    util.setMenu('/course/course_add');
    var csId = util.qs('cs_id');
    $.ajax({
        url:'/api/course/picture',
        type:'get',
        dataType:'json',
        data:{cs_id:csId},
        success: function (data) {
            console.log(data)
            $("#pictureInfo").html(template("pictureTpl",data.result));

            $("#myfile").uploadify({
                width:80,
                height:'auto',
                buttonText:'选择图片',
                buttonClass:'btn btn-success btn-sm',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess: function (a,b) {
                    var obj = JSON.parse(b);
                    //console.log(b)
                    $(".preview img").attr("src",obj.result.path);
                    cropImage();
                    $('#cropBtn').text('保存图片').attr('data-flag',true);
                }

            });
            var img = $(".preview img");
            var nowCrop = null;
            $("#cropBtn").click(function () {
                var flag = $(this).attr("data-flag");
                if(flag){
                    $("#cropForm").ajaxSubmit({
                        url:'/api/course/update/picture',
                        type:'post',
                        dataType:'json',
                        data:{cs_id:csId},
                        success: function (data) {
                            //console.log(data)
                            if(data.code==200){
                                location.href='/course/course_lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                }else{
                    $(this).text("保存图片").attr("data-flag",true);
                    cropImage();
                }
            });

            function cropImage(){
                img.Jcrop({
                    aspectRatio:2,
                    //setSelect:[100,100,150,150]
                }, function () {
                    //避免产生重复的裁切实例
                    nowCrop&&nowCrop.destory();
                    nowCrop=this;

                    this.initComponent('Thumbnailer',{width:240,height:120,mythumb:'.thumb'});

                    //创建一个位于图片中间的初始化选区
                    //获取上传的图片的宽度和高度
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;

                    var x = 0;
                    var y = (height-width/2)/2;
                    var w = width;
                    var h = width/2;
                    this.newSelection();
                    this.setSelect([x,y,w,h]);

                    $('.jcrop-thumb').css({
                        top : 0,
                        left : 0
                    });

                    img.parent().on("cropstart cropmove cropend", function (a,b,c) {
                        var inputs = $("#cropForm").children();
                        //console.log(c)
                        inputs.eq(0).val(c.x);
                        inputs.eq(1).val(c.y);
                        inputs.eq(2).val(c.w);
                        inputs.eq(3).val(c.h);
                    });
                });


            };
        }
    })
});