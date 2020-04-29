/**
 * Created by haifang.qin on 2019/9/5.
 */
sessionStorage.removeItem('pagecount');
var initData = {
    sessionid: getItems('sessionid'),
    userclassify: getItems('userclassify'),
    userclassifyName: getItems('userclassifyName')
}
// if (isNull(getItems('sessionid'))) {
//     window.location.href = 'login.html'
// }

layui.use('table', function () {
    var table = layui.table;
})

//注册
$('#register').click(function(){
    layer.open({
        type: 2,
        title: '添加新用户',
        content: 'register/register.html',
        area: ['50%', '60%'],
        yes: function (indx, layero) {

        },
        success: function (layero, indx) {

        }

    });
})
//修改密码
$('#editPwd').click(function(){
    layer.open({
        type: 2,
        title: '修改密码',
        content: 'register/editPwd.html',
        area: ['40%', '40%'],
        yes: function (indx, layero) {

        },
        success: function (layero, indx) {

        }

    });
})
//退出登录
$('#loginOut').click(function(){
    layer.confirm('确定要退出当前账户么？', {
        title:'退出登录',
        btn: ['确定','取消'] //按钮
    }, function(){
        loginOutData()
    })
})
//重置密码
function resetPwd(index){
    var userid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    layer.open({
        type: 2,
        title: '重置密码',
        content: 'register/reset.html?userid='+userid,
        area: ['40%', '40%'],
        yes: function (indx, layero) {
            layer.close(index);
        },
        success: function (layero, indx) {

        }

    });
}
//上传文件
layui.use('upload', function() {
    var $ = layui.jquery
        , upload = layui.upload;
//指定允许上传的文件类型
    upload.render({
        elem: '#test3'
        , url: ipStr+'/paidaqi_manager_server/paidaqi_excel_import.php'
        , accept: 'file' //普通文件
        , done: function (res) {
            console.log(res)
        }
    });
})




