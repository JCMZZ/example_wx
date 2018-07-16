var emTableConfig = {
	outerDivId : "outerId",
	pagesShow : true, 
	totalNumbersShow:true,
	searchConfig : {
		searchItems : [ {
			isShow : true,
			label : '操作用户',
			id : 'username',
			type : 'input'
		},{
			isShow : true,
			label : '内容',
			id : 'content',
			type : 'input'
		},{
		   label : '日志时间',
           id : 'startDate',
           type : 'date',
           dateFmt:'yyyy-MM-dd HH:mm:ss',
           startDate:'%y-%M-%d 00:00:00',
           maxDateId : 'endDate'
       },{
           label : '至',
           id : 'endDate',
           dateFmt:'yyyy-MM-dd HH:mm:ss',
           startDate:'%y-%M-%d 23:59:59',
           type : 'date',
           minDateId : 'startDate'
       }],
		searchButton : true,
		resetButton : false
	},
	ajaxConfig : {
		url : SERVER_PATH + '/log/ajax/list',
		method : 'POST',
		data : {
			username : '#username',
			content : '#content',
			startDate : '#startDate',
			endDate : '#endDate'
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
					title : "操作用户",
					width : "10%",
					context : "@{username}"
				},
				{
					isShow : true,
					title : "操作模块",
					width : "10%",
					context : "@{module}"
				},
				{
					isShow : true,
					title : "操作内容",
					width : "20%",
					context : "@{content}"
				},{
		            isShow : true,
					title : "操作类型",
					width : "10%",
					selectors :[{
						    isShow : true,
							term : "@{type}",
							select : [{
								value :'ADD',
								context : "新增"
							},{
								value :'DELETE',
								context : "删除"
						    },{
								value :'MODIFY',
								context : "修改"
						    },{
								value :'DOWNLOAD',
								context : "下载"
						    }]
					}]
				},{
					isShow : true,
					title : "操作时间",
					width : "10%",
					context : "@{operTime}"
				},
				{
					isShow : true,
					title : "服务模块",
					width : "10%",
					context : "@{service}"
				}]
	}
}

emTable('emTableConfig');



