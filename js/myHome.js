/**
 * Created by brs on 2019/9/23.
 */
$('.head ul li').click(function() {
    var index = $(this).index()+1;
    $(this).addClass('active').siblings().removeClass('active');
    $(this).find('img').attr('src','images/nav-bar/icons'+index+'.png');
    if($(this).index() == 0){
        $('.head ul li').eq(1).find('img').attr('src','images/nav-bar/icon2.png');
        $('.head ul li').eq(2).find('img').attr('src','images/nav-bar/icon3.png');
        $('.head ul li').eq(3).find('img').attr('src','images/nav-bar/icon4.png');
    }else if($(this).index() == 1){
        $('.head ul li').eq(0).find('img').attr('src','images/nav-bar/icon1.png');
        $('.head ul li').eq(2).find('img').attr('src','images/nav-bar/icon3.png');
        $('.head ul li').eq(3).find('img').attr('src','images/nav-bar/icon4.png');
    }else if($(this).index() == 2){
        $('.head ul li').eq(0).find('img').attr('src','images/nav-bar/icon1.png');
        $('.head ul li').eq(1).find('img').attr('src','images/nav-bar/icon2.png');
        $('.head ul li').eq(3).find('img').attr('src','images/nav-bar/icon4.png');
    }else if($(this).index() == 3){
        $('.head ul li').eq(0).find('img').attr('src','images/nav-bar/icon1.png');
        $('.head ul li').eq(1).find('img').attr('src','images/nav-bar/icon2.png');
        $('.head ul li').eq(2).find('img').attr('src','images/nav-bar/icon3.png');
    }
})
$('.label ul li').click(function() {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if(index == 0){
        $(this).find('img').attr('src','images/title-icon/level4.png');
    }else if(index == 1){
        $(this).find('img').attr('src','images/title-icon/level3.png');
    }else if(index == 2){
        $(this).find('img').attr('src','images/title-icon/level2.png');
    }else if(index == 3){
        $(this).find('img').attr('src','images/title-icon/level1.png');
    }
    //全部0，高级1，中级2，初级3
    if($(this).index() == 0){
        $('.label ul li').eq(1).find('img').attr('src','images/title-icon/levels2.png');
        $('.label ul li').eq(2).find('img').attr('src','images/title-icon/levels3.png');
        $('.label ul li').eq(3).find('img').attr('src','images/title-icon/levels1.png');
        $('.classList ul li').show();
    }else if($(this).index() == 1){
        $('.label ul li').eq(0).find('img').attr('src','images/title-icon/levels4.png');
        $('.label ul li').eq(2).find('img').attr('src','images/title-icon/levels2.png');
        $('.label ul li').eq(3).find('img').attr('src','images/title-icon/levels1.png');
        $('.classList ul li').show().not('.senior').hide();
    }else if($(this).index() == 2){
        $('.label ul li').eq(0).find('img').attr('src','images/title-icon/levels4.png');
        $('.label ul li').eq(1).find('img').attr('src','images/title-icon/levels3.png');
        $('.label ul li').eq(3).find('img').attr('src','images/title-icon/levels1.png');
        $('.classList ul li').show().not('.middle_rank').hide();
    }else if($(this).index() == 3){
        $('.label ul li').eq(0).find('img').attr('src','images/title-icon/levels4.png');
        $('.label ul li').eq(1).find('img').attr('src','images/title-icon/levels3.png');
        $('.label ul li').eq(2).find('img').attr('src','images/title-icon/levels2.png');
        $('.classList ul li').show().not('.primary').hide();
    }
})
function sliderUp(){
    $('.box .left-nav').css("z-index",0)
    $('.head').slideUp();
    $('.sliderDown').slideDown();
}
function sliderDown(){
    $('.box .left-nav').css("z-index",1)
    $('.head').slideDown();
    $('.sliderDown').slideUp();
}
//未下载
function download(){
    layer.msg('提示下载')
}
//查看详情
function classDesc(){
    layer.msg('查看详情')
}
