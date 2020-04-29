/**
 * Created by haifang.qin on 2019/9/16.
 */
$('.pageOption select').change(function () {
    sessionStorage.removeItem('pagecount');
    reloadList(1, this.value);
})

$("#page").bind("selectstart", function () {
    return false;
});
function reloadList(currentPage, page) {
    var sendData = {
        "resource": "testuser",
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
                        list += '<td>'+data[i][key].field_value+'</td>';
                        if(i == 0){
                            head += '<th>'+data[i][key].field_name+'</th>';
                        }
                    }
                    list += '<td>' +
                        '<span class="btn" data-id='+data[i][0].field_value+' onclick="delUserList('+i+')">删除</span>' +
                        '<span class="btn" id="editClass" data-id='+data[i][0].field_value+' data-name='+data[i][1].field_value+' data-desc='+data[i][2].field_value+','+data[i][3].field_value+','+data[i][4].field_value+','+data[i][5].field_value+','+data[i][6].field_value+' onclick="editUserList('+i+')">修改用户信息</span>' +
                        '<span class="btn"  roleAccess="pdq_reset" data-id='+data[i][0].field_value+' onclick="addWeight('+i+')">体重追加</span>' +
                        '</td>'
                    list += '</tr>';
                }
                head += '<th>操作</th></tr>';
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
    var userid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    var name = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    layer.confirm('确定要删除么？', {
        title:'删除班级',
        btn: ['确定','取消'] //按钮
    }, function(){
        var sendData = {
            "resource": "testuser",
            "op": "delete",
            "data": [{
                "field_name": "sessionid",
                "match": "=",
                "field_value": getItems('sessionid')
            }, {
                "field_name": "userid",
                "match": "=",
                "field_value": userid
            }]
        }
        $.ajax({
            url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
            type:'post',
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data:JSON.stringify(sendData),
            success:function(response){
                if(response.result == 'success'){
                    layer.msg('删除成功', {icon: 1});
                    reloadList($('.pageOption select option:checked').val(),1)
                }else{
                    layer.msg(response.msg)
                }
            },
            error:function(response){
                top.ff.tips("error",response.msg);
            }
        })

    });
}
//修改测试用户信息
function editUserList(index){
    var gradeid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    var gradename = $('tbody tr').eq(index).find('.btn').eq(1).attr('data-name');
    var desc = $('tbody tr').eq(index).find('.btn').eq(1).attr('data-desc');
    layer.open({
        type: 2,
        title: '修改测试用户信息',
        content: 'editUser.html?classid='+gradeid+'&name='+gradename+'&desc='+desc,
        area: ['50%', '50%'],
        yes: function (indx, layero) {
        },
        success: function (layero, indx) {
        }

    });
}
//体重追加
function addWeight(index){
    var gradeid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    var gradename = $('tbody tr').eq(index).find('.btn').eq(1).attr('data-name');
    var desc = $('tbody tr').eq(index).find('.btn').eq(1).attr('data-desc');
    layer.open({
        type: 2,
        title: '用户体重追加',
        content: 'addUserweight.html?classid='+gradeid+'&name='+gradename+'&desc='+desc,
        area: ['50%', '50%'],
        yes: function (indx, layero) {
        },
        success: function (layero, indx) {
        }

    });
}