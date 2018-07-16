var emTableConfig = {
		outerDivId : "outerId",
		pagesShow : true, 
		totalNumbersShow:true,
		searchConfig : {
			searchItems : [{
				label : '用户名称',
				id : '',
				type : 'input'
			},{
				label : '电话号码',
				id : '',
				type : 'input'
			},{
				label : '内容',
				id : '',
				type : 'input'
			},{
				label : '发送时间',
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
			url : SERVER_PATH + '/store/serviceCodeCountryReport/report',
			method : 'POST',
			data : {
				rate : '#rate',
				clientName:'#clientName',
				appId:'#appId',
				country:'#country',
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
							title : "用户名称",
							width : "12%",
							context : "@{}"
						},{
							isShow : true,
							title : "手机号",
							width : "15%",
							context : "@{}"
						},{
							isShow : true,
							title : "内容",
							width : "15%",
							context : "@{}"
						},{
							isShow : true,
							title : "发送时间",
							width : "15%",
							context : "@{}"
						}]
		}
	}
emTable('emTableConfig');
