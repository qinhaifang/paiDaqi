/**
 * Created by wx on 2019/9/11.
 */
layui.use(['form'], function() {
    var form = layui.form;
    var gradename = getQueryString('name');
    var gradeid = getQueryString('classid');
    var desc = getQueryString('desc').split(',');
    var num = $("#num").val(gradeid),              //身份证号/学号
        userName = $('#userName').val(gradename),          //姓名
        height = $('#height').val(desc[2]),        //身高
        weight = $('#weight').val(desc[1]),     //体重
        usersex = $('select[lay-filter="usersex"]').val(desc[0]);  //性别
    form.render();
    $('#editTestuser').click(function edittestuser(){
        var userName = $('#userName').val(),          //姓名
        usersex = $('select[lay-filter="usersex"]').val(),   //性别
        grade = $('select[lay-filter="grade"]').val(),   //年级
        classs = $('select[lay-filter="class"]').val();  //班级
        height = $('#height').val(),        //身高
        weight = $('#weight').val(),     //体重
        usersex = $('select[lay-filter="usersex"]').val(),
            num = $("#num").val();
        var sendData = {
            "resource": "testuser",
            "op": "update",
            "data": [{
                "field_name": "sessionid",
                "match": "=",
                "field_value": getItems('sessionid')
            }, {
                "field_name": "id",
                "match": "=",
                "field_value": num
            }, {
                "field_name": "username",
                "match": "=",
                "field_value": userName
            }, {
                "field_name": "usersex",
                "match": "=",
                "field_value": usersex
            }, {
                "field_name": "weight",
                "match": "=",
                "field_value": weight
            }, {
                "field_name": "height",
                "match": "=",
                "field_value": height
            }, {
                "field_name": "class",
                "match": "=",
                "field_value": classs
            }, {
                "field_name": "grade",
                "match": "=",
                "field_value": grade
            }]
        }
        if(isNull(num)){
            layer.msg("身份证/学号不能为空");
        }else{
            editUserData(sendData)
        }
    })
})