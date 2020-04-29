/**
 * Created by wx on 2019/9/6.
 */
//服务器IP地址
var ipOldStr ="http://test.odfly.com";
// var ipStr = "http://fq.pms.efanghang.com";    //正式服务器
// var ipStr = "http://test.fqweb.pms.efanghang.com";   //测试地址
//var ipStr = "http://test.pms.zuzhuwang.com";   //测试地址
var ipStr = "http://10.0.0.104:52001" //老葛本地测试地址
//var ipStr = "http://101.201.68.241:8080" //李斌本地测试地址
// var ipStr = "http://pre.pms.efanghang.com";   //预上线地址
// var wechatId = "00e6edfa7c254b4d98e2b1aa82c74286";  //99的微信号
// var wechatId = "c4a9324c872a491a8ed3eb06c9bb29f2"; //95的微信号
// var wechatId = "cbb69477f9134c23ab086c3949fa2e28";
//-----------------------------------------------------------
//图片上传IP地址
var picIpStr = "http://test.wechat.zuzhuwang.com"; //测试地址
//var picIpStr = "http://wechat.zuzhuwang.com"; //正式地址

//-----------------------------------------------------------
// //     关于公司需要修改的参数                               \
// //                                                          \
// //项目公司电话                                              \
// var gcPhone = "";//                                       \
// //                                                          \
// //判断是哪种项目                                            \
// // var prjectType = 'isJizhong';//集中                      \
// // var prjectType = 'isFensan';//分散                       \
// var prjectType = 'isXm';//集中加分散                     \
// //                                                          \
// //集中底部商务合作电话                                      \
// var hezuoPhone = "400100000";//                         \
// //                                                          \
// var gcid = "0100099"; //                                 \
// //                                                          \
// var cityCode = "010";//                                  \
// //                                                          \
// var cityName = "北京市";//                               \
// //                                                          \
// var cityLng = "116.404262";//                           \
// //                                                          \
// var cityLat = "39.9135";//                               \
// //                                                          \
// var currentJJRUser = "JJRUser";//                       \
// //                                                          \
// // 微信id                                                   \
// var wechatId = "0d8151c8989f4c18991a56eaf9c2a70b";// \
// //                                                          \
// //支付地址                                                  \
// var payUrl = "http://www.efanghang.com/fqXin/wap/perCenter/bookPay.html"; // \
// //-----------------------------------------------------------

//-----------------------------------------------------------
//     关于公司需要修改的参数                               \
//                                                          \
//项目公司电话                                              \
var gcPhone = "";//                                       \
//                                                          \
//判断是哪种项目                                            \
// var prjectType = 'isJizhong';//集中                      \
// var prjectType = 'isFensan';//分散                       \
var prjectType = 'isXm';//集中加分散                     \
//                                                          \
//集中底部商务合作电话                                      \
var hezuoPhone = "4009609108";//                         \
//                                                          \
var gcid = "0351088"; //                                 \
//                                                          \
var cityCode = "0351";//                                  \
//                                                          \
var cityName = "太原市";//                               \
//                                                          \
var cityLng = "112.571631";//                           \
//                                                          \
var cityLat = "37.745167";//                               \
//                                                          \
var currentJJRUser = "JJRUser";//                       \
//                                                          \
// 微信id                                                   \
var wechatId = "9712c9c38c7b4cbc954b8c44e9ce273c";// \
//                                                          \
//支付地址                                                  \
var payUrl = "http://www.efanghang.com/fqXin/wap/perCenter/bookPay.html"; // \
//-----------------------------------------------------------



var serverUrl = "http://free.pms.efanghang.com";
var $url = window.location.origin;   //获取服务器请求地址


/**
 * 检查权限
 */
