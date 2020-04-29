/**
 * Created by brs on 2019/9/23.
 */
/**
 * 课程列表API
 */
var color1s = [1,2,3,4],num1 =0;
var color2s = [5,6,7,8],num2 =0;
var color3s = [9,10,11,12],num3 =0;

function courselist() {
    var sendData = {"op":"get","resource":"courselist"}
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            var data = response.data;
            var list = '';
            if(response.result == 'fail'){
                layer.msg(response.msg)
            }else{
                if(data.length > 0){
                    for(var i=0;i<data.length;i++){
                        for(var key in data[i]){
                            if(data[i][key].field_value == '初级课程'){
                                if(num1 >= 4){
                                    num1 = 0
                                }
                                list += "<li class='primary primary"+color1s[num1%color1s.length]+"'><div><span class='level'><img src='images/icon/icon"+color1s[num1%color1s.length]+"-level1.png'  width='60px' height='60px'></span><span class='hasDown'>已下载</span></div><span class='title'>"+data[i][1].field_value+"</span><small class='desc' onclick='classDesc(\""+data[i][7].field_value+"\",\""+data[i][1].field_value+"\")'>点击查看</small><span class='del' onclick='del(\""+data[i][0].field_value+"\")'><img src='images/icon/icon"+color1s[num1%color1s.length]+"-del.png'  width='40px' height='40px' ></span><div class='clear'></div> </li>";
                                num1 ++;
                            }else if(data[i][key].field_value == '中级课程'){
                                if(num2 >= 4){
                                    num2 = 0
                                }
                                list += "<li class='middle_rank middle_rank"+color2s[num2%color2s.length]+"'> <div> <span class='level'><img src='images/icon/icon"+color2s[num2%color2s.length]+"-level2.png' alt='' width='60px' height='60px'></span> <span class='hasDown'>已下载</span> </div> <span class='title'>"+data[i][1].field_value+"</span> <small class='desc' onclick='classDesc(\""+data[i][7].field_value+"\",\""+data[i][1].field_value+"\")'>点击查看</small> <span class='del' onclick='del(\""+data[i][0].field_value+"\")'><img src='images/icon/icon"+color2s[num2%color2s.length]+"-del.png'  width='40px' height='40px' alt=''></span> <div class='clear'></div> </li>"
                                num2 ++;
                            }else if(data[i][key].field_value == '高级课程'){
                                if(num3 >= 4){
                                    num3 = 0
                                }
                                list +="<li class='senior senior"+color3s[num3%color3s.length]+"'><div> <span class='level'><img src='images/icon/icon"+color3s[num3%color3s.length]+"-level3.png' alt='' width='60px' height='60px'></span> <span class='hasDown'>已下载</span> </div> <span class='title'>"+data[i][1].field_value+"</span> <small class='desc' onclick='classDesc(\""+data[i][7].field_value+"\",\""+data[i][1].field_value+"\")'>点击查看</small> <span class='del' onclick='del(\""+data[i][0].field_value+"\")'><img src='images/icon/icon"+color3s[num3%color3s.length]+"-del.png'  width='40px' height='40px' alt=''></span> <div class='clear'></div> </li>"
                                list +="<li class='nohasDown'> <div> <span class='level'><img src='images/icon/primarys.png' alt='' width='60px' height='60px'></span> <span class='hasDown'>未下载</span> </div> <span class='title'>课程名称</span> <small class='desc'>点击查看</small> <span class='del' onclick='download(\""+data[i][13].field_value+"\")'><img src='images/icon/downs.png'  width='30px' height='30px' alt='' style='left: 5px;'></span> <div class='clear'></div> </li>"
                            }
                        }
                    }
                    list += "<div class='clear'></div>";
                    $('.classList ul').html(list)
                }
            }
        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
}
courselist()
function classDesc(src,name){
    $('#video source').attr('src',src).show();
    layer.open({
        type: 1,
        title: name+'视频',
        content: $('#video'),
        area: ['500px', '400px'],
        yes: function (indx, layero) {
        },
        success: function (layero, indx) {
        },
        end: function(){
            $('#video').hide();
        }

    });
}
//删除
function del(id){
    layer.msg('删除'+id)
}