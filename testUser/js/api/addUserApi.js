/**
 * Created by haifang.qin on 2019/9/17.
 */
//获取班级
function getClass() {
    var sendData = {
        "resource": "class",
        "op": "get",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }]
    }
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            url: ipStr + '/paidaqi_manager_server/paidaqi_php_server.php',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(sendData),
            success: function (response) {
                var data = response.data;
                var option = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        option += '<option value="' + data[i][1].field_value + '">' + data[i][1].field_value + '</option>';
                    }
                    $('select[lay-filter="class"]').html(option);
                    form.render();
                } else {
                    layer.msg(response.msg)
                }
            },
            error: function (response) {
                top.ff.tips("error", response.msg);
            }
        })
    })
}
getClass();
//获取年级
function getGrade() {
    var sendData = {
        "resource": "grade",
        "op": "get",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }]
    }
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            url: ipStr + '/paidaqi_manager_server/paidaqi_php_server.php',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(sendData),
            success: function (response) {
                var data = response.data;
                var option = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        option += '<option value="' + data[i][1].field_value + '">' + data[i][1].field_value + '</option>';
                    }
                    $('select[lay-filter="grade"]').html(option);
                    form.render();
                } else {
                    layer.msg(response.msg)
                }
            },
            error: function (response) {
                top.ff.tips("error", response.msg);
            }
        })
    })
}
getGrade();

/**
 * 新增测试用户API
 */
function addTestuserData(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            if(response.result == 'success'){
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
                window.parent.location.reload();
            }else{
                layer.msg(response.msg)
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
    layer.closeAll();
}