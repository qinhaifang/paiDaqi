/**
 * Created by haifang.qin on 2019/9/5.
 */
//获取所有组织
function getOrganizationid(){
    var sendData = {
        op:"get",
        resource:"organizationid"
    }
    //$.send({
    //    url: ipStr + "/paidaqi_manager_server/paidaqi_php_server.php",
    //    type:'post',
    //    contentType:'Access-Control-Allow-Origin',
    //    data: sendData,
    //    success: function (data) {
    //
    //    }
    //});
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
            type:'post',
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data:JSON.stringify(sendData),
            success:function(response){
                var data = response.data;
                var list = '';
                if(data.length > 0){
                    for(var i=0;i<data.length;i++){
                        list += '<option value="'+data[i].field_name+'">'+data[i].field_value+'</option>'
                    }
                    $('select[lay-filter="zuzhi"]').html(list)
                }
            },
            error:function(response){
                console.log(response)
            }
        })
        form.render()

    })

}

/**
 * 登录API
 */
function loginData(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            var data = response.data;
            if(response.result == 'fail'){
                layer.msg(response.msg)
            }else{
                if(data.length > 0){
                    localStorage.setItem('userLogin',JSON.stringify(data));
                    localStorage.setItem('userclassify',data[0].field_value);
                    localStorage.setItem('sessionid',data[4].field_value);
                    localStorage.setItem('userid',data[2].field_value);
                    localStorage.setItem('userclassifyName',data[0].field_name);
                    window.location.href = "myHome.html";
                }
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}
//判断权限

/**
 * 注册API
 */
function registerData(sendData) {
    window.location.href = "myHome.html";
    //$.send({
    //    url:"/v2/sys/table_jjr_user/regist_account",
    //    // self:getSrcElement(),
    //    loadingType: '1',
    //    data: sendData,
    //    success:function(data){
    //        if(data.status.code == 200){
    //            $("#fhsj").val(data.result.id);
    //        }else {
    //            top.ff.tips("error",data.status.msg);
    //        }
    //    }
    //})
}






