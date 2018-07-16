var emTableConfig = {
		outerDivId : "outerId",
		pagesShow : true, 
		totalNumbersShow:true,
		searchConfig : {
			searchItems : [{
				label : '手机号',
				id : 'mobile',
				type : 'input'
			},{
				label : '',
				id: 'batchId',
				type: 'include'
			}],
			searchButton : true,
			resetButton : false
		},
		ajaxConfig : {
			url : SERVER_PATH + '/service/manage/ajax/info',
			method : 'POST',
			data : {
				mobile:'#mobile',
				batchId: '#batchId',
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
			rowItems : [{
							isShow : true,
							title : "手机号",
							width : "5%",
							context : "@{mobile}"
						},{
				            isShow : true,
							title : "发送时间",
							width : "8%",
							context : "@{sendTime}"
						},{
							isShow : true,
							title : "创建时间",
							width : "5%",
							context : "@{createTime}"
						},{
							isShow : true,
							title : "短信发送状态",
							width : "5%",
							selectors :[{
									isShow : true,
									term : "@{state}",
									select : [{
										value :1,
										context : "发送中"
									},{
										value :2,
										context : "发送成功"
									},{
										value :3,
										context : "发送失败"
									},{
										value :4,
										context : "发送超时"
									}]
								}]
						}]
		}
	}
emTable('emTableConfig');
$("#batchId").parent().children('label').css("display","none")