checkAccess();
function checkAccess() {
    if (!isNull(getItemsObj(currentJJRUser)) && getItemsObj(currentJJRUser).accountName != "admin") {
        var roleAccessList = $("body").find("*[roleAccess]");
        $(roleAccessList).hide();
        var systemResourcesList = getItemsObj(currentJJRUser).systemResourcesList;
        for (var i = 0; i < roleAccessList.length; i++) {
            if (systemResourcesList.length > 0) {
                for (var j = 0; j < systemResourcesList.length; j++) {
                    if ($(roleAccessList.get(i)).attr("roleAccess") == systemResourcesList[j]["mark"]) {
                        $(roleAccessList.get(i)).show();
                        break;
                    } else {
                        if (j == systemResourcesList.length - 1) {
                            $(roleAccessList.get(i)).remove();
                        }
                    }
                }
            }
        }
    }
}
/**
 * 禁用右键查看源码
 * @returns {boolean}
 */
$(document).ready(function(){
    $(document).bind("contextmenu",function(e){
        return false;
    });
    $("*").keydown(function (e) {//判断按键
        e = window.event || e || e.which;
        if (e.keyCode == 112 || e.keyCode == 113
            || e.keyCode == 114 || e.keyCode == 115
            || e.keyCode == 117
            || e.keyCode == 118 || e.keyCode == 119
            || e.keyCode == 120 || e.keyCode == 121
            || e.keyCode == 122 || e.keyCode == 123) {
            e.keyCode = 0;
            return false;
        }
    });
});
/**
 * rem布局
 */
(function(doc,win){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function(){
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 375) + "px";
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document,window)
/**
 * 显示指定div，点击其它则隐藏
 */
$(document).bind("click", function (e) {
    if ($(getSrcElement()).parents("div[isShowTarget=true]").length == 0) {
        $(document).find("div[isShowTarget]").attr("isShowTarget", "false").hide();
    }
    if(!isNull( $(getSrcElement()).attr("targetScope"))){
        $(getSrcElement()).parents($(getSrcElement()).attr("targetScope")).find($(getSrcElement()).attr("showTarget")).attr("isShowTarget", "true").show();
    }else{
        $($(getSrcElement()).attr("showTarget")).attr("isShowTarget", "true").show();
    }
});
/**
 * 获取源对象，解决火狐与谷歌兼容
 * @type {Event}
 */
function getEvent(){
    if(document.all)
        return window.event;
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0){
            if((arg0.constructor==Event || arg0.constructor==MouseEvent)
                || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}
function getSrcElement(){
    return getEvent().srcElement||getEvent().target;
}
/**
 * 格式化字符串，超出部分...
 * @param arg1
 * @param length
 */
function strTips(arg1, length) {
    var $val = arg1;
    if (length) {
        $val = arg1.substr(0, length) + "...";
    }
    var $tip = '<tip alt="' + arg1 + '" onmouseover="mouseTips(this)">' + $val + '</tip>';
    return $tip;
}
function mouseTips($this) {
    layui.layer.tips($($this).attr("alt"), $this, {
        tips: [3, '#01AAED'],
        time: 0
    });
    $($this).unbind("mouseout");
    $($this).mouseout(function () {
        layui.layer.closeAll("tips");
    });
}
function mouseTip($this) {
    layui.layer.tips($($this).html(), $this, {
        tips: [3, '#01AAED'],
        time: 0
    });
    $($this).unbind("mouseout");
    $($this).mouseout(function () {
        layui.layer.closeAll("tips");
    });
}
/**
 * 判断某个值是否为空，为空返回true，否则返回false
 * @param value  传入参数
 * @returns {boolean}
 */
function isNull(value) {
    if ($.trim(value).length == 0 || $.trim(value) == "undefined" || $.trim(value) == "" || $.trim(value) == "null") {
        return true;
    }
    return false;
}
//如果字符串为null则转换为指定提示信息
function strFormat(arg1, tipMsg) {
    try {
        if (isNull(arg1)) {
            if (isNull(tipMsg)) {
                return "";
            }
            return tipMsg;
        }
        return (arg1 + "").replace(/<[^>]+>/g, "");
    } catch (e) {
        return "";
    }
}


//----------------------在iframe中获取指定页面对象 end--------------------
/**
 * 获取URL地址参数
 * @param name  参数名称
 * @param url  url地址，如果为空，默认是当前地址
 * @returns {string}
 */
function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == "") {
        url = window.location.href;
    }
    url = url.substring(url.indexOf("?"));
    r = url.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return "";
}
/**
 * 获取父页面URL地址参数
 * @param name  参数名称
 * @param url  url地址，如果为空，默认是当前地址
 * @returns {string}
 */
function getParentQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == "") {
        url = parent.document.location.href;
    }
    url = url.substring(url.indexOf("?"));
    r = url.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return "";
}
/**
 * 获取地址栏参数并转码
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null) return decodeURI(r[2]);
    return null;
}
function ChangeURLParm(Turl, Parm, PValue, ClearParm) {
//Turl: 网址
//Parm： 参数
//PValue： 参数值
//ClearParm: 要清除的参数
    var URL, Parms, ParmsArr, IsExist;
    var NewURL = Turl;//window.location.href
    IsExist = false;
    with (Turl) {
        if (indexOf('?') > 0) {
            URL = substr(0, indexOf('?'));//不包含参数
            Parms = substr(indexOf('?') + 1, length);//参数
        }
        else {
            URL = Turl;
            Parms = '';
        }
    }
    if (Parms != '') {
        var i;
        ParmsArr = Parms.split("&");
        for (i = 0; i <= ParmsArr.length - 1; i++) {
            if (String(Parm).toUpperCase() == String(ParmsArr[i].split("=")[0]).toUpperCase()) {//原来有参数Parm则改变其值
                ParmsArr[i] = Parm + "=" + PValue;
                IsExist = true;
                if (String(ClearParm) == "") {
                    break;
                }
            }
            else if ((String(ClearParm) != "") && (String(ClearParm).toUpperCase() == String(ParmsArr[i].split("=")[0])).toUpperCase()) {//去掉参数ClearParm的值
                ParmsArr[i] = ClearParm + "=";
            }
        }

        for (i = 0; i <= ParmsArr.length - 1; i++) {
            if (i == 0) {
                Parms = ParmsArr[i];
            }
            else {
                Parms = Parms + "&" + ParmsArr[i];
            }
        }
        NewURL = URL + "?" + Parms;
        if (!IsExist) {
            NewURL = NewURL + "&" + Parm + "=" + PValue;
        }
    }
    else {
        NewURL = URL + "?" + Parm + "=" + PValue;
    }
    return NewURL;
}

/**
 * 设置items 缓存
 * @param name
 * @param value
 */
function setItems(name, value) {
    if (window.localStorage) {
        window.localStorage.setItem(name, value);
    } else {
        setCookie(name, value);
    }
}
/**
 * 获取items 缓存
 * @param name key值
 * @returns {string}
 */
function getItems(name) {
    var value = "";
    if (window.localStorage) {
        value = window.localStorage.getItem(name);
    } else {
        value = getCookie(name);
    }
    return value;
}
/**
 * 获取items 缓存
 * @param name key值
 * @returns {string}
 */
function getItemsClear(name) {
    var value = "";
    if (window.localStorage) {
        value = window.localStorage.getItem(name);
    } else {
        value = getCookie(name);
    }
    delItems(name);
    return value;
}

/**
 * 设置items 缓存
 * @param name
 * @param obj
 */
function setItemsObj(name, obj) {
    obj = JSON.stringify(obj);
    if (window.localStorage) {
        window.localStorage.setItem(name, obj);
    } else {
        setCookie(name, obj);
    }
}
/**
 * 获取items 缓存
 * @param name key值
 * @returns {obj}
 */
