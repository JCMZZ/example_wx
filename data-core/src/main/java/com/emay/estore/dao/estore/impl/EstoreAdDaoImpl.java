package com.emay.estore.dao.estore.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import cn.emay.common.db.Page;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.estore.EstoreAdDao;
import com.emay.estore.dto.estore.EstoreAdDTO;
import com.emay.estore.pojo.estore.EstoreAd;

@Repository
public class EstoreAdDaoImpl extends BaseSuperDaoImpl<EstoreAd> implements EstoreAdDao {

	@Override
	public Page<EstoreAdDTO> findPage(String linkPath, int start, int limit) {
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select e.id,e.link_path from estore_ad e where 1=1";
		if(!StringUtils.isEmpty(linkPath)){
			sql += " and e.link_path = ?";
			parameters.add(linkPath);
		}
		return this.findSqlForPageForMysql(EstoreAdDTO.class, sql, parameters, start, limit);
	}
	
	@Override
	public EstoreAdDTO getAd(){
		List<Object> parameters = new ArrayList<Object>();
		String sql = "select e.id,e.link_path from estore_ad e limit 1";
		List<EstoreAdDTO> list = this.findSqlForListObj(EstoreAdDTO.class, sql, parameters);
		if(list != null && !list.isEmpty()){
			return list.get(0);
		}
		return null;
	}
}
