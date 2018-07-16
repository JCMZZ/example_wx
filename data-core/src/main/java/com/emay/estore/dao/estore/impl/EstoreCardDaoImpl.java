package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreCardDao;
import com.emay.estore.dto.estore.user.EstoreCustomerInfoDTO;
import com.emay.estore.pojo.estore.EstoreCard;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Repository
public class EstoreCardDaoImpl extends BaseSuperDaoImpl<EstoreCard> implements EstoreCardDao {

	public void updateCard(Long cardId, Long cardTypeId, String cardNumber, int type) {
		StringBuffer sb = new StringBuffer("update estore_card set ");
		List<Object> params = new ArrayList<Object>();
		if (EstoreCustomerInfoDTO.UPDATE_CARD_NUMBER == type) {
			sb.append(" number = ? ");
			params.add(cardNumber);
		} else if (EstoreCustomerInfoDTO.UPDATE_CARD_TYPE_ID == type) {
			sb.append(" card_type_id = ? ");
			params.add(cardTypeId);
		}
		sb.append("where id = ? ");
		params.add(cardId);
		getJdbcTemplate().update(sb.toString(), params.toArray());
	}

	@Override
	public List<EstoreCard> findRepeatByName(String cardNumber, Long storeId, Long cardId) {
		String sql = "SELECT * from estore_card c, estore_card_type t where  c.card_type_id = t.id ";
		List<Object> parameters = new ArrayList<Object>();
		if (!StringUtils.isBlank(cardNumber)) {
			sql += " and c.number = ?";
			parameters.add(cardNumber);
		}
		if (null != storeId && storeId != 0l) {
			sql += " and t.store_id = ? ";
			parameters.add(storeId);
		}
		if (null != cardId && cardId != 0l) {
			sql += " and c.id != ? ";
			parameters.add(cardId);
		}
		return this.findSqlForListObj(EstoreCard.class, sql, parameters);
	}

}
