package com.emay.estore.service.system.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.Result;

import com.emay.estore.dao.system.SettingsDao;
import com.emay.estore.pojo.system.Settings;
import com.emay.estore.service.system.SettingsService;

@Service
public class SettingsServiceImpl implements SettingsService {

	@Resource
	private SettingsDao settingsDao;
	
	@Override
	public Settings findByKey(String key){
		return settingsDao.findSettingsByProperty("settingKey", key);
	}
	
	@Override
	public List<Settings> findAll(){
		return settingsDao.findAll();
	}
	
	@Override
	public Result updateSettings(Settings settings){
		settingsDao.update(settings);
		return Result.rightResult();
	}

}
