/**
 * Created by haifang.qin on 2019/9/5.
 */

//角色信息获取
function getUserclassify() {
    var sendData = {
        "op":"get",
        "resource":getItems('userclassifyName')
    }
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            var data = response.data;
            if(data.length > 0){
                localStorage.setItem('userclassify',JSON.stringify(data))
            }else{
                layer.msg(response.msg)
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}
$('.pageOption select').change(function () {
    sessionStorage.removeItem('pagecount');
    reloadList(1, this.value);
})

$("#page").bind("selectstart", function () {
    return false;
});
function reloadList(currentPage, page) {
    var sendData = {
        "resource": "class",
        "op": "get",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }]
    }
    getUserList(sendData)
}
reloadList($('.pageOption select option:checked').val(),1);

//function page(pagenum, nowPage) {
//    $("#page").paging({
//        nowPage: nowPage, // 当前页码,默认为1
//        pageNum: Number(sessionStorage.getItem('pagecount')), // 总页码
//        buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
//        callback: function (num) { //回调函数,num为当前页码
//            reloadList(num, pagenum);
//        }
//    });
//}

//page($('.pageOption select option:checked').val(),1);
//查询班级
function getUserList(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            sessionStorage.setItem('pagecount',response.pagecount)
            var data = response.data;
            var list = '',head = '';
            if(data.length > 0){
                head += '<tr>'
                for(var i= 0;i<data.length;i++){
                    list += '<tr>';
                    for(var key in data[i]){
                        list += '<td width="100">'+data[i][key].field_value+'</td>';
                        if(i == 0){
                            head += '<th width="100">'+data[i][key].field_name+'</th>';
                        }
                    }
                    list += '<td width="40%">' +
                        '<span class="btn" data-id='+data[i][0].field_value+' onclick="delUserList('+i+')">删除</span>' +
                        '<span class="btn" id="editClass" data-id='+data[i][0].field_value+' data-name='+data[i][1].field_value+' onclick="editUserList('+i+')">修改</span>' +
                        //'<span class="btn"  roleAccess="pdq_reset" data-id='+data[i][0].field_value+' onclick="resetPwd('+i+')">重置密码</span>' +
                        '</td>'
                    list += '</tr>';
                }
                head += '<th width="200px">操作</th></tr>';
                //page($('.pageOption select option:checked').val(),'')
                $('#table thead').html(head);
                $('#table tbody').html(list);
            }else{
                layer.msg(response.msg)
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}
//删除班级
function delUserList(index) {
    var classid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    layer.confirm('确定要删除么？', {
        title:'删除班级',
        btn: ['确定','取消'] //按钮
    }, function(){
        var sendData = {
            "resource": "class",
            "op": "delete",
            "data": [{
                "field_name": "sessionid",
                "match": "=",
                "field_value": getItems('sessionid')
            }, {
                "field_name": "classid",
                "match": "=",
                "field_value": classid
            }]
        }
        $.ajax({
            url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
            type:'post',
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data:JSON.stringify(sendData),
            success:function(response){
                reloadList($('.pageOption select option:checked').val(),1)
            },
            error:function(response){
                top.ff.tips("error",response.msg);
            }
        })
        layer.msg('删除成功', {icon: 1});
    });
}
//修改班级名称
function editUserList(index){
    var classid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    var name = $('tbody tr').eq(index).find('.btn').eq(1).attr('data-name');
    layer.open({
        type: 2,
        title: '修改班级',
        content: 'editClass.html?classid='+classid+'&name='+name,
        area: ['50%', '50%'],
        yes: function (indx, layero) {
        },
        success: function (layero, indx) {
        }

    });

}