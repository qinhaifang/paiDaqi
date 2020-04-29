/**
 * Created by wx on 2019/9/11.
 */
var gradename = getQueryString('name');
var gradeid = getQueryString('classid');
$('#gradename').val(gradename);
function editClassPwd(){
    var sendData = {
        "resource": "gradename",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }, {
            "field_name": "gradeid",
            "match": "=",
            "field_value": gradeid
        }, {
            "field_name": "gradename",
            "match": "=",
            "field_value": $('#gradename').val()
        }]
    }
    if(isNull(gradename)){
        layer.msg("年级名字不能为空");
    }else{
        editClassData(sendData)
    }
}