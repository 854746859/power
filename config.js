//服务器地址
var  sever_url = "http://114.55.35.82/tp6_forum/public/index.php/";
//获取URL传值
function getUrldata(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
}
//get token
function GetToken(){
	$.ajax({
		type:"post",
		url:sever_url+"login",
		async:true,
		data:{
			user_account: 'admin',
			user_password: '123456'
		},
		success:function(data){
			if(data.code=='200'){
				var obj = JSON.stringify(data.data);
				sessionStorage.setItem("data",obj);
				self.location = document.referrer;
			}
		},
		error:function(){
			
		}
	});
}
// 获取我的信息
var data = sessionStorage.getItem("data");
var infodata = eval('(' + data + ')');
console.log(infodata);

if(infodata != null){
	var admin_box_head = '';
	var infodatatoken = infodata.token
	var admin_box = document.getElementById("admin_box");
	
	if( infodatatoken.length > 1){
		admin_box_head += "<div class='admin'><a href='mine.html'><img class='admin_logo' src='" + infodata.user_head + "'  /></a><a href=''>快速发帖</a></div>";
		admin_box.innerHTML = admin_box_head;
	}
}
