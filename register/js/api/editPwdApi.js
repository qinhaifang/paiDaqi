/**
 * Created by wx on 2019/9/10.
 */
/**
 * 修改密码API
 */
function editPwdData(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            if(response.result == 'success'){
                layer.closeAll();
                top.location.href = '../login.html';
                clearItems()
            }

        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}