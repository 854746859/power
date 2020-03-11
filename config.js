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
