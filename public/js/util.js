/**
 * Created by acer on 2017/9/21.
 */
define(['jquery'],function ($) {
    return{
        qs: function (key) {
            var param = location.search.substr(1);
            var tcId = null;
            if(param){
                var ps = param.split("&");
                $.each(ps, function (i,item) {
                    var kv = item.split("=");
                    if(kv[0]==key){
                        tcId=kv[1];
                        return false;
                    }
                })
            }
            return tcId;

        },
        //给侧边导航栏设置高亮显示
        setMenu: function (path) {
            $(".aside .navs a[href='"+path+"']").addClass("active");

        }
    }
});