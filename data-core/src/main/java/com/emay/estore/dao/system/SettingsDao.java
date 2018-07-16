package com.emay.estore.dao.system;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.system.Settings;

public interface SettingsDao extends BaseSuperDao<Settings> {

	Settings findSettingsByProperty(String fieldName, Object value);

}
