var emTableConfig = {
		outerDivId : "outerId",
		pagesShow : true, 
		totalNumbersShow:true,
		searchConfig : {
			searchItems : [{
				label : '手机号',
				id : 'mobile',
				type : 'input'
			}],
			searchButton : true,
			resetButton : false
		},
		ajaxConfig : {
			url : SERVER_PATH + '/storeUser/userList',
			method : 'POST',
			data : {
				mobile:'#mobile'
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
				width : "25%",
				context : "@{mobile}"
			},{
	            isShow : true,
				title : "创建时间",
				width : "25%",
				context : "@{createTime}"
			},{
				isShow : true,
				title : "操作",
				width : "5%",
				context :"<div class='btn_box rs' alt='查看详情' title='查看详情'><a href='javascript:void(0)' onClick='checkDetail(\"@{id}\")'><i class='iCon grey-see'></i></a></div>&nbsp;"
			}]
		}
	}
emTable('emTableConfig');
//跳转详情页
function checkDetail(id){
	window.location.href=SERVER_PATH + '/storeUser/to/userDetail?userId='+id;
}