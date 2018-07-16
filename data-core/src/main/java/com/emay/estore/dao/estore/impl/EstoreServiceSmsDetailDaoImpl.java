package com.emay.estore.dao.estore.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreServiceSmsDetailDao;
import com.emay.estore.pojo.estore.EstoreServiceSmsDetail;

import cn.emay.common.db.Page;

@Repository
public class EstoreServiceSmsDetailDaoImpl extends BaseSuperDaoImpl<EstoreServiceSmsDetail> implements EstoreServiceSmsDetailDao {

	@Override
	public Page<EstoreServiceSmsDetail> findPage(Long batchId, String mobile, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select s.id,s.batch_id,s.user_customer_id,s.mobile,s.send_time,s.state,s.create_time from estore_service_sms_detail s where 1=1";
		if (batchId != null && batchId.longValue() > 0l) {
			sql += " and s.batch_id = ?";
			parameters.add(batchId);
		}
		if (!StringUtils.isEmpty(mobile)) {// 待推荐
			sql += " and s.mobile = ?";
			parameters.add(mobile);

		}
		return this.findSqlForPageForMysql(EstoreServiceSmsDetail.class, sql, parameters, start, limit);
	}

	@Override
	public void saveBatchSmsDetail(List<EstoreServiceSmsDetail> saveList) {
		List<Object[]> paramsList = new ArrayList<Object[]>();
		String sql = "insert into estore_service_sms_detail (batch_id,user_customer_id,mobile,customer_id,send_time,state,create_time) values (?,?,?,?,?,?,?)";
		for (EstoreServiceSmsDetail smsDetail : saveList) {
			paramsList.add(new Object[] { smsDetail.getBatchId(), smsDetail.getUserCustomerId(), smsDetail.getMobile(), smsDetail.getCustomerId(), smsDetail.getSendTime(), smsDetail.getState(),
					smsDetail.getCreateTime() });
		}
		this.getJdbcTemplate().batchUpdate(sql, paramsList);
	}

	@Override
	public void updateSmsDetail(final List<EstoreServiceSmsDetail> list) {
		String sql = "update estore_service_sms_detail set state=?,response_code=?,response_message=? where customer_id = ? ";
		this.jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			@Override
			public void setValues(PreparedStatement ps, int i) throws SQLException {
				EstoreServiceSmsDetail smsDetail = list.get(i);
				try {
					ps.setInt(1, smsDetail.getState());
					ps.setString(2, smsDetail.getResponseCode());
					ps.setString(3, smsDetail.getResponseMessage());
					ps.setString(4, smsDetail.getCustomerId());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			@Override
			public int getBatchSize() {
				return list.size();
			}
		});
	}
}
