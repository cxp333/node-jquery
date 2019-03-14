// get请求和发送的功能
// 使用方式
// ajaxGet(url,{}).then(function(res){
//     console.log(res)
// },function(errCode){
//     console.log(errCode)
// })
function ajaxGet(url,data){
    var str = "";
    for(var i in data){
        str =  str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "t=" + d.getTime()

    var p = new Promise(function(success,error){
        var ajax = new XMLHttpRequest()
        ajax.open("GET",url);
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText)
            }else if(ajax.readyState == 4 && ajax.status != 200){
                error(ajax.status)
            }
        }
        ajax.send(null)
    })
    return p;
}




// post请求和发送的功能
function ajaxPost(url,callback,data){
    var str = "";
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }
    // 强迫症选项
    // str = str.slice(0,str.length-1)

    var ajax = new XMLHttpRequest();
    ajax.open("POST",url,true);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            callback(ajax.responseText)
        }
    }
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send(str)
}

// 跨域请求数据的jsonp函数，封装好之后使用方式同ajax
function jsonp(url,callback,data){
    var str = "";
    for(var i in data){
        str = str + i + "=" + data[i] + "&";
    }

    var script = document.createElement("script");
    script.src = url + "?" + str;
    document.body.appendChild(script);
    
    window[data[data.callbackNameColumns]] = function(res){
        callback(res)
    }
}