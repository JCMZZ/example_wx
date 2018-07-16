package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreCardTypeDao;
import com.emay.estore.dto.estore.EstoreCardTypeDTO;
import com.emay.estore.pojo.estore.EstoreCardType;

/**
 * @author IYU
 * @date 2018年5月31日
 * 
 */
@Repository
public class EstoreCardTypeDaoImpl extends BaseSuperDaoImpl<EstoreCardType> implements EstoreCardTypeDao {

	@Override
	public void updateCardDescribe(Long id, String cardDescribe) {
		String hql = " update EstoreCardType set cardDescribe = :describe where id = :cardId";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("describe", cardDescribe);
		params.put("cardId", id);
		this.execByHql(hql, params);
	}

	@Override
	public EstoreCardTypeDTO findCardType(Long id) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select ect.name,ect.card_describe,ect.level,ect.id from estore_card_type ect where ect.id= ?";
		parameters.add(id);
		List<EstoreCardTypeDTO> list = this.findSqlForListObj(EstoreCardTypeDTO.class, sql, parameters);
		if(list != null && !list.isEmpty()){
			return list.get(0);
		}
		return null;
	}

	@Override
	public EstoreCardType findByStoreIdAndLevel(Long storeId, int level) {
		Map<String, Object> params = new HashMap<String, Object>();
		String hql = "from EstoreCardType where level = :level and storeId =:storeId";
		params.put("level", level);
		params.put("storeId", storeId);
		return this.getUniqueResult(EstoreCardType.class, hql, params);
	}

	@Override
	public List<EstoreCardType> findEstoreCardTypes(Long storeId) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select * from estore_card_type  where store_id= ?";
		parameters.add(storeId);
		return this.findSqlForListObj(EstoreCardType.class, sql, parameters);
	}

	@Override
	public void updateName(Long id, String name) {
		String hql = "update EstoreCardType set name = :name where id = :id";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("name", name);
		params.put("id", id);
		this.execByHql(hql, params);
		
	}
}
