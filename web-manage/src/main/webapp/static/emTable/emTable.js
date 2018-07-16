var emTable = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var emDiv = "<div id='" + emTableConfig.outerDivId
			+ "_div' class='emtable_div'></div>";
	var searchFrom = searchFromFun(emTableConfigName);
	$("#" + emTableConfig.outerDivId).html(emDiv);
	$("#" + emTableConfig.outerDivId + "_div").append(searchFrom);
	if(!emTableConfig.noAjax){
		emrefulsh(emTableConfigName);
	}
};

var emrefulsh = function(emTableConfigName, start, limit) {
	tableItemLayout(emTableConfigName, start, limit);
};

var emrefulshByPage = function(emTableConfigName, pageNum, limit,totalPageNum) {
	if(pageNum > totalPageNum && totalPageNum > 0){
		$.fn.tipAlert('超过最大页数',1.5,0);
	}
	else{
		var start = (pageNum - 1) * limit;
		emrefulsh(emTableConfigName, start, limit);
	}
};
var searchFromFun = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var searchHtml = searchItems(emTableConfigName);
	var buttonHtml = buttonItems(emTableConfigName);
	var emButtonHtml = emButtonItems(emTableConfigName);
	var html = searchHtml + emButtonHtml + buttonHtml;
	return "<form id='" + emTableConfig.outerDivId
			+ "_search_form' class='emtable_search_form'>" + html + "</form>";
};

var searchItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var searchHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (searchConfig && searchConfig.searchItems) {
		var searchItems = searchConfig.searchItems;
		for ( var i in searchItems) {
			var searchItem = searchItems[i];
			if (searchItem.isShow != null && searchItem.isShow != true) {
				continue;
			}
			var htmls = "";
			switch (searchItem.type) {
			case 'input':
				htmls = "<input type='text' id='" + searchItem.id
						+ "'></input>";
				break;
			case 'br':
				htmls = "<div class='clear'></div>";
				break;
			case 'select':
				htmls = "<select id='" + searchItem.id + "'>";
				if (searchItem.options != null && searchItem.options.length > 0) {
					for ( var j in searchItem.options) {
						var option = searchItem.options[j];
						var ov = typeof(option.value) == "undefined" ? "" : option.value;
						htmls += "<option value='" + ov + "'>"
								+ option.context + "</option>";
					}
				}
				htmls += "</select>";
				break;
			case 'date':
				var dateWhere = "";
				var dateMax = "";
				var dateMin = "";
				var dateFmt = "yyyy-MM-dd";
				var startDate="";
				if(searchItem.dateFmt){
					dateFmt = searchItem.dateFmt;
				}
				if(searchItem.startDate){
					startDate = searchItem.startDate;
				}
				if (searchItem.maxDateId) {
					dateMax = "maxDate:'#F{$dp.$D(\\'" + searchItem.maxDateId
							+ "\\')}'";
				} else if (searchItem.maxDate) {
					dateMax = "maxDate:'" + searchItem.maxDate + "'";
				}
				if (searchItem.minDateId) {
					dateMin = "minDate:'#F{$dp.$D(\\'" + searchItem.minDateId
							+ "\\')}'";
				} else if (searchItem.minDate) {
					dateMin = "minDate:'" + searchItem.minDate + "'";
				}
				if (dateMax != "") {
					dateWhere += "," + dateMax;
				}
				if (dateMin != "") {
					dateWhere += "," + dateMin;
				}
				dateWhere += ",dateFmt:'"+dateFmt+"',startDate:'"+startDate+"'";
				htmls += '<input id="'
						+ searchItem.id
						+ '" class="Wdate" type="text"  onfocus="WdatePicker({firstDayOfWeek:1,readOnly:true'
						+ dateWhere + '})"/>';
				break;
			case 'include':
				htmls += $("#" + searchItem.id).css("display", "block").prop(
						'outerHTML');
				$("#" + searchItem.id).remove();
				break;
			default:
				break;
			}
			if (htmls != "") {
				var clear = 'clear';
				if(htmls.indexOf(clear) >= 0){
					htmls = htmls;
				}else{
					htmls = "<div class='emay-search'>" + "<label>"+searchItem.label+"</label>" + htmls + "</div>";
				}

			}
			searchHtml += htmls;
		}
	}
	return searchHtml;
};


var buttonItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var buttonHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (searchConfig && searchConfig.buttonItems) {
		var buttonItems = searchConfig.buttonItems;
		for ( var i in buttonItems) {
			var buttonItem = buttonItems[i];
			if (buttonItem.isShow != null && buttonItem.isShow != true) {
				continue;
			}
			var htmls = "<div class='emay-search'><input type='button' id='"
					+ buttonItem.id + "' value='" + buttonItem.label
					+ "'  onClick='" + buttonItem.onClickFunction
					+ "'></input></div>";
			buttonHtml += htmls;
		}
	}
	return buttonHtml;
};

var emButtonItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var emButtonHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (!searchConfig || searchConfig.searchButton == true) {
		emButtonHtml += '<div class="emay-search"><input type="button" class="btn-green" value="查询" onClick="emrefulsh(\''
				+ emTableConfigName + '\')"></div>';
	}
	if (!searchConfig || searchConfig.resetButton == true) {
		emButtonHtml += '<div class="emay-search"><input type=\"reset\" class="btn-blue"  value=\"重置\"></div>';
	}
	return emButtonHtml;
};

var tableItemLayout = function(emTableConfigName, start, limit) {
	var emTableConfig = getConfig(emTableConfigName);
	var tableConfig = emTableConfig.tableConfig;
	var ajaxConfig = emTableConfig.ajaxConfig;
	var dataparams = buildAjaxParams(ajaxConfig, start, limit);
	var searchId = emTableConfig.outerDivId + '_search_form';
	//var tableParentId = emTableConfig.outerDivId + '_table_parent';
	var tableId = emTableConfig.outerDivId + '_table_table';
	var ladHeight = $('#'+searchId).outerHeight()+50;
	$('.emay-search').each(function(inx,ele){
		$(ele).find('input:button').attr('disabled','disabled');
	});

	var rect ='<div class="rect"></div>';
	rect +='<div class="rect2"></div>';
	rect +='<div class="rect3"></div>';
	rect +='<div class="rect4"></div>';
	rect +='<div class="rect5"></div>';
	rect +='<div class="rect6"></div>';
	rect +='<div class="rect7"></div>';
	rect +='<div class="rect8"></div>';
	$('.emtable_search_form').after('<div class="loadding-cover"></div><div class="loadding" style="top:'+ladHeight+'px">'+rect+'</div>');
		$.ajax({
			type : ajaxConfig.method ? ajaxConfig.method : "POST",
			url : ajaxConfig.url,
			data : dataparams,
			dataType : "json",
			async:  ajaxConfig.async==false ? ajaxConfig.async : true,
			success : function(data) {
				if(ajaxConfig.afterAjax){
					ajaxConfig.afterAjax(data,tableConfig);
				}
				var theadHtml = tableTtile(tableConfig);
				var dataHtml = dataLayout(data, tableConfig, ajaxConfig);
				var pageHtml = pageLayout(data, emTableConfig, ajaxConfig,
						dataparams.limit, emTableConfigName);
				$('.emay-search').each(function(inx,ele){
					$(ele).find('input:button').removeAttr('disabled');
				});
				$('.loadding,.loadding-cover').remove();
				if(data.success){
					doLayout(emTableConfig, theadHtml, dataHtml, pageHtml);
				}else{
					doLayout(emTableConfig, theadHtml, dataHtml, '');
					$("#" + tableId).find("tbody tr td").text(data.message);
				}
			},
			error : function(data) {
				$('.loadding,.loadding-cover').remove();
				var theadHtml = tableTtile(tableConfig);
				var dataHtml = dataLayout(data, tableConfig, ajaxConfig);
				doLayout(emTableConfig, theadHtml, dataHtml, '');
				$("#" + tableId).find("tbody tr td").text(eval('(' + data.responseText + ')').message);
			}
		});
};
var tableTtile = function(tableConfig) {
	var theadHtml = "<thead><tr>";
	if(tableConfig.checkBoxConfig){
		var checkBox = tableConfig.checkBoxConfig;
		if (typeof(checkBox) !=="undefined" || checkBox !== false){
			theadHtml += "<th width='5%'><input type='checkbox' id='"+checkBox.id+"'/>全选</th>";
		}
	}
	if (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true) {
		theadHtml += "<th width='5%'>序号</th>";
	}
	var rowItems = tableConfig.rowItems;
	for ( var i in rowItems) {
		var row = rowItems[i];
		if (row.isShow != null && row.isShow == false) {
			continue;
		}
		theadHtml += "<th ";
		if (row.width != null) {
			theadHtml += "width='" + row.width + "'";
		}
		theadHtml += ">" + row.title + "</th>";
	}
	theadHtml += "</tr></thead>";
	return theadHtml;
};