function getItemsObj(name) {
    var obj = "";
    if (window.localStorage) {
        obj = window.localStorage.getItem(name);
    } else {
        obj = getCookie(name);
    }
    if(obj){
        obj = JSON.parse(obj);
    }

    return obj;
}
/**
 * 获取items 缓存
 * @param name key值
 * @returns {obj}
 */
function getItemsObjClear(name) {
    var obj = "";
    if (window.localStorage) {
        obj = window.localStorage.getItem(name);
    } else {
        obj = getCookie(name);
    }
    obj = JSON.parse(obj);
    delItems(name);
    return obj;
}
/**
 * 删除itemss 缓存
 * @param name key值
 */
function delItems(name) {
    if (window.localStorage) {
        window.localStorage.removeItem(name);
    } else {
        delCookie(name);
    }

}
/**
 * 清空items缓存
 */
function clearItems() {
    try {
        window.localStorage.clear();
    } catch (e) {
        clearCookie();
    }

}
//休眠
function sleep(n) { //n表示的毫秒数
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}
//清空
function trim(s) {
    return s.replace(/[ ]/g, "")
}
/**
 * 打开一个窗体
 * @param url
 * @param name
 * @param width
 * @param height
 */
function windowOpen(url, name, width, height) {
    var top = parseInt((window.screen.height - height) / 2, 10), left = parseInt((window.screen.width - width) / 2, 10),
        options = "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes," +
            "resizable=yes,scrollbars=yes," + "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    window.open(url, name, options);
}
/**
 * cookie操作
 * @param name
 * @param value
 * @param options
 * @returns {*}
 */
function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}
/**
 * 数字前补0
 * @param num
 * @param n
 * @returns {*}
 */
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
/**
 * 检查表单提交字段非空判断
 * @param formObj  表单对象ID 不局限任何html标签
 * @returns {boolean}  返回true 表示验证通过
 */
