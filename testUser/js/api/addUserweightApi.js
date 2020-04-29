/**
 * Created by wx on 2019/9/11.
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
                    var desc = getQueryString('desc').split(',');
                    $('select[lay-filter="class"]').val(desc[3]);
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
                    var desc = getQueryString('desc').split(',');
                    $('select[lay-filter="grade"]').val(desc[4]);
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
 * 追加体重
 */
function editUserData(sendData) {
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
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
                layer.msg(response.msg);
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}

