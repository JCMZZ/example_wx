var emTableConfig = {
		outerDivId : "outerId",
		pagesShow : true, 
		totalNumbersShow:true,
		searchConfig : {
			searchItems : [{
				label : '企业名称',
				id : 'storeName',
				type : 'input'
			},{
				label : '商品名称',
				id : 'goodsName',
				type : 'input'
			},{
				label : '提交时间',
	           id : 'startTime',
	           type : 'date',
	           dateFmt:'yyyy-MM-dd HH:mm:ss',
	           startDate:'%y-%M-%d 00:00:00',
	           maxDateId : 'endTime'
	       },{
	           label : '至',
	           id : 'endTime',
	           dateFmt:'yyyy-MM-dd HH:mm:ss',
	           startDate:'%y-%M-%d 23:59:59',
	           type : 'date',
	           minDateId : 'startTime'
	       }],
			searchButton : true,
			resetButton : false
		},
		ajaxConfig : {
			url : SERVER_PATH + '/goods/findPcGoods',
			method : 'POST',
			data : {
				goodsName:'#goodsName',
				storeName:'#storeName',
				startTime : '#startTime',
				endTime : '#endTime'
			},
			startType : "startNum",
			startParams : "start",
			limitParams : "limit", 
			defaultLimit : 20,
			supportLimit : [ 20, 50, 100 ],
			result : {
				dataArray : "result.list",
				totalCount : "result.totalCount",
				totalPageNum : "result.totalPage",
				currentPageNum : "result.currentPageNum"
			}
		},
		tableConfig : {
			isNeedIndexRow : true,
			rowItems : [
			            {
				            isShow : true,
							title : "企业名称",
							width : "12%",
							context : "@{storeName}"
						},{
							isShow : true,
							title : "商品名称",
							width : "15%",
							context : "@{name}"
						},{
							isShow : true,
							title : "商品详情",
							width : "15%",
							context : "@{goodsDescribe}"
						},{
							isShow : true,
							title : "价格",
							width : "15%",
							context : "@{discountPrice}"
						},{
							isShow : true,
							title : "图片地址",
							width : "15%",
							customData:{
				              isCustom:true,
				              customFun:function(data){
				            	  var html = ''
				            	  for(var item in data.split(',')){
				            		  html += '<span>'+data.split(',')[item]+'<span><br>'
				            	  }
				            	  return html
				              }
					        },
							context : "@{imgList}"
						},{
							isShow : true,
							title : "提交时间",
							width : "15%",
							context : "@{createTime}"
							
						}]
		}
	}
emTable('emTableConfig');
