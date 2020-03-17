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
//console.log(infodata);

if(infodata != null){
	var admin_box_head = '';
	var infodatatoken = infodata.token
	var admin_box = document.getElementById("admin_box");
	
	if( infodatatoken.length > 1){
		admin_box_head += "<div class='admin' ><a href='mine.html'><img id='head' class='admin_logo' src='" + infodata.user_head + "'  /></a><a href='mine.html?fast=1'>快速发帖</a></div>";
		admin_box.innerHTML = admin_box_head;
	}
}
//分享
window._bd_share_config = {
	common: {
		bdText: '分享的内容',
		bdMini: "2", // 下拉浮层分享按钮的列数
		bdMiniList: ['mshare', 'qzone', 'tsina', 'weixin', 'tqq', 'tieba', 'copy', 'print'], //  下拉浮层显示的内容，默认显示为 false
		bdPic: '/assets/share.jpg', // 分享的图片
		bdStyle: "0",
		bdSize: "16",
		bdUrl: 'http://192.168.1.107:8081/power/index.html', // 分享的地址
		onBeforeClick: setConf // 在用户点击分享按钮时执行代码，更改配置。function(cmd,config){} cmd为分享目标id，config为当前设置，返回值为更新后的设置。
	},
	share: []
};

function setConf(cmd, config) {
	var info = $("#share_url").val().split("||");
//				info = info.split("||");
	
	config.bdUrl = 'http://114.55.35.82/power/'+info[1];
	config.bdText = info[0];
//	console.log(config)
	return config;
}
//站内广告图配置（除封面）
function adConfig(Position){
	$.ajax({
		type:"post",
		url:sever_url+"coverinfo/poster",
		async:true,
		data:{
			cover_plate: 1
		},
		dtaType:"json",
		success:function(data){
			console.log(data)
			if(data.code=="200"){
				var bottomBanner = data.data.bottom_banner;
				var topBanner = data.data.top_banner;
				var rightBanner = data.data.right_roll_poster;
				if(Object.prototype.toString.call(bottomBanner)== '[object Array]'){
					for(var i=0;i<bottomBanner.length;i++){
						$("#bottom_banner").append('<li><a href="'+bottomBanner[i].cover_href+'"><img src="'+bottomBanner[i].cover_posterurl+'" /></a></li>');
						$("#bottom_point").append('<li></li>');
					}
				}else{
					$("#bottom_banner").append('<li><a href="'+bottomBanner.cover_href+'"><img src="'+bottomBanner.cover_posterurl+'" /></a></li>')
				}
				if(Object.prototype.toString.call(topBanner)== '[object Array]'){
					for(var i=0;i<topBanner.length;i++){
						$("#top_banner").append('<li><a href="'+topBanner[i].cover_href+'"><img src="'+topBanner[i].cover_posterurl+'" /></a></li>');
						$("#top_point").append('<li></li>');
					}
				}else{
					$("#top_banner").append('<li><a href="'+topBanner.cover_href+'"><img src="'+topBanner.cover_posterurl+'" /></a></li>')
				}
				if(Position=="right"){
					console.log(Position)
					if(Object.prototype.toString.call(rightBanner)== '[object Array]'){
						for(var i=0;i<rightBanner.length;i++){
							$("#right_ad").append('<li><a href="'+rightBanner[i].cover_href+'"><img src="'+rightBanner[i].cover_posterurl+'" /></a></li>');
							$("#right_point").append('<li></li>');
						}
					}else{
						$("#right_ad").append('<li><a href="'+rightBanner.cover_href+'"><img src="'+rightBanner.cover_posterurl+'" /></a></li>')
					}
				}
			}
		},
		error:function(XMLHttpRequest,msg,res){
			console.log(msg);
		}
	});
}
