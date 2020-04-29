/**
 * Created by wx on 2019/9/9.
 */
//角色信息获取
function getUserclassify() {
    var sendData = {
        "op":"get",
        "resource":'userclassify'
    }
    layui.use(['form'], function() {
        var form = layui.form;
        $.ajax({
            url: ipStr + '/paidaqi_manager_server/paidaqi_php_server.php',
            type: 'post',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(sendData),
            success: function (response) {
                var data = response.data;
                var list = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        list += '<option value="'+data[i]+'">' + data[i] + '</option>'
                    }
                    $('select[lay-filter="userclassify"]').html(list)
                    form.render()
                }
            },
            error: function (response) {
                top.ff.tips("error", response.msg);
            }
        })

    })
}
getUserclassify();
//获取所有组织
function showTree(){
    if($('.ztree').css('display') == 'none'){
        $('.ztree').css('display','block');
    } else{
        $('.ztree').css('display','none');
    }
    $("body").bind("mousedown", onBodyDownByActionType);
}
function onBodyDownByActionType(event) {
    if (event.target.id.indexOf('treeDemo') == -1){
        if(event.target.id != 'orgName'){
            hideTree();
        }
    }
}
function hideTree() {
    $('.ztree').css('display','none');
    $("body").unbind("mousedown", onBodyDownByActionType);
    return false;
}
function zTreeOnClick(event, treeId, treeNode) {
    $('#orgName').val(treeNode.name);
    $('#orgCode').val(treeNode.id)
    hideTree();
};
getOrganizationid();
var orgList =[

];
//{ id:1, pId:0, name:"父节点1 - 展开", open:true},
//{ id:11, pId:1, name:"父节点11 - 折叠"},
//{ id:111, pId:11, name:"叶子节点111"},
//{ id:112, pId:11, name:"叶子节点112"},
//{ id:113, pId:11, name:"叶子节点113"},
//{ id:114, pId:11, name:"叶子节点114"},
//{ id:12, pId:1, name:"父节点12 - 折叠"},
//{ id:121, pId:12, name:"叶子节点121"},
//{ id:122, pId:12, name:"叶子节点122"},
//{ id:123, pId:12, name:"叶子节点123"},
//{ id:124, pId:12, name:"叶子节点124"},
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    //回调
    callback: {
        onClick: zTreeOnClick
    },
    view: {
        fontCss: { fontSize: "14px" }
    }
};

function getOrganizationid(){
    var sendData = {
        op:"get",
        resource:"organizationid"
    }
    layui.use(['layer','tree'], function() {
        var layer = layui.layer
            , $ = layui.jquery;
        $.ajax({
            url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
            type:'post',
            contentType:'application/json;charset=utf-8',
            dataType:'json',
            data:JSON.stringify(sendData),
            success:function(response){
                var data = response.data;
                if(data.length > 0){
                    for(var i=0;i<data.length;i++){
                        if(data[i].length > 0){
                            var obj = {};
                            data[i].forEach(function(item,index){
                                if(index == 0){
                                    obj.name = item.field_value
                                }
                                if(index == 1){
                                    obj.id = item.field_value
                                }
                                obj.pId = (i+1) + ''+(i+1)
                            })
                            orgList.push(obj);
                        }
                    }
                    //orgList.unshift({id:11,pId:1,name:'0',open:true})
                    $.fn.zTree.init($("#treeDemo"), setting, orgList);
                }

            },
            error:function(response){
                console.log(response)
            }
        })



    })

}

/**
 * 注册API
 */
function registerData(sendData) {
    $.ajax({
        url:ipStr+'/paidaqi_manager_server/paidaqi_php_server.php',
        type:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify(sendData),
        success:function(response){
            if(response.result == 'success'){
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
                window.parent.location.reload();
            }
            parent.location.reload()

        },
        error:function(response){
            top.ff.tips("error",response.msg);
        }
    })
    layer.closeAll();
}