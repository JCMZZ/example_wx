package com.emay.estore.service.system;

import java.util.List;

import cn.emay.common.Result;

import com.emay.estore.pojo.system.Settings;

public interface SettingsService {

	Settings findByKey(String key);

	List<Settings> findAll();

	Result updateSettings(Settings settings);

}
