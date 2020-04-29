/**
 * Created by wx on 2019/9/9.
 */
function registerPwd(){
    var phonestr = $("#userPhone").val(),
        pawstr = $("#userPwd").val(),
        userName = $('#userName').val(),
        zuzhi = $('select[lay-filter=zuzhi]').val();
    var obj = {
        resource:"userinfo",
        op:'update',
        data: [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }, {
            "field_name": "phoneno",
            "match": "=",
            "field_value": phonestr
        }, {
            "field_name": "username",
            "match": "=",
            "field_value": userName
        }, {
            "field_name": "organizationid",
            "match": "=",
            "field_value":$('#orgCode').val()
        }, {
            "field_name": "password",
            "match": "=",
            "field_value": pawstr
        }, {
            "field_name": "userclassify",
            "match": "=",
            "field_value": $('select[lay-filter="userclassify"] option:checked').val()
        }]
    };
    if(isNull(phonestr) && isNull(pawstr) && isNull(userName) && isNull(zuzhi)){
        layer.msg("必填项不能为空");
    }else{
        if(!checkUserName(userName)){
            layer.msg("用户名格式不正确");
        }else if(!checkphoneFormat(phonestr)){
            layer.msg("请输入正确的手机号");
        }else if(!checkPassword(pawstr)){
            layer.msg("密码必须6到12位，且不能出现空格");
        }
        else{
            registerData(obj)
        }
    }
}

//测试园长1   组织id "64cb999437ae4783a2ad6c146518f653"