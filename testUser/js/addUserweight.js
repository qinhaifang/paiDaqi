/**
 * Created by wx on 2019/9/17.
 */
layui.use(['form'], function() {
    var form = layui.form;
    var gradename = getQueryString('name');
    var gradeid = getQueryString('classid');
    var desc = getQueryString('desc').split(',');
    var num = $("#num").val(gradeid),              //身份证号/学号
        height = $('#height').val(desc[2]),        //身高
        weight = $('#weight').val(desc[1]);     //体重
    form.render();
    $('#editTestuser').click(function edittestuser(){
        var userName = $('#userName').val(),          //姓名
        height = $('#height').val(),        //身高
        weight = $('#weight').val(),     //体重
            num = $("#num").val();
        var sendData = {
            "resource": "userwh",
            "op": "insert",
            "data": [{
                "field_name": "sessionid",
                "match": "=",
                "field_value": getItems('sessionid')
            }, {
                "field_name": "id",
                "match": "=",
                "field_value": num
            }, {
                "field_name": "weight",
                "match": "=",
                "field_value": weight
            }, {
                "field_name": "height",
                "match": "=",
                "field_value": height
            }]
        }
        if(isNull(num)){
            layer.msg("身份证/学号不能为空");
        }else{
            editUserData(sendData)
        }
    })
})