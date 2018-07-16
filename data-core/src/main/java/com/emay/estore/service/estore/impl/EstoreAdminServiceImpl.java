package com.emay.estore.service.estore.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.emay.common.Result;
import cn.emay.common.db.Page;

import com.emay.estore.dao.estore.EstoreAdminDao;
import com.emay.estore.dto.estore.user.EstoreAdminDTO;
import com.emay.estore.service.estore.EstoreAdminService;

@Service
public class EstoreAdminServiceImpl implements EstoreAdminService {

	@Resource
	private EstoreAdminDao estoreAdminDao;

	@Override
	public EstoreAdminDTO findByOpenId(String openId) {
		return estoreAdminDao.findByOpenId(openId);
	}

	@Override
	public Boolean isExist(String mobile) {
		EstoreAdminDTO dto = estoreAdminDao.findByMobile(mobile);
		if (dto != null) {
			return true;
		}
		return false;
	}

	@Override
	public Page<EstoreAdminDTO> selectAdminList(int start, int limit, Long storeId, String adminName) {
		return estoreAdminDao.selectAdminList(start, limit, storeId, adminName);
	}

	@Override
	public Result updateAdminBind(Long adminId, Long storeId, int bind) {
		estoreAdminDao.updateAdminBind(adminId, storeId, bind);
		return Result.rightResult();
	}

	@Override
	public void updateUserId(Long oldUserId, Long newUserId) {
		estoreAdminDao.updateUserId(oldUserId, newUserId);
	}
}
