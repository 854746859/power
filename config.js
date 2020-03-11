//服务器地址
var  sever_url = "http://114.55.35.82/tp6_forum/public/index.php/";
//获取URL传值
function getUrldata(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
} 