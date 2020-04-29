/**
 * Created by wx on 2019/9/11.
 */
function addGrade(){
    var gradename = $("#gradename").val();
    var obj = {
        "resource": "grade",
        "op": "update",
        "data": [{
            "field_name": "sessionid",
            "match": "=",
            "field_value": getItems('sessionid')
        }, {
            "field_name": "gradename",
            "match": "=",
            "field_value": gradename
        }]
    }
    if(isNull(gradename)){
        layer.msg("年级名字不能为空");
    }else{
        addGradeData(obj)
    }
}