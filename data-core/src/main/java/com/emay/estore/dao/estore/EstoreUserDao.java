package com.emay.estore.dao.estore;

import com.emay.estore.dao.base.BaseSuperDao;
import com.emay.estore.pojo.estore.EstoreUser;

import cn.emay.common.db.Page;

public interface EstoreUserDao extends BaseSuperDao<EstoreUser> {

	void updateUserMobile(Long userId, String mobile);

	EstoreUser findUserByProperty(String fieldName, Object value);

	void deleteUserByProperty(String fieldName, Object value);

	Page<EstoreUser> findPage(int start, int limit, String mobile);

}
