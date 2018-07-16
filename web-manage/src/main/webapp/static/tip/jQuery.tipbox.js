// JavaScript Document  
(function($){
	$.fn.extend({
		tipClick:function(options){
			//定义默认值
			var defauls = {
				title : '提示框',
				width : '300',
				height : '200',
				secondary : false,
				btn : false,
				cancel : 'defaultBtn',
				tipClose : true,
				concent : ''
			}
			this.click(function(){
				options = $.extend(defauls,options);
				if($('.easyTipBorder').length <= 0){
					tipCen(options.title,options.width,options.height,options.secondary,options.btn,options.cancel,options.tipClose,options.concent);
					return this;
				}
			});
			
		},
		tipOpen:function(options){
			//定义默认值
			var defauls = {
				title : '提示框',
				width : 'auto',
				height : 'auto',
				secondary : false,
				btn : false,
				cancel : 'defaultBtn',
				tipClose : true,
				concent : ''
			}
			options = $.extend(defauls,options);
			if($('.easyTipBorder').length <= 0){
				tipCen(options.title,options.width,options.height,options.secondary,options.btn,options.cancel,options.tipClose,options.concent);
				return this;
			}
						
		},
		tipLog:function(val){
				tiplog(this,val);
				return this;
		},
		tipAlert:function(text,time,ind){
			if($('.easyTipBorder').length <= 0){
				easyTipCen(text,time,ind);
				return this;
			}
			
		},
		tipShut:function(time){
			time = time*1000;
			setTimeout(function(){$('.layer,.tipBorder').remove();},time);
			return this;
		},
		tipLodding : function(obj){
			if(obj == undefined){
				obj = $(".tipLoadding");
			}
			$('.tipBorder').hide();
			tiplog(obj,'open');
		},
		tipLoddingEnd : function(isok,obj){
			if(obj == undefined){
				obj = $(".tipLoadding");
			}
			tiplog(obj,'close');
			if(isok == true){
				$('.layer,.tipBorder').remove();
			}else{
				$('.tipBorder').show();
			}
		}
	});
	
	var number = 0;
	//简单弹框
	function easyTipCen(text,time,ind){
		number++;
		var html = '<div class="easyTipBorder" id="tipBox_'+number+'">';
			html += '<div class="tipCen">';
			if(ind != undefined){
				html += '<i class="tipicon tipicon-'+ind+'"></i>';
			}
			html += text;
			html += '</div>';
			html += '</div>';
		$('body').append(html);
		if(ind==0){
			$(".easyTipBorder").css({"background":"#fdf8e4","border":"1px solid #faebcc","color":"#f39b13","box-shadow":"0 0 4px #faebcc"});
		}
		if(ind==1){
			$(".easyTipBorder").css({"background":"#e0efd8","border":"1px solid #d5e9c6","color":"#10bf9e","box-shadow":"0 0 4px #d5e9c6"});
		}
		if(ind==2){
			$(".easyTipBorder").css({"background":"#f2dedf","border":"1px solid #ebccd2","color":"#e75546","box-shadow":"0 0 4px #ebccd2"});
		}
		if(ind==3){
			$(".easyTipBorder").css({"background":"#d9edf6","border":"1px solid #bee9f0","color":"#2fa2e3s","box-shadow":"0 0 4px #bee9f0"});
		}
		tipPosition(number);
		if(time == undefined){
			time = 1.5;
		}
		time = time*1000;
		setTimeout(function(){easyTipClose(number)},time);
		
	}
	//弹框框架
	function tipCen(title,width,height,secondary,btn,cancel,tipClose,concent){
		if($('.easyTipBorder').length > 0){
			$('.easyTipBorder').remove();
		}
		number++;
		if(!secondary){
			layer();
		}
		
		var html = '<div class="tipBorder" id="tipBox_'+number+'">';
			if(title != false && tipClose == true){
				html += '<div class="tipTitle"><span class="tipTitle-text">'+title+'</span><i class="tipicon tipClose">关闭</i></div>';
			}else if(title != false && tipClose != true){
				html += '<div class="tipTitle"><span class="tipTitle-text">'+title+'</span></div>';
			}else if(title == false && tipClose == true){
				html += '<i class="tipicon tipClose">关闭</i>';
			}
			
			html += '<div class="tipCen">';
			html += concent;
			html += '</div>';
			if(btn != false){
				var buttonHtml = "";
				var cancelBtn = '';
				for ( var i in btn) {
					var buttonItem = btn[i];
					var htmls = "<button type='button' class='tipBtn' id='"
							+ buttonItem.id + "' onClick='" + buttonItem.onClickFunction
							+ "'>" + buttonItem.label + "</button>";
					buttonHtml += htmls;
				}
				html += '<div class="tipFoot">';
				if(cancel == 'defaultBtn' ){
					html += buttonHtml+'<button type="button" class="tipBtn tip-cancel">取消</button>';
				}else if(cancel == false){
					html += buttonHtml;
				}else{
					for ( var i in cancel) {
						var cancelItem = cancel[i];
						var htmls = "<button type='button' class='tipBtn' id='"
								+ cancelItem.id + "' onClick='" + cancelItem.onClickFunction
								+ "'>" + cancelItem.label + "</button>";
						cancelBtn += htmls;
					}
					html += buttonHtml+cancelBtn;
				}
				
				html += '</div>';
			}else if(cancel != false && cancel != 'defaultBtn'){
				var cancelBtn = '';
				html += '<div class="tipFoot">';
				for ( var i in cancel) {
					var cancelItem = cancel[i];
					var htmls = "<button type='button' class='tipBtn' id='"
							+ cancelItem.id + "' onClick='" + cancelItem.onClickFunction
							+ "'>" + cancelItem.label + "</button>";
					cancelBtn += htmls;
				}
				html += cancelBtn;
				
				
				html += '</div>';
			}
			html += '</div>';
		$('body').append(html);
		$('#tipBox_'+number+' .tipTitle').css({'width':width+'px'});
		$('#tipBox_'+number+' .tipCen').css({'width':width+'px','height':height+'px'});
		tipPosition(number,secondary);
		if(tipClose == true){
			tipCloses(number,secondary);
		}else{
			tipCancel(number,secondary);
		}
		drag(number);
	}
	//制定ID弹出
	var tiplogInd = 0;
	function tiplog(obj,val){
		var zfc = $(obj).attr('id');
		if(val == 'open'){
			if($('.layer').length <= 0){
				layer();
				tiplogInd = 1;
			}
			var html = '<div class="tipLog" id="tipBox_'+zfc+'">';
				html += '<div class="tipCen">';
				html += $(obj).html();
				html += '</div>';
				html += '</div>';
			$('body').append(html);
			tipPosition(zfc);
		}else{
			$('#tipBox_'+zfc).remove();
			if(tiplogInd == 1){
				$('.layer').remove();
				tiplogInd = 0;
			}
			
		}
	}
	//拖拽功能
	function drag(number){
		var $tar = $('#tipBox_'+number+'');
		$tar.mousedown(function(e){
			if(e.target.className == "tipTitle" || e.target.className == "tipTitle-text" ){
				var diffX = e.clientX - $tar.offset().left;
				var diffY = e.clientY - $tar.offset().top;
				$(document).mousemove(function(e){
					var tipWidth = $tar.outerWidth();
					var tipHidth = $tar.outerHeight();
					var left = e.clientX - diffX;
					var top = e.clientY - diffY;
					if(tipWidth > $(window).width()){
						left = 0;
					}else if(tipHidth > $(window).height()){
						top = 0;
					}else{
						if (left < 0){
							left = 0;
						}
						else if (left <= $(window).scrollLeft()){
							left = $(window).scrollLeft();
						}
						else if (left > $(window).width() +$(window).scrollLeft() - tipWidth){
							left = $(window).width() +$(window).scrollLeft() - tipWidth;
						}
						if (top < 0){
							top = 0;
						}
						else if (top <= $(window).scrollTop()){
							top = $(window).scrollTop();
						}
						else if (top > $(window).height() +$(window).scrollTop() - tipHidth){
							top = $(window).height() +$(window).scrollTop() - tipHidth;
						}
					}
					$tar.css("left",left + 'px').css("top",top + 'px');
				});
			}
			$(document).mouseup(function(){
				$(this).unbind("mousemove");
				$(this).unbind("mouseup")
			});
		});
	}
	
	//弹出窗口定位
	function tipPosition(number,secondary){
		var gd = $(this).scrollTop();
		var width = $('#tipBox_'+number+'').width();
		var height = $('#tipBox_'+number+'').height();
		var browserW = $(window).width();
		var browserH = $(window).height();
		var left = (browserW-width)/2;
		var top;
		if($('#tipBox_'+number+'').hasClass('tipBorder')){
			top = (browserH-height)/2+gd;
		}else{
			top = (browserH-height)/2;
		}
		
		
		if(left <= 0){
			left = 0;
		}
		if(top <= 0){
			top = 0;
		}
		if(secondary){
			left = left+20;
			top = top+20;
		}
		$('#tipBox_'+number+'').css({'left':left+'px','top':top+'px'});	
	}
	
	
	
	//添加罩层
	function layer(){
		var layer = '<div class="layer"></div>';
		$('body').append(layer);
	}
	//删除罩层
	function delLayer(number,secondary){
		if(!secondary){
			$('.layer,#tipBox_'+number+'').remove();
		}else{
			$('#tipBox_'+number+'').remove();
		}
		
	}
	//关闭按钮关闭罩层
	function tipCloses(number,secondary){
		$('.tipClose,.tip-cancel').on('click',function(){
			delLayer(number,secondary);
		});
	}
	//取消按钮
	function tipCancel(number,secondary){
		$('.tip-cancel').on('click',function(){
			delLayer(number,secondary);
		});
	}
	
	//简单删除罩层
	function easyTipClose(number){
		$('#tipBox_'+number+'').fadeOut(800,function(){
			$(this).remove();
		});
	}
	
})(jQuery);