function checkField(formObj) {
    if (isNull(formObj)) {
        return true;
    }
    //1.获取所有必填对象
    var objList = $(formObj).find("*[mustField]");
    if (objList.length > 0) {
        for (var i = 0; i < objList.length; i++) {
            //2.判断对象类型
            var obj = $(objList[i]);
            if (obj.is('input')) {
                //单行文本框-必填
                //3.获取当前遍历对象值判断是否为空
                if (isNull(obj.val())) {
                    //返回结果 如果为空 把mustFiled中的类容显示出来，并返回 return false
                    obj.focus();//获取焦点、
                    layer.tips(obj.attr("mustField"), obj, {
                        tips: [3, '#FF784E']
                    });
                    return false;
                }
            } else if (obj.is('select')) {
                //下拉列表-必填
                if (isNull(obj.val()) || obj.val() < 0) {
                    layer.msg(obj.attr("mustField"));
                    return false;
                }
            } else if (obj.is('textarea')) {
                //多行文本框-必填
                if (isNull(obj.val())) {
                    layer.msg(obj.attr("mustField"));
                    obj.focus();//获取焦点
                    return false;
                }
            }
        }
    }
    return true;
}
//json参数封装
function toRequestData(data) {
    return "data=" + encodeURI(JSON.stringify(data));
}
jQuery.send = function (dataArg) {
    var host = (dataArg.host == null || dataArg.host == "" || typeof(dataArg.host) == "undefined") ? ipStr : dataArg.host;
    var url = dataArg.url;
    if (url.indexOf("http://") < 0) {
        url = host + url;
    }
    var async = (dataArg.async == null || dataArg.async == "" || typeof(dataArg.async) == "undefined") ? "true" : dataArg.async;//是同步请求还是异步请求
    var type = (dataArg.type == null || dataArg.type == "" || typeof(dataArg.type) == "undefined") ? "post" : dataArg.type;//请求类型
    var dataType = (dataArg.dataType == null || dataArg.dataType == "" || typeof(dataArg.dataType) == "undefined") ? "json" : dataArg.dataType;//返回格式
    var data = (dataArg.data == null || dataArg.data == "" || typeof(dataArg.data) == "undefined") ? {"sendDate": new Date().getTime()} : dataArg.data;//请求数据
    var self = (dataArg.self == null || dataArg.self == "" || typeof(dataArg.self) == "undefined") ? "" : dataArg.self;//点击发送请求对象
    var isLoading = (dataArg.isLoading == null || dataArg.isLoading == "" || typeof(dataArg.isLoading) == "undefined") ? "false" : dataArg.isLoading;//是否需要加载动画
    var loadingType = (dataArg.loadingType == null || dataArg.loadingType == "" || typeof(dataArg.loadingType) == "undefined") ? "" : dataArg.loadingType;//是否需要加载动画
    var dataJson = {
        userid: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id,
        token: strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token,
        gcid: gcid,
        params: data
    };
    //如果子参数中包含gcid，则子参数值自动覆盖上一级相同参数值
    if (!(data.gcid == null || data.gcid == "" || typeof(data.gcid) == "undefined")) {
        dataJson.gcid = data.gcid;
    }
    //禁止同时发送多次重复请求
    if (!isNull(self)) {
        if ($(self).attr("isClick") == "false") {
            //结束本次请求
            return;
        } else {
            $(self).attr("isClick", "false");
        }
    }
    $.ajax({
        type: type,
        async: async,
        data: JSON.stringify(dataJson),
        // data:  new Base64().encode(JSON.stringify(dataJson)), //加密
        url: url,
        dataType: dataType,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "text/javascript;charset=UTF-8");
            xhr.setRequestHeader("Request-Type", "body");
            xhr.setRequestHeader("gcid", gcid);
            xhr.setRequestHeader("token", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).token);
            xhr.setRequestHeader("userid", strFormat(getItemsObj(currentJJRUser)) == "" ? "" : getItemsObj(currentJJRUser).id);

            //加载层-默认风格
            if (isLoading == "true") {
                layer.load(0, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            }
            //加载前
            if (dataArg.beforeSend == null || dataArg.beforeSend == "" || typeof(dataArg.beforeSend) == "undefined") {
            } else {
                dataArg.beforeSend(xhr);
            }
            // loadingType{1:当前对象左边加载,2:当前对象上方加载,3:当前对象右方加载，4：当前对象下方加载}
            if (!isNull(self) && loadingType == "1") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            } else if (!isNull(self) && loadingType == "2") {
                $(self).html('<i class="fa fa-spinner fa-spin" style="color: #FFFFFF;"></i>' + $(self).html());
            }
        },
        success: function (d) {
            //加载成功
            if (dataArg.success == null || dataArg.success == "" || typeof(dataArg.success) == "undefined") {
            } else {
                dataArg.success(d);
            }
        },
        error: function (e) {
            layer.closeAll('loading');
            //加载失败
            if (dataArg.error == null || dataArg.error == "" || typeof(dataArg.error) == "undefined") {
                layer.msg("网络异常，请稍后重试！");
            } else {
                dataArg.error(d);
            }
        },
        complete: function () {
            //加载完成
            if (dataArg.complete == null || dataArg.complete == "" || typeof(dataArg.complete) == "undefined") {
            } else {
                dataArg.complete();
            }
            //此处加载动画关闭
            if (isLoading == "true") {
                layer.closeAll('loading');
            }
            if (!isNull(self)) {
                //恢复点击事件
                $(self).attr("isClick", "true");
                //移除当前对象加载动画
                if (!isNull(loadingType)) {
                    $(self).find("i").remove();
                }
            }
        }
    });
};
/**
 * 提示弹框
 * @param promptCon  提示内容
 */
