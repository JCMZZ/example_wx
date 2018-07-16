package com.emay.estore.dao.system.impl;

import org.springframework.stereotype.Repository;

import com.emay.estore.dao.base.BaseSuperDaoImpl;
import com.emay.estore.dao.system.SettingsDao;
import com.emay.estore.pojo.system.Settings;

@Repository
public class SettingsDaoImpl extends BaseSuperDaoImpl<Settings> implements SettingsDao {
	
	@Override
	public Settings findSettingsByProperty(String fieldName, Object value){
		return this.findByProperty(fieldName, value);
	}

}