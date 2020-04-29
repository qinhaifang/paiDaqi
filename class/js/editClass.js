/**
 * Created by wx on 2019/9/11.
 */
var className = getQueryString('name');
var classid = getQueryString('classid');
$('#className').val(className);
function editClassPwd(){
    var sendData = {
        "resource": "classname",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }, {
            "field_name": "classid",
            "match": "=",
            "field_value": classid
        }, {
            "field_name": "classname",
            "match": "=",
            "field_value": $('#className').val()
        }]
    }
    if(isNull(className)){
        layer.msg("班级名字不能为空");
    }else{
        editClassData(sendData)
    }
}