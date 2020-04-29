/**
 * Created by wx on 2019/9/11.
 */
function addClassPwd(){
    var className = $("#className").val();
    var obj = {
        "resource": "class",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }, {
            "field_name": "classname",
            "match": "=",
            "field_value": className
        }]
    }
    if(isNull(className)){
        layer.msg("班级名字不能为空");
    }else{
        addClassData(obj)
    }
}