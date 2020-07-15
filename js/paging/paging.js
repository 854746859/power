(function($, window, document, undefined) {
	// 定义类
	function paging(element, option) {
		this.element = element;
		this.option = {
			currentPage: 1,
			classStyle: option.classStyle,
			backClass: option.backClass,
			isFirst: ((option.isFirst == undefined) ? true : option.isFirst), // 是否显示首页和尾页
			isPre: ((option.isPre == undefined) ? true : option.isPre), // 是否显示下一页和上一页按钮
			isShow: ((option.isShow == undefined) ? true : option.isShow), //是否显示总页数和总记录数
			showRecordNum: option.showRecordNum,
			totalNum: option.totalNum,
			totalPage: ((option.totalNum % option.showRecordNum == 0) ? option.totalNum / option.showRecordNum : option.totalNum /
				option.showRecordNum + 1),
			showNum: option.showNum,
			pages: option.pages
		}
		this.init();
	}

	paging.prototype = {
		init: function() {
			this.createPage();
			this.changePage();
		},
		createPage: function() {
			var ele = this;
			var arr = new Array();
			var str = "";
			var isFirst = ele.option.isFirst;
			var isPre = ele.option.isPre;
			var isShow = ele.option.isShow;

			var classStyle = ele.option.classStyle;
			var string1 = "";
			for (var ss in classStyle) {
				string1 += ss + ':' + classStyle[ss] + ';';
			}

			var backClass = ele.option.backClass;
			var string2 = "";
			for (var ss in backClass) {
				string2 += ss + ':' + backClass[ss] + ';';
			}

			var currentPage = parseInt(ele.option.currentPage);
//			console.log('currentPage:' + currentPage);
			var totalPage = parseInt(ele.option.totalPage);
//			console.log('totalPage:' + totalPage);
			var totalNum = parseInt(ele.option.totalNum);
//			console.log('totalNum:' + totalNum);
			if (isNaN(currentPage) || isNaN(totalPage) || isNaN(totalNum)) {
				alert("分页插件不能正常工作，请输入正确的数字");
			} else {
				if (isFirst) {
					if (currentPage == 1) {
						str = '<li class="disabled"><span style="' + string1 + '">首页</span></li>';
						console.debug(str);
						arr.push(str);
					} else {
						str = '<li><a href="javascript:void(0)" style="' + string1 + '">首页</a></li>';
						console.debug(str);
						arr.push(str);
					}
				}
				if (isPre) {
					if (currentPage == 1) {
						str = '<li class="disabled"><span style="' + string1 + '">上一页</span></li>';
						arr.push(str);
					} else {
						str = '<li><a href="javascript:void(0)" style="' + string1 + '">上一页</a></li>';
						arr.push(str);
					}

				}
				// 只显示5个页号
				if (totalPage <= 5) {
					for (var i = 0; i < totalPage; i++) {
						if ((i + 1) == currentPage) {
							str = '<li class="active"><a  href="javascript:void(0)" style="' + string1 + string2 + '">' + (i + 1) +
								'</a></li>';
							arr.push(str);
						} else {
							str = '<li><a href="javascript:void(0)" style="' + string1 + '">' + (i + 1) + '</a></li>';
							arr.push(str);
						}
					}
				} else {
					if ((totalPage - 7) > currentPage) {
						if (currentPage == 1) {
							for (var i = 1; i <= 3; i++) {
								if (i == currentPage) {
									str = '<li class="active"><a  href="javascript:void(0)" style="' + string1 + string2 + '">' + (i) +
										'</a></li>';
								} else {
									str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (i) + '</a></li>';
								}
								arr.push(str);
							}
						} else {
							for (var i = currentPage - 1; i <= currentPage + 1; i++) {
								if (i == currentPage) {
									str = '<li class="active"><a  href="javascript:void(0)" style="' + string1 + string2 + '">' + (i) +
										'</a></li>';
								} else {
									str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (i) + '</a></li>';
								}
								arr.push(str);
							}
						}
						str = '<li><span style="' + string1 + '">...</span></li>';
						arr.push(str);
						str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (currentPage + 6) + '</a></li>';
						arr.push(str);
						str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (currentPage + 7) + '</a></li>';
						arr.push(str);
					} else {
						if ((totalPage - 1) <= currentPage) {
							// str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (totalPage - 8) + '</a></li>';
							// arr.push(str);
							// str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (totalPage - 7) + '</a></li>';
							// arr.push(str);
							str = '<li><span style="' + string1 + '">...</span></li>';
							arr.push(str);
							for (var i = totalPage - 2; i <= totalPage; i++) {
								if (i == currentPage) {
									str = '<li class="active"><a  href="javascript:void(0)" style="' + string1 + string2 + '">' + (i) +
										'</a></li>';
								} else {
									str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (i) + '</a></li>';
								}
								arr.push(str);
							}
						} else {
							// str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (currentPage - 8) + '</a></li>';
							// arr.push(str);
							// str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (currentPage - 7) + '</a></li>';
							// arr.push(str);
							for (var i = currentPage - 0; i <= currentPage + 1; i++) {
								if (i == currentPage) {
									str = '<li class="active"><a  href="javascript:void(0)" style="' + string1 + string2 + '">' + (i) +
										'</a></li>';
								} else {
									str = '<li><a  href="javascript:void(0)" style="' + string1 + '">' + (i) + '</a></li>';
								}
								arr.push(str);
							}

							str = '<li><span style="' + string1 + '">...</span></li>';
							arr.push(str);
						}
					}

				}
				if (isPre) {
					if (currentPage == totalPage) {
						str = '<li class="disabled"><span style="' + string1 + '">下一页</span></li>';
						arr.push(str);
					} else {
						str = '<li><a href="javascript:void(0)" style="' + string1 + '">下一页</a></li>';
						arr.push(str);
					}
				}
				if (isFirst) {
					if (currentPage == totalPage) {
						str = '<li class="disabled"><span style="' + string1 + '">尾页</span></li>';
						arr.push(str);
					} else {
						str = '<li><a href="javascript:void(0)" style="' + string1 + '">尾页</a></li>';
						arr.push(str);
					}
				}
				if (isShow) {
					str = '<li><span class="' + classStyle + '" style="' + string1 + '">共' + totalPage + '页</span></li>';
					arr.push(str);
					str = '<li><span class="' + classStyle + '" style="' + string1 + '">共' + totalNum + '条记录</span></li>';
					arr.push(str);
				}
				str = arr.join("");
				ele.element.html(str);
			}
		},
		changePage: function() {
			var ele = this;
			console.debug(ele);
			ele.element.on('click', 'a', function() {
				var currentPage = parseInt(ele.option.currentPage);
				var totalpage = parseInt(ele.option.totalPage);
				var ss = $(this).html();
				if (ss == "上一页" && currentPage != 1) {
					ele.option.currentPage = ele.option.currentPage - 1;
				} else if (ss == "上一页" && currentPage == 1) {
					ele.option.currentPage = ele.option.currentPage;
				}
				if (ss == '首页') {
					ele.option.currentPage = 1;
				}
				if (ss == "尾页") {
					ele.option.currentPage = totalpage;
				}
				if (ss == "下一页" && currentPage != totalpage) {
					ele.option.currentPage = ele.option.currentPage + 1;
				} else if (ss == "下一页" && currentPage == totalpage) {
					ele.option.currentPage = totalpage;
				}
				if (ss != "首页" && ss != "上一页" && ss != "下一页" && ss != "尾页") {
					ele.option.currentPage = parseInt(ss);
				}
				ele.createPage();
				if (ele.option.showNum) {
					ele.option.showNum(ele.option.currentPage, ele.option.showRecordNum);
//					alert(ele.option.pages)
					// 首页文章分页
					if (ele.option.pages == "post") {
						// ajax请求文章列表
						var post = "";
						var postlist = document.getElementById("postlist");
						var type = localStorage.getItem("type")
						if (document.getElementById("postlist")) {
							//存在
							// postlist.remove();
							document.getElementById("postlist").innerHTML = "";
						}
						// alert(ele.option.showRecordNum)
						$.ajax({
							url: 'http://114.55.35.82/tp6_forum/public/index.php/sort/select',
							type: 'post',
							data: {
								// token: 'sadafsaf',
								rows: ele.option.showRecordNum,
								page: ele.option.currentPage,
								serch: '',
								plate: localStorage.getItem("plate"),
								plate_two: localStorage.getItem("two"),
								post_type: localStorage.getItem("type"),
								order: '0'
							},
							// 用于设置响应体的类型 注意 跟 data 参数没关系！！！
							dataType: 'json',
							success: function(res) {
								// 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
								// 客户端会主观认为服务端返回的就是 JSON 格式的字符串
								// console.log(res)
								var data = res.data;
								for (var i = 0; i < data.length; i++) {
									post += "<li><img src='" + data[i].post_img + "'/><div class='blog_list'>";
									post += "<div class='news_title'><a href='forum.html?postid=" + data[i]['id'] + "&plate=" + json.plate +
										"&plate_two=" + json.two + "''>" + data[i][
											'post_title'
										] + "</a>";
									post += "<i class='red_news'>[" + data[i]['post_label'] + "]</i></div>";
									post += "<div class='news_time news_other'><span>发布于：" + data[i]['post_releasetime'] + "</span>";
									post += "<span id=''>阅读数：" + data[i]['post_readnum'] + " </span><span id=''>点赞：" + data[i][
											'post_upnum'
										] +
										"</span></div>";
									post += "<div class='news_owner news_other'><span id=''>发帖人：" + data[i]['post_user_name'] + "</span>";
									post += "<span id=''>最后回复人：" + data[i]['last_user_name'] +
										"</span><div class='share bdsharebuttonbox'>分享：";
									post +=
										"<a url='forum.html?postid=" + data[i]['id'] + "&plate=" + json.plate +
									"&plate_two=" + json.two + "' class='bds_weixin' data-cmd='weixin'></a><a url='forum.html?postid=" + data[i]['id'] + "&plate=" + json.plate +
									"&plate_two=" + json.two + "' class='bds_tsina' data-cmd='tsina'></a></div></div></div></li>";
									postlist.innerHTML = post;
								}
								$('.bdsharebuttonbox a').on('mousemove', function() {
									var title = $(this).attr('title');
									var Url = $(this).attr('url');
									$("#share_url").val(title + "||" + Url);
								})
								window._bd_share_main.init();
							},
						})
						// 我的文章分页
					} else if (ele.option.pages == 'infopost') {
						$.ajax({
							url: sever_url + 'my/article',
							type: 'post',
							data: {
								token: infodata.token,
								article_type: '0',
								rows: ele.option.showRecordNum,
								page: ele.option.currentPage,
								state: '1',
								order: '1',
								star_time: '2020-1-1',
								end_time: s2,
							},
							// 用于设置响应体的类型 注意 跟 data 参数没关系！！！
							dataType: 'json',
							success: function(res) {
								// 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
								// 客户端会主观认为服务端返回的就是 JSON 格式的字符串
								// console.log(res.data)
								var postdata = res.data;
								var post = '';
								var postlist = document.getElementById("postlist");
								if (postdata.length === 0) {
									follows += "<h3>暂无数据</h3>";
									content.innerHTML = follows;

								} else {
									for (var i = 0; i < postdata.length; i++) {
										post += "<li><img src='" + postdata[i].post_img + "'/><div class='blog_list'>";
										post += "<div class='news_title'><a href='forum.html?postid=" + postdata[i]['id'] + "'>" + postdata[i]
											[
												'post_title'
											] + "</a>";
										post += "<i class='red_news'>[" + postdata[i]['post_label'] + "]</i></div>";
										post += "<div class='news_time news_other'><span>发布于：" + postdata[i]['post_releasetime'] + "</span>";
										post += "<span id=''>阅读数：" + postdata[i]['post_readnum'] + " </span><span id=''>点赞：" + postdata[i][
												'post_upnum'
											] +
											"</span></div>";
										post += "<div class='news_owner news_other'><span id=''>发帖人：" + postdata[i]['post_user_name'] +
											"</span>";
										post += "<span id=''>最后回复人：" + postdata[i]['last_user_name'] +
											"</span><div class='share bdsharebuttonbox'>分享：";
										post +=
											"<a url='forum.html?postid=" + postdata[i]['id'] + "' class='bds_weixin' data-cmd='weixin'></a><a url='forum.html?postid=" + postdata[i]['id'] + "' class='bds_tsina' data-cmd='tsina'></a></div></div></div><img style='width: 20px;height: 20px;' src='images/write.png' /><img style='width: 20px;height: 20px;' src='images/delete.png' /></li>";
										postlist.innerHTML = post;
									}
									$('.bdsharebuttonbox a').on('mousemove', function() {
										var title = $(this).attr('title');
										var Url = $(this).attr('url');
										$("#share_url").val(title + "||" + Url);
									})
									window._bd_share_main.init();
								}
							},
						})
					} else if (ele.option.pages == "fan") {
						$.ajax({
							url: sever_url + 'my/fans',
							type: 'post',
							data: {
								token: infodata.token,
								rows: ele.option.showRecordNum,
								page: ele.option.currentPage,
								order: '0',
								star_time: '2020-1-1',
								end_time: s2,
							},
							// 用于设置响应体的类型 注意 跟 data 参数没关系！！！
							dataType: 'json',
							success: function(res) {
								// 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
								// 客户端会主观认为服务端返回的就是 JSON 格式的字符串
								//								console.log(res)
								var fansdata = res.data;

								$(function() {
									var a = {
										color: '#blue',
										sex: 'black',
										border: '1px solid #ddd'
									};

									var b = {
										background: '#005389'
									};

								});
								// console.log(fansdata)
								var fans = '';
								var fanslist = document.getElementById("fanslist");
								if (fansdata.length === 0) {
									fans += "<h3>暂无数据</h3>";
									fanslist.innerHTML = fans;

								} else {
									for (var i = 0; i < fansdata.length; i++) {
										fans += "<li><img class='icon_radius' src='" + fansdata[i].user_head + " ' /><div class='blog_list'>";
										fans += "<div class='attention_title'><div>" + fansdata[i]['user_name'] + "</div><div>ID:" + fansdata[
												i]
											[
												'id'
											] + "</div><div>关注时间：" + fansdata[i]['follow_time'] + "</div>";
										fans += "</div><div class='news_time news_other'><span>个人简介：</span><p>" + fansdata[i]['user_profile'] +
											"</p>";
										fans += "</div><div class='news_owner news_other'><span id=''>关注：" + fansdata[i]['user_follow_sum'] +
											"|粉丝：" + fansdata[i]['user_fans_sum'] + "</span>";
										fans +=
											"</div></div><div class='about_att'><div class='cansel'>关注+</div><div class='hispage'><a>TA的个人主页</a></div></div></li>";
										fanslist.innerHTML = fans;
									}
								}
							},
						})
					} else if (ele.option.pages == "follows"){
						
							$.ajax({
								url: sever_url + 'my/follows',
								type: 'post',
								data: {
									token: infodata.token,
									rows: ele.option.showRecordNum,
									page: ele.option.currentPage,
									order: '0',
									star_time: '2020-1-1',
									end_time: s2,
								},
								// 用于设置响应体的类型 注意 跟 data 参数没关系！！！
								dataType: 'json',
								success: function(res) {
									// 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
									// 客户端会主观认为服务端返回的就是 JSON 格式的字符串
									//								console.log(res)
									var followsdata = res.data;
						
									$(function() {
										var a = {
											color: '#blue',
											sex: 'black',
											border: '1px solid #ddd'
										};
						
										var b = {
											background: '#005389'
										};
						
						
									});
									// console.log(fansdata)
									var follows = '';
									var followslist = document.getElementById("followslist");
									if (followsdata.length === 0) {
										follows += "<h3>暂无数据</h3>";
										followslist.innerHTML = follows;
						
									} else {
										for (var i = 0; i < followsdata.length; i++) {
											follows += "<li><img class='icon_radius' src='" + followsdata[i].user_head +
												" ' /><div class='blog_list'>";
											follows += "<div class='attention_title'><div>" + followsdata[i]['user_name'] + "</div><div>ID:" +
												followsdata[i][
													'id'
												] + "</div><div>关注时间：" + followsdata[i]['follow_time'] + "</div>";
											follows += "</div><div class='news_time news_other'><span>个人简介：</span><p>" + followsdata[i][
													'user_profile'
												] +
												"</p>";
											follows += "</div><div class='news_owner news_other'><span id=''>关注：" + followsdata[i]['user_follow_sum'] +
												"|粉丝：" + followsdata[i]['user_fans_sum'] + "</span>";
											follows +=
												"</div></div><div class='about_att'><div class='cansel'>关注+</div><div class='hispage'><a>TA的个人主页</a></div></div></li>";
											followslist.innerHTML = follows;
										}
									}
								},
							})
							// 粉丝
						
					} else if (ele.option.pages == "business"){
						
							$.ajax({
								url: sever_url + 'my/business',
								type: 'post',
								data: {
									token: infodata.token,
									star_time: "",
									end_time: "",
									rows: 5,
									page: ele.option.currentPage,
								},
								// 用于设置响应体的类型 注意 跟 data 参数没关系！！！
								dataType: 'json',
								success: function(data) {
									console.log(data)
									var length = data.data.length;
									$(function() {
										var a = {
											color: '#blue',
											sex: 'black',
											border: '1px solid #ddd'
										};
						
										var b = {
											background: '#005389'
										};
						
									});
						
									$("#listBody").empty();
									for (var i = 0; i < length; i++) {
										var obj = data.data[i];
										$("#listBody").append('<li><ul class="list_body"><li>' + obj.business_time + '</li><li>' + obj.business_type +
											'</li><li>' + obj.business_money + '</li><li>' + obj.business_coin + '</li><li>' + obj.pay_user +
											'</li></ul></li>');
									}
								}
							});
						
					} else if (ele.option.pages == "natice"){
						
							$.ajax({
								type: "post",
								url: sever_url + "my/natice",
								async: true,
								data: {
									token: infodata.token,
									rows: ele.option.showRecordNum,
									page: ele.option.currentPage,
								},
								dataType: "json",
								success: function(data) {
									console.log(data)
									if (data.code == '200') {
										$("#notice").empty();
										var length = data.data.data.length;
										$(function() {
											var a = {
												color: '#blue',
												sex: 'black',
												border: '1px solid #ddd'
											};
						
											var b = {
												background: '#005389'
											};
						
										});
						
										for (var i = 0; i < length; i++) {
											var obj = data.data.data[i];
											$("#notice").append('<div class="message"><div class="message_title"><h3>' + obj.notice_title +
												'</h3><span>' + obj.notice_time + '</span></div><div class="message_detail"><span>' + obj.notice_content +
												'</span><a>网页链接</a></div></div>');
										}
									} else if (data.code == '2') {
										Dialog({
											title: "请登录！",
											content: "您的登录已过期，是否重新登录？",
											ok: {
												callback: function() {
													window.location.href = 'login.html';
												}
											},
											cancel: {
												callback: function() {
													Dialog.close();
												}
											}
										});
									}
						
								}
							});
					}
				}
			});
		}
	};

	$.fn.Paging = function(option) {
		return new paging(this, option);
	}
})(jQuery, window, document);
