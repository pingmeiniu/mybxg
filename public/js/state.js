/**
 * Created by acer on 2017/9/27.
 */
define(['jquery'], function ($) {
    console.log(3)
    $(document).ajaxStart(function () {

        $(".overlay").show();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            $(".overlay").hide();
        },300);
    });
});