var buildAjaxParams = function(ajaxConfig, start, limit) {
	var dataparams = {};
	var dataconfig = ajaxConfig.data;
	for ( var key in dataconfig) {
		var value = dataconfig[key];
		if (value.substr(0, 1) == "." || value.substr(0, 1) == "#") {
			value = $(value).val();
		}
		if(value == null || value == "" || typeof(value) == "undefined"){
			continue;
		}
		dataparams[key] = value;
	}
	if (ajaxConfig.startType == "startNum") {
		dataparams[ajaxConfig.startParams] = start ? (start > 0 ? start : 0)
				: 0;
	} else {
		var pageNum = start ? (start / limit) + 1 : 1;
		dataparams[ajaxConfig.startParams] = pageNum;
	}
	var defaultLimit = ajaxConfig.defaultLimit ? ajaxConfig.defaultLimit : 20;
	dataparams[ajaxConfig.limitParams] = limit ? (limit > 0 ? limit
			: defaultLimit) : defaultLimit;
	return dataparams;
};

var dataLayout = function(data, tableConfig, ajaxConfig) {
	var dataHtml = "<tbody>";
	var datalistV = getData(data, ajaxConfig.result.dataArray);
		if(datalistV!=null){
			for ( var i in datalistV) {
				dataHtml += "<tr>";
				var dataone = datalistV[i];
				for(var is in dataone){
					if(dataone[is]  == null ){
						dataone[is] = "";
					}
				}
				if(tableConfig.checkBoxConfig){
					var checkBox = tableConfig.checkBoxConfig;
					if (typeof(checkBox) !=="undefined" || checkBox !== false) {
						var context = checkBox.sValue;
						if (context) {
							for ( var t in dataone) {
								if (context.indexOf("@{") < 0) {
									break;
								}
								while (context.indexOf("@{" + t + "}") >= 0) {
									context = context.replace("@{" + t + "}", dataone[t]);
								}
							}
		
						}
						dataHtml += "<td><input type='checkbox' sValue='"+context+"' class='"+checkBox.subCalss+"' /></td>";
					}
				}
				if (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true) {
					var index = Number(i)  + 1;
					dataHtml += "<td>" + index + "</td>";
				}
		
				for ( var j in tableConfig.rowItems) {
					var row = tableConfig.rowItems[j];
					if (row.isShow != null && row.isShow == false) {
						continue;
					}
					if(null!=row.align && undefined!=row.align){
		 				dataHtml += "<td style='text-align:"+row.align+"' class='alignLeft'>";
					}else{
		 				dataHtml += "<td>";
					}
					var context = row.context;
					var selectors = row.selectors;
					var format=row.format;
					var formatymd=row.formatymd;
					var customData = row.customData;// 自定义数据选项
					if (context) {
						for ( var t in dataone) {
							if (context.indexOf("@{") < 0) {
								break;
							}
							while (context.indexOf("@{" + t + "}") >= 0) {
								if(row.specialChartTransform){
									var a = dataone[t]+'';
									a = a.replace(/&/g,"&amp;");
									a = a.replace(/</g,"&lt;");
									a = a.replace(/>/g,"&gt;");
									a = a.replace(/'/g,"&#39;");
									a = a.replace(/"/g,"&quot;");
									a = a.replace(/`/g,"&#x27;");
									a = a.replace(/\$/g,"&#36;");
									a = a.replace(/ /g,"&nbsp;");
									a = a.replace(/\r/g,"<br/>");
									a = a.replace(/\n/g,"<br/>");
									dataone[t] = a;
								}
								context = context.replace("@{" + t + "}", dataone[t]);
							}
						}
						if(null!=format && undefined!=format){
							 dataHtml += context.substring(0,context.length-3);
						}else if(null!=formatymd && undefined!=formatymd){
							 dataHtml += context.substring(0,context.length-8);
						}else{
							//添加判断可自定义数据展示
							dataHtml += customData && (customData.isCustom === true)?
							(customData.customFun(context)):context;
						}
					}
					if (selectors) {
						for ( var q in selectors) {
							var selector = selectors[q];
							if (selector.isShow != null && selector.isShow == false) {
								continue;
							}
							var termValue;
							if(typeof(selector.term) == "number" || typeof(selector.term) == "boolean"){
								termValue = selector.term;
							}else{
								var term = selector.term.replace("@{", "").replace("}", "");
								if(dataone!=null){
									termValue = dataone[term];
								}
							}
							var select = selector.select;
							for ( var s in select) {
								var sele = select[s];
								var seleValue = sele.value;
								var isChoose = false;
								if (seleValue instanceof Array) {
									var sv;
									var csv;
									var ysv;
									var nsv; 
									for ( var st in seleValue) {
										ysv = seleValue[st].yValue;
										sv = seleValue[st].value;
										csv = seleValue[st].cValue;
										nsv = seleValue[st].nValue;
										if (typeof (sv) != "number" && typeof (sv) != "boolean") {
											for ( var t in dataone) {
												if (sv.indexOf("@{") < 0) {
													break;
												}
												while (sv.indexOf("@{" + t + "}") >= 0) {
													sv = sv.replace("@{" + t + "}",
															dataone[t]);
												}
											}
										}
										if(sv == csv){
											break;
										}
		
									}
									if (sv == csv && ysv==termValue) {
										var con = seleValue[st].context;
										for ( var t in dataone) {
											if (con.indexOf("@{") < 0) {
												break;
											}
											while (con.indexOf("@{" + t + "}") >= 0) {
												con = con.replace("@{" + t + "}",
														dataone[t]);
											}
										}
										dataHtml += con;
										break;
									}else if (sv == csv && nsv!=termValue) {
										var con = seleValue[st].context;
										for ( var t in dataone) {
											if (con.indexOf("@{") < 0) {
												break;
											}
											while (con.indexOf("@{" + t + "}") >= 0) {
												con = con.replace("@{" + t + "}",
														dataone[t]);
											}
										}
										dataHtml += con;
										break;
									}
								} else {
									var sv = seleValue;
									if (typeof (sv) != "number" && typeof (sv) != "boolean") {
										for ( var t in dataone) {
											if (typeof sv === 'boolean' || sv.indexOf("@{") < 0) {
												break;
											}
											while (sv.indexOf("@{" + t + "}") >= 0) {
												sv = sv.replace("@{" + t + "}",
														dataone[t]);
											}
										}
									}
									if (sv == termValue) {
										isChoose = true;
									}
								}
								if (isChoose == true) {
									var con = sele.context;
									for ( var t in dataone) {
										if (con.indexOf("@{") < 0) {
											break;
										}
										while (con.indexOf("@{" + t + "}") >= 0) {
											con = con.replace("@{" + t + "}",
													dataone[t]);
										}
									}
									dataHtml += con;
								}
							}
						}
					}
					dataHtml += "</td>";
				}
				dataHtml += "</tr>";
			}
	}
	dataHtml += "</tbody>";
	var rowcol =tableConfig.rowItems.length + (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true ? 1 : 0)
	+ (tableConfig.checkBoxConfig ? 1 : 0);
	dataHtml = dataHtml != "<tbody></tbody>" ? dataHtml : "<tr><td colspan='"+(rowcol+5)+"'>暂无数据</td></tr>";
	return dataHtml;
};
var pageLayout = function(data, emTableConfig, ajaxConfig, limit,
		emTableConfigName) {
	var totalCount = getData(data, ajaxConfig.result.totalCount);
	var totalPageNum = getData(data, ajaxConfig.result.totalPageNum);
	var currentPageNum = getData(data, ajaxConfig.result.currentPageNum);
	var supportLimit = ajaxConfig.supportLimit;
	if(emTableConfig.onlylimit==true){
		var pageHtml = "<div class='emtable-page-right'>";
		pageHtml += "&nbsp;&nbsp;共" + totalPageNum + "页,共" + totalCount + "条数据&nbsp;&nbsp;&nbsp;&nbsp;"; 
		if (supportLimit) {
			pageHtml += '每页显示&nbsp;:&nbsp;<select class="limitSelect" onChange="emrefulsh(\''
					+ emTableConfigName + '\',0,this.value)">';
			for ( var i in supportLimit) {
				var limits = supportLimit[i];
				pageHtml += '<option value="' + limits + '"';
				if (limit == limits) {
					pageHtml += 'selected="selected"';
				}
				pageHtml += '>' + limits + '</option>';
			}
			pageHtml += '</select>';
		}
		pageHtml += "</div>";
		return pageHtml;

	}else if(emTableConfig.onlytotalCount==true){
		var pageHtml = "<div class='emtable-page-right'>";
		pageHtml += "&nbsp;&nbsp;共" + totalCount + "条数据&nbsp;&nbsp;&nbsp;&nbsp;"; 
		pageHtml += "</div>";
		return pageHtml;

	}else if(emTableConfig.noneCount==true){
		var pageHtml = "";
		return pageHtml;
	}else{
		var pageHtml = "<div class='emtable-page-right'>";
		var startShow = true;
		if (currentPageNum <= 1) {
			startShow = false;
		}
		if (startShow) {
			pageHtml += '<span class="emtable-page-list" onClick="emrefulsh(\'' + emTableConfigName	+ '\','
			+ startNum + ',' + limit + ')" title="首页">首页</span>';
		}else{
			pageHtml += '<span class="emtable-page-list disabled" title="首页">首页</span>';
		}

		var perShow = true;
		var perStart = (currentPageNum - 2) * limit;
		if (perStart < 0) {
			perShow = false;
		}
		if (perShow) {
			pageHtml += '<span  onClick="emrefulsh(\'' + emTableConfigName + '\','
			+ perStart + ',' + limit + ')" title="上一页">上一页</span>';
		}else{
			pageHtml += '<span class="disabled" title="上一页">上一页</span>';
		}
		if(emTableConfig.pagesShow == true){
			var pages = [ currentPageNum - 2, currentPageNum - 1, currentPageNum,
			              currentPageNum + 1, currentPageNum + 2 ];
			for ( var i in pages) {
				var num = pages[i];
				if (num <= 0 || num > totalPageNum) {
					continue;
				}
				if (currentPageNum == num) {
					pageHtml += '<b >' + currentPageNum + '</b>';
				} else {
					var startNum = (num - 1) * limit;
					pageHtml += '<span onClick="emrefulsh(\'' + emTableConfigName + '\','
					+ startNum + ',' + limit + ')">' + num
					+ '</span>';
				}
			}
			var nextShow = true;
			var nextStart = currentPageNum * limit;
			if (nextStart >= totalCount && totalCount > 0) {
				nextShow = false;
			}
			var nextPageHtml = '<span onClick="emrefulsh(\''
					+ emTableConfigName + '\',' + nextStart + ',' + limit
					+ ')" title="下一页">下一页</span>';
			var disNextPageHtml = '<span class="disabled" title="下一页">下一页</span>';
			var rowcol = emTableConfig.tableConfig.rowItems.length;
			var divId = emTableConfig.outerDivId
		//	var length = $("#" + divId + "").find("table tr").length;
		// 表头加一行内容，长度为2，不能在继续翻页
			if (nextShow) {
				pageHtml += nextPageHtml;
			} else {
				pageHtml += disNextPageHtml;
			}
			var endShow = true;
			if (currentPageNum == totalPageNum) {
				endShow = false;
			}
		}else{
			var pages = [currentPageNum];
			for ( var i in pages) {
				var num = pages[i];
				if (num <= 0 || num > totalPageNum) {
					continue;
				}
				if (currentPageNum == num) {
					pageHtml += '<b >' + currentPageNum + '</b>';
				} else {
					var startNum = (num - 1) * limit;
					pageHtml += '<span onClick="emrefulsh(\'' + emTableConfigName + '\','
					+ startNum + ',' + limit + ')">' + num
					+ '</span>';
				}
			}
			var nextShow = true;
			var nextStart = currentPageNum * limit;

			if(data.result!=null&&data.result.list != undefined && data.result.list.length < limit  ){
				pageHtml += '<span class="disabled" title="下一页">下一页</span>';
			}else{
				pageHtml += '<span onClick="emrefulsh(\'' + emTableConfigName + '\','
				+ nextStart + ',' + limit + ')" title="下一页">下一页</span>';
			}

		}

		if(emTableConfig.pagesShow == true && totalCount > 0) {
			if (endShow) {
				pageHtml += '<span class="emtable-page-last" onClick="emrefulsh(\'' + emTableConfigName + '\','
				+ ((totalPageNum - 1) * limit) + ',' + limit
				+ ')" title="尾页">尾页</span>';
			}else{
				pageHtml += '<span class="emtable-page-last disabled" title="尾页">尾页</span>';
			}

		}
		if(currentPageNum==0||currentPageNum==null){
			currentPageNum=1;
		}
		pageHtml += '<input id="' + emTableConfig.outerDivId
				+ '_jumpnum" type="text" value="' + currentPageNum
				+ '"/><input type="button" value="跳转" onClick="emrefulshByPage(\''
				+ emTableConfigName + '\',$(\'#' + emTableConfig.outerDivId
				+ '_jumpnum\').val(),' + limit + ','+ totalPageNum +')"/>';
		if(emTableConfig.totalNumbersShow == true){
			pageHtml += "&nbsp;&nbsp;共" + totalPageNum + "页,共" + totalCount + "条数据";
		}
		if (supportLimit) {
			pageHtml += '<label class="newline">&nbsp;&nbsp;每页显示&nbsp;:&nbsp;</label><select class="limitSelect" onChange="emrefulsh(\''
					+ emTableConfigName + '\',0,this.value)">';
			for ( var i in supportLimit) {
				var limits = supportLimit[i];
				pageHtml += '<option value="' + limits + '"';
				if (limit == limits) {
					pageHtml += 'selected="selected"';
				}
				pageHtml += '>' + limits + '</option>';
			}
			pageHtml += '</select>';
		}
		pageHtml += "</div>";
		return pageHtml;

	}

};

var doLayout = function(emTableConfig, theadHtml, dataHtml, pageHtml) {
	var showPage = true;
	if (emTableConfig.ajaxConfig.showPage !== undefined) {
		showPage = emTableConfig.ajaxConfig.showPage;
	}
	if(!showPage){
		pageHtml = "";
	}
	var outerDivId = emTableConfig.outerDivId;
	$("#" + outerDivId + "_table_parent").remove();
	$("#" + outerDivId + "_table_table").remove();
	$("#" + outerDivId + "_page_div").remove();
	var tableItem = "<div id='" + outerDivId
			+ "_table_parent' class='emtable_table_parent'><table id='" + outerDivId
			+ "_table_table' class='emtable_table_table'>" + theadHtml
			+ dataHtml + "</table></div>" + "<div id='" + outerDivId
			+ "_page_div' class='emtable-page'>" + pageHtml + "</div>";
	$("#" + outerDivId + "_div").append(tableItem);
	if(emTableConfig.tableConfig.checkBoxConfig){
		checkAll(emTableConfig);
	}
};

var getData = function(ajaxResult, dataPath) {
	var ajaxResultCopy = ajaxResult;
	var dataPathtree = dataPath.split('.');
		for ( var t in dataPathtree) {
			if(ajaxResultCopy!=null && ajaxResultCopy[dataPathtree[t]]!=null){
				ajaxResultCopy = ajaxResultCopy[dataPathtree[t]];
			}else{
				ajaxResultCopy=null;
			}
		}
		return ajaxResultCopy;
};

var getConfig = function(emTableConfigName) {
	return window[emTableConfigName];
};

function checkAll(emTableConfig){
	var checkID = emTableConfig.tableConfig.checkBoxConfig.id;
	var subCalss = emTableConfig.tableConfig.checkBoxConfig.subCalss;
	var parentId =emTableConfig.outerDivId;
	$('#'+checkID).click(function(){
		if($(this).prop("checked")==true){
			$("."+subCalss).prop("checked",true);
		}else{
			$("."+subCalss).prop("checked",false);
		}
	});
	var numi=0;
	$("#"+parentId).find("."+subCalss).click(function(){
		numi=0;
		$("#"+parentId).find("."+subCalss).each(function(index,element){
			if($(this).prop("checked")==false){
				$('#'+checkID).prop("checked",false);
			}
			if($(this).prop("checked")==true){
				numi++;
			}
		});
		if(numi == $("#"+parentId).find("."+subCalss).length){
			$('#'+checkID).prop("checked",true);
		}
	});
}

var getCheckSvalue = function (name){
	var emTableConfig = getConfig(name);
	var subCalss = emTableConfig.tableConfig.checkBoxConfig.subCalss;
	var checked = [];
	$("."+subCalss+':checked').each(function(inx,ele){
		var id = $(ele).attr('sValue');
		checked.push(id);
	});
	return checked;
}
