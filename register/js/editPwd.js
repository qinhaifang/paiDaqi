/**
 * Created by wx on 2019/9/9.
 */
function editPwd(){
    var pawstr = $("#userPwd").val(),
        pawstrs = $("#userPwds").val(),
        newuserPwd = $('#newuserPwd').val();
    var obj = {
        resource:"userpassword",
        op:'update',
        data: [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        },{
            "field_name": "password",
            "match": "=",
            "field_value": pawstr
        }]
    };
    if(isNull(pawstr) && isNull(pawstrs) && isNull(newuserPwd)){
        layer.msg("密码不能为空");
    }else{
         if(!checkPassword(pawstr)){
            layer.msg("密码必须6到12位，且不能出现空格");
        }
        else{
             if(pawstrs == newuserPwd){
                 editPwdData(obj)
             }else{
                 layer.msg('两次密码输入不一致')
             }

        }
    }
}