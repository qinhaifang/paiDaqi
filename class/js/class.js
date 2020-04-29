/**
 * Created by haifang.qin on 2019/9/11.
 */
sessionStorage.removeItem('pagecount');
var initData = {
    sessionid: getItems('sessionid'),
    userclassify: getItems('userclassify'),
    userclassifyName: getItems('userclassifyName')
}
if (isNull(getItems('sessionid'))) {
    window.location.href = 'login.html'
}

layui.use('table', function () {
    var table = layui.table;
})

//新增班级
$('#addClass').click(function(){
    layer.open({
        type: 2,
        title: '新增班级',
        content: 'addClass.html',
        area: ['50%', '50%'],
        yes: function (indx, layero) {
        },
        success: function (layero, indx) {
        }

    });
})





