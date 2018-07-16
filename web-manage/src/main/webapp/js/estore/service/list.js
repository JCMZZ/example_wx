var emTableConfig = {
		outerDivId : "outerId",
		pagesShow : true, 
		totalNumbersShow:true,
		searchConfig : {
			searchItems : [{
				label : '商户名称',
				id : 'storeName',
				type : 'input'
			},{
				label : '状态',
				id : 'serviceState',
				type : 'select',
				options : [{
					context : '全部状态',
					value : '-1'  
				},{
					context : '未推送',
					value : '0'  
				}, {
					context : '待支付',
					value : '1'
				}, {
					context : '支付成功',
					value : '2'
				}, {
					context : '支付失败',
					value : '3'
				}]
			},{
				label : '服务类型',
				id : 'serviceType',
				type : 'select',
				options : [{
					context : '全部类型',
					value : '0'  
				},{
					context : '智能营销',
					value : '1'  
				}, {
					context : '精准营销',
					value : '2'
				}, {
					context : '自主营销',
					value : '3'
				}]
			}],
			searchButton : true,
			resetButton : false
		},
		ajaxConfig : {
			url : SERVER_PATH + '/service/manage/ajax/list',
			method : 'POST',
			data : {
				storeName:'#storeName',
				serviceState : '#serviceState',
				serviceType : '#serviceType'
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
							title : "服务类型",
							width : "5%",
							selectors :[{
								    isShow : true,
									term : "@{serviceType}",
									select : [{
										value :1,
										context : "智能营销"
									},{
										value :2,
										context : "精准营销"
								    },{
										value :3,
										context : "自主营销"
								    }]
							}]
						},{
							isShow : true,
							title : "商户名称",
							width : "5%",
							context : "@{storeName}"
						},{
				            isShow : true,
							title : "商品名称",
							width : "8%",
							context : "@{name}"
						},{
							isShow : true,
							title : "服务费用",
							width : "5%",
							context : "@{servicePrice}"
						},{
				            isShow : true,
							title : "服务人数",
							width : "5%",
							context : "@{servicePeopleNum}"
						},{
							isShow : true,
							title : "状态",
							width : "5%",
							selectors :[{
									isShow : true,
									term : "@{serviceState}",
									select : [{
										value :0,
										context : "未推送"
									},{
										value :1,
										context : "待支付"
									},{
										value :2,
										context : "支付成功"
									},{
										value :3,
										context : "支付失败"
									}]
								}]
						},{
							isShow : true,
							title : "短信内容",
							width : "10%",
							context : '<div class="ellipsBox" style="width:300px;"><span class="ellips" style="width:300px;" title="点击查看详情" onclick="seeDetails(this)" ><a style="text-decoration:none;">@{content}</a></span></div>'
						},{
				            isShow : true,
							title : "短信真实条数",
							width : "5%",
							context : "@{realNum}"
						},{
							isShow : true,
							title : "创建时间",
							width : "5%",
							context : "@{createTime}"
						},{
				            isShow : true,
							title : "购买服务时间",
							width : "5%",
							context : "@{serviceTime}"
						},{
							isShow : true,
							title : "操作",
							width : "5%",
							context :"<div class='btn_box rs' alt='查看详情' title='查看详情'><a href='javascript:void(0)' onClick='checkDetail(\"@{batchId}\")'><i class='iCon grey-see'></i></a></div>&nbsp;"
						}]
		}
	}
emTable('emTableConfig');
// 跳转详情页
function checkDetail(batchId){
	window.location.href=SERVER_PATH + '/service/manage/info?batchId='+batchId;
}
