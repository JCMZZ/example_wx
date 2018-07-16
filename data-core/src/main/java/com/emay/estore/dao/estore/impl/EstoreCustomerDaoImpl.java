package com.emay.estore.dao.estore.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreCustomerDao;
import com.emay.estore.dto.estore.sms.MobileInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerBalanceRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerCardRecordDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerMyDTO;
import com.emay.estore.dto.estore.user.EstoreCustomerScoreRecordDTO;
import com.emay.estore.pojo.estore.EstoreCustomer;

import cn.emay.common.db.Page;

@Repository
public class EstoreCustomerDaoImpl extends BaseSuperDaoImpl<EstoreCustomer> implements EstoreCustomerDao {

	@Override
	public EstoreCustomerDTO findByStoreIdAndOpenId(Long storeId, String openId) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select u.mobile,a.id,a.unionid,a.wx_open_id,a.user_id,a.store_id from estore_user u, estore_customer a where u.id = a.user_id and a.store_id = ? and a.wx_open_id = ? limit 1";
		parameters.add(storeId);
		parameters.add(openId);
		List<EstoreCustomerDTO> list = this.findSqlForListObj(EstoreCustomerDTO.class, sql, parameters);
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public void updateUserId(Long oldUserId, Long newUserId) {
		String sql = "update estore_customer set user_id = " + oldUserId + " where user_id = " + newUserId;
		this.execSql(sql);
	}

	@Override
	public Page<EstoreCustomerInfoDTO> findPage(Long storeId,Integer orderType, Integer orderMethod, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select s.id,s.store_id,s.user_id,s.nickname,s.balance,s.score,t.level as cardLevel,t.name as cardName from estore_user u left join estore_customer s on u.id = s.user_id left join estore_card c "
				+ " on s.id = c. user_customer_id left join estore_card_type t on c.card_type_id = t.id where s.store_id = ? and u.mobile is not null";
		parameters.add(storeId);
		if (orderType.intValue() == 1) {
			sql += " order by s.balance";
		} else if (orderType.intValue() == 2) {
			sql += " order by s.score";
		} else {
			sql += " order by t.level";// 按卡片等级排序
		}
		
		if (orderMethod.intValue() == 2) {// 倒序
			sql += " desc";
		}
		sql += ",s.id desc";//处理排序字段大量相同数量时，造成的排序分页混乱
		return this.findSqlForPageForMysql(EstoreCustomerInfoDTO.class, sql, parameters, start, limit);
	}