function showPromptWin(promptCon) {
    var $prompt = '';
    $prompt += '<div style="width: auto; height: auto; padding: 20px; overflow: hidden;">';
    $prompt += '<p style="width: 100%; height: 60px; line-height: 30px; font-size: 14px; text-indent: 1em; overflow: hidden">'+promptCon+'</p>';
    $prompt += '<button onclick="closePromptWin(this)" style="width: auto; height: 40px; line-height: 40px; font-size: 16px; color: #fff;border: 0; border-radius: 4px; background: #02CAB0; padding: 0 20px; margin-top: 20px; float: right; cursor: pointer; overflow: hidden;">确定</button>';
    $prompt += '</div>';
    return $prompt;
}
/**
 * 页面加载完成后执行
 */
$(document).ready(function () {
    initDict($(document));//页面加载完毕后，立即初始化字典
});
/**
 * 初始化当前页面字典元素
 */
function initDict(elem, complete) {
    //1.获取所有必填对象
    var objList = $(elem).find("*[initDict]");
    if (objList.length > 0) {
        for (var i = 0; i < objList.length; i++) {
            var obj = $(objList[i]);
            var sendData = {};
            sendData.mark = obj.attr("initDict");
            sendData.currentObj = obj;
            loadDict(sendData, complete);

        }
    }
}
// 添加年份
function addYear(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setYear(calculateAdd(date.getFullYear(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    dateStr = year + "-" + month + "-" + day;
    dateStr = addDay(dateStr, -1);
    return dateStr;
}
// 添加月份
function addMonth(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setMonth(calculateAdd(date.getMonth(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    dateStr = year + "-" + month + "-" + day;
    dateStr = addDay(dateStr, -1);
    return dateStr;
}
// 添加日期
function addDay(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setDate(calculateAdd(date.getDate(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    if(month.toString().length == 1){
        month='0'+month;
    }
    if(day.toString().length == 1){
        day='0'+day;
    }
    dateStr = year + "-" + month + "-" + day;
    return dateStr;
}
// 减少日期
function shortDay(dateArg, count) {
    var dateStr;
    var year, month, day;
    var date = strConvertDate(dateArg);
    date.setDate(calculateSub(date.getDate(), count));
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    if(month.toString().length == 1){
        month='0'+month;
    }
    if(day.toString().length == 1){
        day='0'+day;
    }
    dateStr = year + "-" + month + "-" + day;
    return dateStr;
}
// 获取两日期-月份差
function diffMonth(date1, date2) {
    var diffYMD = getDiffDates(date1, date2);
    // 相差月份
    var diffM = diffYMD[0] * 12 + diffYMD[1];
    if (diffYMD[2] != 0) {
        diffM += 1;
    }
    return diffM;
}
/**
 * 获取当前日期
 * @returns {string}
 */
function getDateNow() {
    var d = new Date();
    var str = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
    return str;
}
//计算两个日期天数差的函数，通用
function diffDay(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
}
/**
 * 比较两日期大小
 * @param date1
 * @param date2
 * @returns {boolean}
 */
function compareDate(date1, date2) {
    var startDate = (typeof date1 == "object" ? date1 : strConvertDate(date1));
    var endDate = (typeof date2 == "object" ? date2 : strConvertDate(date2));
    if (startDate.getTime() > endDate.getTime()) {
        return false;
    } else {
        return true;
    }
}
// 字符串日期格式化成date
function strConvertDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, function (a) {
            return parseInt(a, 10) - 1;
        }).match(/\d+/g) + ')');
    return date;
}
// 获取指定年，月的最后一天
function getMonthDay(year, month) {
    var day = new Date(year, month, 0);
    // 获取当月最后一天日期
    var lastday = day.getDate();
    return lastday;
}
// 获取日期差的年月日 -按照30天计算
function getDiffDates(date1, date2) {
    var dates = "";
    var diffList = new Array();
    var startDate = (typeof date1 == "object" ? date1 : strConvertDate(date1));
    var endDate = (typeof date2 == "object" ? date2 : strConvertDate(date2));
    // 开始时间
    var startY = startDate.getFullYear();
    var startM = startDate.getMonth();
    var startD = startDate.getDate();
    var startDayOfMonth = getMonthDay(startY, startM);
    // 结束时间
    var endY = endDate.getFullYear();
    var endM = endDate.getMonth();
    // 处理起止日期为同一天，默认服务为一天 示例：2016-01-01 至 2016-01-01
    var endD = endDate.getDate() + 1;
    var endDayOfMonth = getMonthDay(endY,endM+1);
    var lday = endD - startD;
    // 每月按照30天计算
    if (endD < startD) {
        endM = endM - 1;
        lday = 30 - startD + endD;
    }
    /*
     * 按照正常日期计算 if (lday<0) { endM = endM -1; lday = startDayOfMonth+ lday; }
     */
    // 处理服务天数问题，示例：2016-01-01 到 2017-12-31 实际上是1年
    if (lday == endDayOfMonth) {
        endM = endM + 1;
        lday = 0;
    }
    var mos = (endY - startY) * 12 + (endM - startM);
    var lyear = Math.floor(mos / 12);
    var lmonth = mos % 12;
    diffList.push(lyear);
    diffList.push(lmonth);
    diffList.push(lday);
    return diffList;
}
/**
 * 将日期转换为时间戳
 * @param objDate
 * @returns {*}
 */
function timeStamp(objDate) {
    var date = objDate;
    date = new Date(Date.parse(date.replace(/-/g, "/")));
    date = date.getTime();
    return date;
}
/**
 * 获取当前时间
 */
function getTime() {
    var d = new Date();
    function addzero(v) {
        if (v < 10) return '0' + v;return v.toString();
    }
    var s = d.getFullYear().toString() + '-' + addzero(d.getMonth() + 1) + '-' + addzero(d.getDate());
    return s;
}
/**
 * 加法
 * @param a
 * @param b
 */
function calculateAdd(a, b) {
    var c, d, e;
    try {
        c = (a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = (b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (calculateMul(a, e) + calculateMul(b, e)) / e;
}
/**
 * 减法
 * @param a
 * @param b
 */
function calculateSub(a, b) {
    var c, d, e;
    try {
        c = (a).toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = (b).toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (calculateMul(a, e) - calculateMul(b, e)) / e;
}
/**
 * 乘法
 * @param a
 * @param b
 * @returns {number}
 */
function calculateMul(a, b) {
    var c = 0,
        d = (a).toString(),
        e = (b).toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {
    }
    try {
        c += e.split(".")[1].length;
    } catch (f) {
    }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
/**
 * 除法
 * @param a
 * @param b
 */
function calculateDiv(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = (a).toString().split(".")[1].length;
    } catch (g) {
    }
    try {
        f = (b).toString().split(".")[1].length;
    } catch (g) {
    }
    return c = Number((a).toString().replace(".", "")), d = Number((b).toString().replace(".", "")), calculateMul(c / d, Math.pow(10, f - e));
}
/**
 * 对象排序,升序
 */
function sortAsc(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value2 < value1) {
            return 1;
        } else if (value2 > value1) {
            return -1;
        } else {
            return 0;
        }
    }
}
function Base64() {
    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }
    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
/**-------------------监听input正在输入中Start---------------*/
var inputLock = true;
$('input').on('compositionstart', function () {
    inputLock = false;
});
$('input').on('compositionend', function () {
    console.log("true");
    inputLock = true;
});
/**-------------------监听input正在输入中End---------------*/
/**
 * 输入验证
 * int 全数字
 * float 包含小数点的数字
 * char 字母[a-z|A-Z]
 * string 不包含特殊字符的字符串
 * money 金额
 * phone 手机号
 * email 邮箱
 */
function checkVerify(type, len) {
    var obj = $(getSrcElement());
    //验证类型
    if (!isNull(type)) {
        if (type == "int") {
            //只能输入数字类型
            if (!isInt(obj.val())) {
                layer.tips("只能为数字！", obj, {tips: [3, '#FF784E'], time: 0});
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "money") {
            //只能输入金额类型
            if (!isMoeny(obj.val())) {
                layer.tips("金额不合法！", obj, {tips: [3, '#FF784E'], time: 0});
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "nine") {
            //只能输入 123456789.12
            if (!isNine(obj.val())) {
                layer.tips("业绩值不合法！", obj, {tips: [3, '#FF784E'], time: 0});
            } else {
                layui.layer.closeAll('tips');
            }
        } else if (type == "float") {
            //只能输入 123789.12
            if (!isNine(obj.val())) {
                layer.tips("面积不合法！", obj, {tips: [3, '#FF784E'], time: 0});
            } else {
                layui.layer.closeAll('tips');
            }
        }
    }
    //验证输入长度
    if (!isNull(len) && inputLock) {
        if (obj.val().length > len) {
            layui.layer.tips("不能超出" + len + "个字符！", obj, {tips: [3, '#FF784E']});
            obj.val(obj.val().substr(0, len));
        }
    }

}
//校验是否全由数字组成
function isNine(s) {
    if (s == "") return true;
    var patrn = /(^[1-9]([0-9]{1,8})?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!patrn.exec(s)) return false;
    return true
}
//校验是否全由数字组成
function isInt(s) {
    if (s == "") return true
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.exec(s)) return false
    return true
}
//校验金额
function isMoeny(s) {
    if (s == "") return true
    var patrn = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!patrn.exec(s)) return false
    return true
}
/**
 * img 图片放大
 * @param type
 * @param len
 */
function imgZoom($this) {
    //loading层
    var imgLoading = layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    var _w = parseInt($(window).width());//获取浏览器的宽度
    var _h = parseInt($(window).height());//获取浏览器的高度
    var realWidth;//真实的宽度
    var realHeight;//真实的高度
    var img = $("<img/>").attr("src",$($this).attr("bigSrc")).load(function () {
        realWidth = this.width;
        realHeight = this.height;
        if (this.width >= _w) {//如果真实的宽度大于浏览器的宽度就按照100%显示
            realWidth = "100%";
        }else {//如果小于浏览器的宽度按照原尺寸显示
            realWidth = this.width;
        }
        if(this.height >= _h){
            realHeight = "100%";
        }else{
            realHeight = this.height;
        }
        layui.layer.close(imgLoading);
        top.layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: [realWidth,realHeight],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            zIndex: 99999,
            content: '<div style="width:auto; height:calc(100% - 0px);text-align: center; overflow: scroll;" ondblclick="closePic(this)"><img src="' + $($($this)).attr("bigSrc") + '"/></div>'
        });
    })
}
/**
 * 关闭查看大图
 */
function closePic($thisObj) {
    $($thisObj).parents("body").find(".layui-layer-shade").remove();
    $($thisObj).parent().parent().remove();
}
/**
 * 获取36位不重复唯一ID （uuid）
 */
function getUUID() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    var chars = CHARS, uuid = [], i;
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    uuid = uuid.join('');
    //随机替换 “-”
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < 4; i++) {
        var id = Math.ceil(Math.random() * 35);
        uuid = uuid.replace("-", chars[id]);
    }
    return uuid;
}
/**
 * 获取当前时间
 */
function getTime() {
    var d = new Date();
    function addzero(v) {
        if (v < 10) return '0' + v;return v.toString();
    }
    var s = d.getFullYear().toString() + '-' + addzero(d.getMonth() + 1) + '-' + addzero(d.getDate());
    return s;
}
/**
 * 空值变无
 */
//如果目标为undefined转化为替换值
function isUndefind(obj,obj1) {
    if (obj==undefined){
        obj=obj1;
    }else {
        obj=obj;
    }
    return obj;
}

//生成当前时间
function CurentTime()
{
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + "T";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;

    // if (ss < 10) clock += '0';
    // clock += ss;


    return(clock);
}
