/**
 * Created by wx on 2019/9/11.
 */
/**
 * 新增班级API
 */
function addGradeData(sendData) {
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
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
    layer.closeAll();
}