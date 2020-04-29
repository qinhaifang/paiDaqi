/**
 * Created by wx on 2019/9/10.
 */
/**
 * 高权限用户重置密码
 */
function resetPwdData(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
           if(response.result == 'fail'){
               layer.msg(response.msg);
           }else{
               if(sendData.data[1].field_value == getItems('userid')){
                   parent.location.href = '../login.html'
               }else{
                   layer.msg('重置成功', {icon: 1});
                   var index = parent.layer.getFrameIndex(window.name);
                   parent.layer.close(index);
                   window.parent.location.reload();
               }
           }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
            layer.msg(response.msg)
        }
    })

}

//914bc12ed43711e98dec00163e3005fb