	@Override
	public EstoreCustomerMyDTO findCustomer(Long userId) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select  s.id,s.user_id,s.nickname, s.balance,s.score,cr.number from  estore_customer s,estore_card cr where s.id = cr.user_customer_id and  s.id = ?";
		parameters.add(userId);
		List<EstoreCustomerMyDTO> list =  this.findSqlForListObj(EstoreCustomerMyDTO.class, sql, parameters);
		if(list!= null && !list.isEmpty()) {
			return list.get(0);
		}
		return null;
	}

	@Override
	public Page<EstoreCustomerBalanceRecordDTO> findBalanceRecord(Long userCustomerId, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select ecbr.user_customer_id,ecbr.change_balance,ecbr.create_time,ecbr.type AS type from estore_customer_balance_record ecbr where ecbr.user_customer_id= ? order by create_time desc";
		parameters.add(userCustomerId);

		return this.findSqlForPageForMysql(EstoreCustomerBalanceRecordDTO.class, sql, parameters, start, limit);
	}

	@Override
	public Page<EstoreCustomerScoreRecordDTO> findScordRecord(Long userCustomerId, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select ecbsr.user_customer_id,ecbsr.change_score,ecbsr.create_time,ecbsr.type AS type from estore_customer_score_record ecbsr where ecbsr.user_customer_id= ? order by create_time desc";
		parameters.add(userCustomerId);

		return this.findSqlForPageForMysql(EstoreCustomerScoreRecordDTO.class, sql, parameters, start, limit);

	}

	@Override
	public EstoreCustomerCardRecordDTO findCard(Long userCustomerId) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select c.id,c.number,t.level,t.name,t.card_describe,t.store_id from estore_card c,estore_card_type t where c.card_type_id = t.id and c.user_customer_id= ?";
		parameters.add(userCustomerId);
		List<EstoreCustomerCardRecordDTO> list= this.findSqlForListObj(EstoreCustomerCardRecordDTO.class, sql, parameters);
		if(list!=null && !list.isEmpty()) {
			return list.get(0);
		}
		return null;
	} 

	@Override
	public EstoreCustomerInfoDTO findCustomerInfo(Long customerId) {
		String sql = "SELECT cu.id, cu.nickname, cu.balance, cu.score, ct.`name` AS cardName, cr.id as cardId, ct.`level` as cardLevel, cr.number AS cardNumber FROM estore_customer cu, estore_card cr, estore_card_type ct WHERE cu.id = cr.user_customer_id AND cr.card_type_id = ct.id AND cu.id = "
				+ customerId;
		List<EstoreCustomerInfoDTO> list = this.findSqlForListObj(EstoreCustomerInfoDTO.class, sql, null);
		if(list != null && !list.isEmpty()){
			return list.get(0);
		}
		return null;
	}

	@Override
	public Page<EstoreCustomerInfoDTO> findCustomerListPage(int start, int limit, Long storeId) {
		String sql = "SELECT cu.id, cu.nickname, cu.balance, cu.score, ct.`name` as cardName FROM estore_customer cu, estore_card cr, estore_card_type ct WHERE cu.id = cr.user_customer_id AND cr.card_type_id = ct.id AND cu.store_id = "
				+ storeId;
		return this.findSqlForPageForMysql(EstoreCustomerInfoDTO.class, sql, null, start, limit);
	}

	@Override
	public BigDecimal updateBalance(Long customerId, BigDecimal num) {
		String sql = "update estore_customer set balance = balance+" + num + " where id = " + customerId;
		this.execSql(sql);
		String sql1 = "select balance from estore_customer where id = " + customerId;
		return  this.jdbcTemplate.queryForObject(sql1, BigDecimal.class);
	}

	@Override
	public BigDecimal updateScore(Long customerId, BigDecimal num) {
		String sql = "update estore_customer set score = score+" + num + " where id = " + customerId;
		this.execSql(sql);
		String sql1 = "select score from estore_customer where id = " + customerId;
		return  this.jdbcTemplate.queryForObject(sql1, BigDecimal.class);
	}

	@Override
	public List<EstoreCustomerInfoDTO> findDTOByUserId(Long userId) {
		String sql = "select c.id,c.user_id as userId,c.nickname,c.store_id as storeId,c.balance,c.score,s.name as storeName,u.mobile from estore_customer c,estore_store s,estore_user u where s.id = c.store_id AND u.id = c.user_id and c.user_id = " + userId;
		return this.findSqlForListObj(EstoreCustomerInfoDTO.class, sql, null);
	}
	
	@Override
	public EstoreCustomerDTO findByStoreIdAndMobile(Long storeId, String mobile) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select u.mobile,a.id,a.unionid,a.wx_open_id,a.user_id,a.store_id from estore_user u, estore_customer a where u.id = a.user_id and a.store_id = ? and u.mobile = ? limit 1";
		parameters.add(storeId);
		parameters.add(mobile);
		List<EstoreCustomerDTO> list = this.findSqlForListObj(EstoreCustomerDTO.class, sql, parameters);
		if (list != null && list.size() > 0) {
			return list.get(0);
		}
		return null;
	}
	
	@Override
	public List<MobileInfoDTO> findByCustomerIds(List<Long> customerIds){
		if(customerIds == null || customerIds.isEmpty()){
			return null;
		}
		String sql = "select u.mobile,c.id from estore_user u,estore_customer c where u.id = c.user_id and c.id in (:customerIds)";
		NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(this.getJdbcTemplate());
		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("customerIds", customerIds);
		RowMapper<MobileInfoDTO> rowMapper = new BeanPropertyRowMapper<MobileInfoDTO>(MobileInfoDTO.class);
		return namedParameterJdbcTemplate.query(sql, paramSource, rowMapper);
	}

}
