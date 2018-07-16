package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreServiceSmsBatchDao;
import com.emay.estore.pojo.estore.EstoreServiceSmsBatch;

@Repository
public class EstoreServiceSmsBatchDaoImpl extends BaseSuperDaoImpl<EstoreServiceSmsBatch> implements EstoreServiceSmsBatchDao {
	
	@Override
	public EstoreServiceSmsBatch findServiceBatchByProperty(String fieldName, Object value){
		return this.findByProperty(fieldName, value);
	}
	
	@Override
	public List<EstoreServiceSmsBatch> findByLastUpdateTime(Date lastUpdateTime, int currentPage, int pageSize){
		String sql = " select b.id,b.service_id,b.send_num,b.real_num,b.content from estore_service_sms_batch b where 1=1 ";
		List<Object> parameters = new ArrayList<Object>();
		if (null != lastUpdateTime) {
			sql += " and b.last_update_time >= ?";
			parameters.add(lastUpdateTime);
		}
		return this.findSqlForListForMysql(EstoreServiceSmsBatch.class, sql, parameters, currentPage, pageSize);
	}
}
