/**
 * Created by haifang.qin on 2019/9/5.
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
        "resource": "userlist",
        "op": "get",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": initData.sessionid
        }, {
            "field_name": "pagecount",
            "match": "=",
            "field_value": page
        }]
    };
    getUserList(sendData)
}
reloadList($('.pageOption select option:checked').val(),1);

function page(pagenum, nowPage) {
    $("#page").paging({
        nowPage: nowPage, // 当前页码,默认为1
        pageNum: Number(sessionStorage.getItem('pagecount')), // 总页码
        buttonNum: 7, //要展示的页码数量，默认为7，若小于5则为5
        callback: function (num) { //回调函数,num为当前页码
            reloadList(num, pagenum);
        }
    });
}

page($('.pageOption select option:checked').val(),1);
//查询用户
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
                        list += '<td>'+ strTipsEr(data[i][key].field_value,20)+'</td>';
                        if(i == 0){
                            head += '<th>'+ strTipsEr(data[i][key].field_name,20) +'</th>';
                        }
                    }
                    list += '<td>' +
                        '<span class="btn" data-id='+data[i][0].field_value+' onclick="delUserList('+i+')">删除</span>' +
                        //'<span class="btn" data-id='+data[i][0].field_value+' onclick="editUserList('+i+')">修改</span>' +
                        '<span class="btn"  roleAccess="pdq_reset" data-id='+data[i][0].field_value+' onclick="resetPwd('+i+')">重置密码</span>' +
                        '</td>'
                    list += '</tr>';
                }
                head += '<th>操作</th></tr>';
                page($('.pageOption select option:checked').val(),sendData.data[1].field_value)
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
//删除用户接口
function delUserList(index) {
    var userid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    layer.confirm('确定要删除么？', {
        title:'删除',
        btn: ['确定','取消'] //按钮
    }, function(){
        var sendData = {
            "resource": "userinfo",
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
                reloadList($('.pageOption select option:checked').val(),1)
            },
            error:function(response){
                top.ff.tips("error",response.msg);
            }
        })
        layer.msg('删除成功', {icon: 1});
    });
}
//修改用户信息
function editUserList(index){
    var userid = $('tbody tr').eq(index).find('.btn').eq(0).attr('data-id');
    var sendData = {
        "resource": "usersession",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }]
    }
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){

        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
    layer.msg('删除成功', {icon: 1});
}

//退出登录
function loginOutData(){
    var sendData = {
        "resource": "usersession",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }]
    }
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
           parent.location.href = 'login.html'
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}